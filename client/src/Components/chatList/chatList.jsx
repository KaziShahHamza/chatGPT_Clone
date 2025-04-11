import "./chatList.css";
import { Link } from "react-router-dom";

const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="">Explore AI chat</Link>
      <Link to="">Contact</Link>
      <hr />
      <span className="title">Recent Chats</span>
      <div className="list">
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
        <Link to="/">My Chats List</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="logo" />
        <div className="texts">
          <span>Upgrade to Convo AI Pro</span>
          <span>Get Unlimited Access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
