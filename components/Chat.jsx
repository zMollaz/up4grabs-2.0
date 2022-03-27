import { useEffect, useState, useContext } from "react";
import { UsersContext } from "../context/UsersContext";
import Pusher from "pusher-js";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
      cluster: "us2",
    });

    const channel = pusher.subscribe("chat");
    console.log("chat connected");
    channel.bind("chat-event", function (data) {
      console.log(222, data);
      setMessages((prevState) => [
        ...prevState,
        { sender: data.sender.name, content: data.message },
        //may need to change sender into user instead of data.sender
      ]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const changeHandler = (e) => {
    setText((prev) => {
      return e.target.value;
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // setMessages((prev) => {
    //   const newMessages = [...prev, { content: text, sender: user.name }];
    //   socket.emit("sent", newMessages);
    //   return newMessages;
    // });

    await axios.post("/api/pusher", { message: text, sender: user });

    setText((prev) => {
      return "";
    });
  };

  return (
    <div className="rounded chat absolute container w-3">
      <div className="margin-bottom align-items-center border-chat overflow-auto d-flex flex-column align-items-stretch flex-shrink-0 bg-t-gray shadow-md shadow-2xl">
        <div className="d-flex align-items-center flex-shrink-0 p-2 link-dark text-decoration-none border-bottom"></div>
        <div
          className="list-group list-group-flush text-black w-[250px] border-bottom scrollarea"
          style={{
            minHeight: "250px",
            maxHeight: "250px",
          }}
        >
          {messages.map((message, index) => {
            const position =
              message.sender === user.name
                ? "speech-receiver"
                : " speech-sender";
            return (
              <div key={index} className={`flex flex-col ${position} m-2`}>
                <div className="d-flex w-fit align-items-center justify-content-between">
                  <strong className="mb-1 p-1">@{message.sender}</strong>
                </div>
                <div className="mb-1 p-1 break-words w-full items-end small">
                  {message.content}
                </div>
              </div>
            );
          })}
          <div>
            <br />
            <br />
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          className=" chat-css border-text-area shadow-2xl"
        >
          <input
            className="w-[240px] form-control overflow-auto text-black rounded"
            placeholder=" Write a message               ➢ "
            value={text}
            onChange={changeHandler}
          />
        </form>
      </div>
    </div>
  );
}
