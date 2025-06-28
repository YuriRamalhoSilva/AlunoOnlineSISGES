import React from "react";
import Button from "../../common/Botao";
import userpng from "../../../assets/user.png";
import './header.css'; 

const Header = () => {
  return (
    <header>
      <nav>
        <Button
          type="button"
        ><img src={userpng} alt="User" /></Button>
        <h1>Aluno-Online</h1>
      </nav>
    </header>
  );
};

export default Header;

