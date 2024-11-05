import "./FakePage.css";
import logo from "../logo.svg";
import meme from "../hiring react.js-screenshot3.png";
import { useEffect } from "react";
import { Counter } from "../features/counter/Counter";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export interface FakePageProps {
  loginDone: () => void;
  logoutDone: () => void;
}

function FakePage(props: FakePageProps) {
  const navigate = useNavigate();
  useEffect(() => {
    !!props.loginDone && props.loginDone();
    !!props.logoutDone && props.logoutDone();
  }, [props]);
  return (
    <>
      <div className="FakePage">
        <header className="FakePage-header">
          <img src={logo} className="FakePage-logo" alt="logo" />
          <h1>Hello, Macnil Academy!</h1>
          <h3>
            Please, be sure to remove this component once the project starts!
          </h3>
          <img src={meme} onClick={() => navigate("dashboard")} alt="meme" />
          <h6>Click on Meme!</h6>
        </header>
      </div>
    </>
  );
}

export default FakePage;
