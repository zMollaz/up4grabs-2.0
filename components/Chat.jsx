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
    <div className=" xs:max-w-[350px] xs:w-[80%] sm:w-[80%] h-[500px] absolute xs:right-[0%] sm:right-[0%] bottom-[100%] rounded-lg border-8 border-gray-dark overflow-auto  bg-t-gray shadow-2xl">
      <div className="">
        {messages.map((message, index) => {
          const position =
            message.sender === user.name ? "chat-receiver" : " chat-sender";
          return (
            <div key={index} className={`flex flex-col ${position} m-2`}>
              <div className="flex w-full items-center justify-between">
                <strong className="mb-1 p-1">@{message.sender}</strong>
              </div>
              <div className="p-1 break-words w-full">
                {message.content}
              </div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full flex justify-center self-end shadow-2xl mb-2"
      >
        <input
          className="w-[90%] overflow-auto text-black rounded"
          placeholder=" Write a message"
          value={text}
          onChange={changeHandler}
        />
      </form>
    </div>

  );
}
