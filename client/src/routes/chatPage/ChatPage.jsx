import "./chatPage.css";
import NewPrompt from "../../Components/newPrompt/NewPrompt";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const {data, isPending, error} = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "loading..."
            : error
            ? "something went wrong"
            : data?.history?.map((msg, i) => (
                <>
                {msg.img && (
                  <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
                    path={msg.img}
                    height={300}
                    width={400}
                    transformation={[{ height: 300, width: 400 }]}
                    loading= "lazy"
                    lqip= {{ active: true, quality: 20 }}
                  />
                )}
                  <div
                    className={msg.role === "user" ? "message user" : "message"}
                    key={i}
                  >
                    <Markdown>{msg.parts[0].text}</Markdown>
                  </div>
                </>
              ))}
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
