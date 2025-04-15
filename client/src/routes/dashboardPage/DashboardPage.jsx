import "./dashboardPage.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      console.log("Entered mutationFn");
      return fetch(`${import.meta.env.VITE_SERVER_URL}/api/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },

    onSuccess: (id) => {
      console.log("Entered onSuccess");
      console.log("id: ", id);
      queryClient.invalidateQueries({ queryKey: ["chatlist"]});
      console.log("chatlist invalidated");
      navigate(`chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered handleSubmit");

    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
    console.log("Mutation called");
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="logo.png" alt="" />
          <h1>Convo AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a new chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help with Codes</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
