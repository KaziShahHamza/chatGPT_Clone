import "./chatList.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { data: chats, isPending, error } = useQuery({
    queryKey: ["chatlist"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="">Explore AI chat</Link>
      <Link to="">Contact</Link>
      <hr />
      <span className="title">Recent Chats</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong"
          : chats.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
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
