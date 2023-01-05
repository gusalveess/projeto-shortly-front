import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../Context/UserContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState("Entrar");
  const [disable, setDisable] = useState(false)
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  function Post() {

    const body = {
      email: email,
      password: password,
    };

    const promise = axios.post("https://shortly-aoz9.onrender.com/signIn", body);
    promise.then((res) => {
      setToken(localStorage.setItem("token", res.data.token));
      navigate("/logged");
    });
    promise.catch((error) => {
      if(error.response) {
        alert(error.response.data)
      }
      setSignIn('Entrar')
      setDisable(false)
    })
  }

  function HandleForm(e) {
    e.preventDefault();
    setSignIn(<ThreeDots color="#FFFFFF" height={13} width={51}/>);
    setDisable(true)
    Post();
  }

  return (
    <>
      <Body>
        <Top>
          <div></div>
          <div>
            <h1>Entrar</h1>
            <p onClick={() => navigate("/signUp")}>Cadastrar-se</p>
          </div>
        </Top>

        <Menu>
          <span>
            <h1>Shortly</h1>
            <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1fa73.svg" />
          </span>

          <form onSubmit={HandleForm}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disable}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disable}
              required
            />

            <button>{signIn}</button>
          </form>
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
    padding-left: 22px;
    cursor: pointer;
  }

  h1 {
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
    margin-top: 30px;
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
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
  }

  input {
    height: 58px;
    width: 300px;
    margin-bottom: 30px;
    margin-top: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid rgba(120, 177, 89, 0.25);
    font-size: 20px;
    padding-left: 15px;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50px;
    width: 140px;
    border-radius: 12px;
    border: none;
    background-color: #5d9040;
    color: #fff;
    font-family: "Lexend Deca", sans-serif;
    font-size: 16px;
  }
`;
