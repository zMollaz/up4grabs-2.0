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

  const sender = `width-fit max-w-[150px] bg-[#cfedff] rounded-lg self-end text-black shadow-xl`;
  const reciever = `width-fit max-w-[150px] bg-[#cfedff] rounded-lg self-start text-black shadow-xl`;

  return (
    <div className=" xs:max-w-[350px] xs:w-[80%] sm:w-[80%] xs:h-[350px] md:h-[500px] absolute xs:right-[0%] sm:right-[0%] bottom-[100%] rounded-lg border-8 border-gray-dark overflow-auto  bg-t-gray shadow-2xl">
      <div className="flex flex-col w-full">
        {messages.map((message, index) => {
          const position = message.sender === user.name ? reciever : sender;
          return (
            <div key={index} className={`flex-col ${position} m-2`}>
              <div className="">
                <strong className="mb-1 p-1 text-gray-dark">@{message.sender}</strong>
              </div>
              <div className="p-1 break-words w-full">{message.content}</div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full flex justify-center self-end shadow-2xl mb-2"
      >
        <input
          className="w-[90%] overflow-auto text-black rounded shadow-xl"
          placeholder=" Write a message"
          value={text}
          onChange={changeHandler}
        />
      </form>
    </div>
  );
}
