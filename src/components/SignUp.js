import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signUp, setSignup] = useState('Criar conta')
  const [disable, setDisable] = useState(false)
  const navigate = useNavigate()

  function Post() {
    const body = {
        name: name,
        email: email,
        password: password,
        confirmPassword: passwordConfirm
    }

    const promise = axios.post('https://short-backend.herokuapp.com/signUp', body)
    promise.then(() => {
        alert('Cadastrado com sucesso!')
        navigate('/')
    })
    promise.catch((error) => {
      if(error.response) {
        alert(error.response.data)
      }
      setSignup('Criar Conta')
      setDisable(false)
    })
  }

  function HandleForm(e) {
    e.preventDefault();
    setSignup(<ThreeDots color="#FFFFFF" height={13} width={51} />);
    setDisable(true)
    Post();
  } 

  return (
    <>
      <Body>
        <Top>
          <div></div>
          <div>
            <h1 onClick={() => navigate("/signIn")}>Entrar</h1>
            <p>Cadastrar-se</p>
          </div>
        </Top>

        <Menu>
          <span>
            <h1>Shortly</h1>
            <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1fa73.svg" />
          </span>

          <form onSubmit={HandleForm}>
            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={disable}
              required
            />
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
            <input
              type="password"
              placeholder="Confirme a senha"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              disabled={disable}
              required
            />

            <button>{signUp}</button>
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
    color: #5D9040;
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

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    height: 58px;
    width: 300px;
    margin-bottom: 13px;
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
    height: 50px;
    width: 140px;
    border-radius: 12px;
    border: none;
    background-color: #5D9040;
    color: #fff;
    font-family: "Lexend Deca", sans-serif;
  }
`;
