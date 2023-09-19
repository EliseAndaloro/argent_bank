import React from "react";
import "./features.css";
import chat from "../../assets/img/icon-chat.png";

const FeaturesChat = () => {
  return (
    <div className="feature-item">
      <img src={chat} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">You are our #1 priority</h3>
      <p>
        Need to talk to a representative? You can get in touch through our 24/7
        chat or through a phone call in less than 5 minutes.
      </p>
    </div>
  );
};

export default FeaturesChat;