import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Conversations = ({
  user,
  convos,
  setSelectedConvo,
  navigate,
  setSelectedConvoMessages,
  selectedConvoMessages,
}) => {
  const [messages, setMessages] = useState(null);
  let singleConvo = convos.find(
    (convo) => convo.participantId === user.id || convo.userId === user.id
  );
  useEffect(() => {
    fetch(`http://localhost:4000/messages?conversationId=${singleConvo.id}`)
      .then((resp) => resp.json())
      .then((messages) => {
        setMessages(messages);
      });
  }, [selectedConvoMessages]);
  return (
    <li key={user.id}>
      <button
        // @ts-ignore
        onClick={(e) => {
          for (let item of document.querySelectorAll(".selected")) {
            item.classList.remove("selected");
          }
          document.querySelector(".btn" + user.id).classList.add("selected");

          setSelectedConvo(singleConvo);
          navigate(`/logged-in/${singleConvo.id}`);
          fetch(`http://localhost:4000/messages?conversationId=${singleConvo.id}`)
          .then((resp) => resp.json())
          .then((messages) => {
            setMessages(messages);
            setSelectedConvoMessages(messages);
          });
          
        }}
        className={"btn" + user.id + " chat-button"}
      >
        <img
          className="avatar"
          height="50"
          width="50"
          alt=""
          src={user.avatar}
        />
        <div>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <p>{messages&&messages.length!==0?`${messages[messages.length-1].messageText}`:null}</p>
        </div>
      </button>
    </li>
  );
};

export default Conversations;
