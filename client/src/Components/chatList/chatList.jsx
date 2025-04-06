import React from "react";
import "./chatList.css";

const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <a to="/dashboard">Create a new chat</a>
      <a to="">Explore AI chat</a>
      <a to="">Contact</a>
      <hr />
      <span className="title">Recent Chats</span>
      <div className="list">
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
        <a to="/">My Chats List</a>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="logo" />
        <div className="texts">
          <span>Upgrade to AI chat Pro</span>
          <span>Get Unlimited Access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
