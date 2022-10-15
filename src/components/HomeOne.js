import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function UserLinks(props) {
  const urlShort = `https://short-backend.herokuapp.com/urls/open/${props.shortUrl}`;
  const getting = localStorage.getItem("token");
  const stringfy = JSON.stringify(getting);
  const token = JSON.parse(stringfy);

  function Del() {
    const confirm = window.confirm("Deseja apagar o link?");
    if (confirm) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const promise = axios.delete(
        `https://short-backend.herokuapp.com/urls/${props.id}`,
        config
      );
      promise.then(() => {
        setTimeout(() => {
          window.location.reload(true);
        }, 100);
      });
      promise.catch((error) => {
        if(error.response) {
          alert(error.response.data)
        }
      });
    }
  }
  return (
    <>
      <Flex>
        <div>
          <p>{props.url}</p>
          <a href={urlShort}>
            <p>{props.shortUrl}</p>
          </a>
          <p>Quantidade de visitantes: {props.visitCount}</p>
        </div>
        <span>
          <ion-icon onClick={Del} name="trash"></ion-icon>
        </span>
      </Flex>
    </>
  );
}

export default function HomeOne() {
  const getting = localStorage.getItem("token");
  const stringfy = JSON.stringify(getting);
  const token = JSON.parse(stringfy);
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [send, setSend] = useState("Encurtar Link");
  const [url, setUrl] = useState("");
  const [disable, setDisable] = useState(false)
  const navigate = useNavigate();

  function verify() {
    if (token === null) {
      navigate("/");
    }
  }

  useEffect(() => {
    verify();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get("https://short-backend.herokuapp.com/users/me", config);
    promise.then((res) => {
      setData(res.data.name);
      localStorage.setItem('Name', res.data.name)
      setSubData(res.data.shortenedUrls);
    });
  }, []);

  function Post() {
    const body = {
      url: url,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post("https://short-backend.herokuapp.com/urls/shorten", body, config);
    promise.then(() => {
      setTimeout(() => {
        window.location.reload(true);
      }, 100);
    });
    promise.catch((error) => {
      if(error.response) {
        alert(error.response.data)
      }
    });
  }

  function HandleForm(e) {
    e.preventDefault();
    setDisable(true)
    Post();
  }

  function Remove() {
    navigate("/");
    localStorage.removeItem("token");
    alert("Até mais!");
    setTimeout(() => {
      window.location.reload(true);
    }, 100);
  }

  return (
    <>
      <Body>
        <Top>
          <div>
            <h1>Olá, {data}</h1>
          </div>
          <div>
            <h1>Home</h1>
            <p onClick={() => navigate('/ranking')}>Ranking</p>
            <p onClick={Remove}>Sair</p>
          </div>
        </Top>

        <Menu>
          <div>
            <h1>Shortly</h1>
            <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1fa73.svg" />
          </div>

          <form onSubmit={HandleForm}>
            <input
              type="text"
              placeholder="Links que cabem no bolso"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={disable}
              required
            />
            <button>{send}</button>
          </form>

          <Links>
            {subData.map((item, index) => (
              <UserLinks
                key={index}
                url={item.url}
                shortUrl={item.shortUrl}
                visitCount={item.visitCount}
                id={item.id}
              />
            ))}
          </Links>
        </Menu>
      </Body>
    </>
  );
}

const Body = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const Top = styled.div`
  height: 95px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Lexend Deca", sans-serif;
  font-size: 14px;
  color: #9c9c9c;

  div {
    display: flex;
    justify-content: space-between;
  }

  p {
    padding-left: 15px;
    cursor: pointer;
  }

  h1 {
    color: #5d9040;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Lexend Deca", sans-serif;
    margin-bottom: 30px;
  }

  span {
    margin-bottom: 30px;
  }

  h1 {
    font-size: 54px;
    font-weight: 200;
  }

  img {
    width: 70px;
    height: 70px;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  input {
    height: 60px;
    width: 720px;
    margin-bottom: 30px;
    margin-top: 30px;
    border-radius: 12px;
    outline: none;
    border: 1px solid rgba(120, 177, 89, 0.25);
    font-size: 14px;
    padding-left: 15px;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  }

  button {
    height: 60px;
    width: 182px;
    margin-left: 69px;
    border-radius: 12px;
    background-color: #5d9040;
    color: #fff;
    outline: none;
    border: none;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 700;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    form {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }

    input {
      height: 60px;
      width: 280px;
      margin-bottom: 30px;
      margin-top: 30px;
      border-radius: 12px;
      outline: none;
      border: 1px solid rgba(120, 177, 89, 0.25);
      font-size: 14px;
      padding-left: 15px;
      margin-left: 10px;
      box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    }

    button {
      height: 60px;
      width: 90px;
      margin-right: 10px;
      border-radius: 12px;
      background-color: #5d9040;
      color: #fff;
      outline: none;
      border: none;
    }
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
`;

const Flex = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }

  div {
    display: flex;
    justify-content: space-around;
    width: 887px;
    height: 60px;
    background-color: #80cc74;
    border-radius: 12px 0px 0px 12px;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    color: #fff;
    font-size: 14px;
  }

  span {
    width: 130px;
    height: 60px;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 0px 12px 12px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  ion-icon {
    font-size: 20px;
    color: red;
  }

  @media (max-width: 768px) {
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      width: 260px;
      background-color: #80cc74;
      border-radius: 12px 0px 0px 12px;
      box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
      font-family: "Lexend Deca", sans-serif;
      font-weight: 400;
      color: #fff;
      font-size: 12px;
      padding-top: 19px;
      padding-bottom: 70px;
    }

    p {
      margin-top: 26px;
    }

    span {
      width: 90px;
      height: 150px;
    }
  }
`;
