import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";


const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("alex");
  const { user } = useUser();

  // console.log("UserId: ", user?.id);

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Convo AI</h1>
        <h2>Your personal AI assistant</h2>
        <h3>
        Experience seamless interactions with your intelligent assistant, always ready to assist and engage you, day or night.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "alex"
                  ? "/human1.jpeg"
                  : typingStatus === "eva"
                  ? "/human2.jpeg"
                  : "/bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "Alex: Who wrote '1984'",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: George Orwell",
                2000,
                () => {
                  setTypingStatus("eva");
                },
                "Eva: Define photosynthesis",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Processing of plants use to make food",
                2000,
                () => {
                  setTypingStatus("Alex");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
