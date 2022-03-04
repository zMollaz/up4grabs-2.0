import { useEffect, useState, useContext } from "react";
import { UsersContext } from "../context/UsersContext";
import io from "Socket.IO-client";

let socket;
export default function Chat({ handleClick, setDisplay }) {
  // let socket; //might need to move it back outside the component if a bug happen

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("return", (messagesArr) => {
        setMessages(messagesArr);
      });
    };

    socketInitializer();

    return () => {
      // socket.disconnect(); // gives an error after some time, invistigaet later
    };
  }, []);

  const changeHandler = (e) => {
    setText((prev) => {
      return e.target.value;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMessages((prev) => {
      const newMessages = [...prev, { content: text, sender: user.name }];
      socket.emit("sent", newMessages);
      return newMessages;
    });

    setText((prev) => {
      return "";
    });
  };

  return (
    <div className="rounded chat absolute container w-3">
      <div className=" border d-flex flex-column align-items-stretch flex-shrink-0 bg-gray-light">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        </div>
        <div
          className="list-group list-group-flush text-black w-[250px] border-bottom scrollarea"
          style={{ minHeight: "250px" }}
        >
          {messages.map((message, index) => {
            if (index % 2 === 0) {
              return (
                <div className="flex flex-col m-2">
                  <div className="d-flex w-fit align-items-center justify-content-between">
                    {/* <strong className="mb-1">{message.username}</strong> */}
                    <strong className="mb-1">@ {message.sender}</strong>
                  </div>
                  <div className=" mb-1 small">{message.content}</div>
                </div>
              );
            } else {
              return (
                <div className="flex flex-col items-end m-2">
                  <div className="d-flex w-fit align-items-center justify-content-between">
                    {/* <strong className="mb-1">{message.username}</strong> */}
                    <strong className="mb-1">@ {message.sender}</strong>
                  </div>
                  <div className=" mb-1 small">{message.content}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <form onSubmit={submitHandler} className="border-text-area">
        <input
          className="pl-6 form-control text-black rounded"
          placeholder="Write a message"
          value={text}
          onChange={changeHandler}
        />
      </form>
    </div>
  );
}