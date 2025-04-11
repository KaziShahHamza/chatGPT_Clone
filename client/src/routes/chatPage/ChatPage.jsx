import "./chatPage.css";
import NewPrompt from "../../Components/newPrompt/NewPrompt";

const ChatPage = () => {
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Message from AI</div>
          <div className="message user">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quidem
            placeat magni eaque ratione laborum a illo fugiat numquam. Illum
            iste recusandae, tempore vitae doloremque dolorum suscipit nulla
            aliquam et iusto aut cumque numquam id officiis ad doloribus sequi?
            Quis, repellat distinctio tempora adipisci harum dolorem ducimus
            fuga tenetur iusto!
          </div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
