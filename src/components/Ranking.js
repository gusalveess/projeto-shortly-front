import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Ranking() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getting = localStorage.getItem("token");
  const stringfy = JSON.stringify(getting);
  const token = JSON.parse(stringfy);
  const catching = localStorage.getItem("Name");
  const converse = JSON.stringify(catching);
  const Name = JSON.parse(converse);

  function verify() {
    if (token === null) {
      navigate("/");
    }
  }

  useEffect(() => {
    verify();
    const promisse = axios.get(`https://short-backend.herokuapp.com/ranking`);
    promisse.then((res) => {
      setData(res.data);
    });
    promisse.catch((err) => console.log(err.response.status));
  }, []);

  function RankProp(props) {
    return (
      <>
        <h1>
          {props.name} - {props.linksCount} links - {props.visitCount}{" "}
          visualizações
        </h1>
      </>
    );
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
            <h1>Olá, {Name}</h1>
          </div>
          <div>
            <p onClick={() => navigate("/logged")}>Home</p>
            <h1>Ranking</h1>
            <p onClick={Remove}>Sair</p>
          </div>
        </Top>

        <Menu>
          <span>
            <h1>Shortly</h1>
            <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1fa73.svg" />
          </span>

          <div>
            <ion-icon name="trophy"></ion-icon>
            <p>Ranking</p>
          </div>

          <Ranked>
            <div>
              <p>1.</p>
              <p>2.</p>
              <p>3.</p>
              <p>4.</p>
              <p>5.</p>
              <p>6.</p>
              <p>7.</p>
              <p>8.</p>
              <p>9.</p>
              <p>10.</p>
            </div>
            <div>
              {data.map((item, index) => (
                <RankProp
                  key={index}
                  name={item.name}
                  linksCount={item.linksCount}
                  visitCount={item.visitCount}
                />
              ))}
            </div>
          </Ranked>
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
    padding-left: 14px;
    cursor: pointer;
  }

  h1 {
    padding-left: 13px;
    color: #5d9040;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Lexend Deca", sans-serif;
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

  div {
    display: flex;
  }

  p {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 700;
    justify-content: center;
    font-size: 32px;
    padding-left: 5px;
  }

  ion-icon {
    color: yellow;
    font-size: 45px;
  }

  h5 {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 700;
    padding-top: 52px;
    font-size: 17px;
  }
`;

const Ranked = styled.div`
  border: 1px solid rgba(120, 177, 89, 0.25);
  max-width: 1500px;
  max-height: 241px;
  margin-top: 57px;
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  overflow: hidden;
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    margin-top: 14px;
  }

  p {
    font-size: 14px;
    padding-bottom: 9px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
  }

  h1 {
    font-size: 14px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    padding-bottom: 9px;
  }
`;
