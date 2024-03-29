import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Conversations from "./Components/Conversations";
import Header from "./Components/Header";

const MainApp = ({ user, users, setSelectedUser }) => {
  const [convos, setConvos] = useState([]);
  const [otherConvs, setOtherConvs] = useState([]);
  const [convoUsers, setConvoUsers] = useState([]);
  const [allConvos, setAllConvos] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [selectedConvoMessages, setSelectedConvoMessages] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newConvoModal, setNewConvoModal] = useState(false);
  const [usersWithoutConvo, setUsersWithoutConvo] = useState([]);

  const params = useParams();

  const navigate = useNavigate();

  //fetch conversations

  useEffect(() => {
    if(user===null){
        navigate('/login')
    }},[])

  useEffect(() => {
    if(user!==null)
    fetch(`http://localhost:4000/conversations?userId=${user.id}`)
      .then((resp) => resp.json())
      .then((serverConvos) => {
        setConvos(serverConvos);
      });
  }, []);
  // useEffect(() => {
  //   fetch(`http://localhost:4000/conversations?participantId=${user.id}`)
  //     .then((resp) => resp.json())
  //     .then((serverConvos) => {
  //       setOtherConvs(serverConvos);
  //     });
  // }, []);

  useEffect(() => {
    setAllConvos(convos);
    let userArr = [];
    console.log(convos)
    for (let conv of convos) {
      for (let user1 of users) {
        if (conv.userId === user1.id && user.id !== user1.id) {
          userArr = [
            ...new Set([...userArr, user1]),
          ]
        }
      }
    }
    for (let conv of convos) {
      for (let user1 of users) {
        if (conv.participantId === user1.id && user.id !== user1.id) {
          userArr = [
            ...new Set([...userArr, user1]),
          ];
        }
      }
    }
    console.log(userArr)
    setConvoUsers((prevUsers) => {
      setUsersWithoutConvo(
        users.filter((us) => {
          if (us.id === user.id) return false;
          if (
            userArr.find((conUs) => {
              return conUs.id === us.id;
            }) === undefined
          )
            return true;

          return false;
        })
      );

      return userArr;
    });
  }, [convos, otherConvs]);

  if(user!==null)
  return (
    <div className="main-wrapper">
      {newConvoModal && (
        <section
          onClick={(e) => {
            // @ts-ignore
            if (e.target.classList.contains("modal-wrapper")) {
              setNewConvoModal((prevModal) => (prevModal = false));
            }
          }}
          className="modal-wrapper"
        >
          <div
            // onClick={e=>e.stopPropagation()}
            className="modal"
          >
            <ul>
              {usersWithoutConvo.map((user1) => (
                <button
                  onClick={(e) => {
                    let newConvos = JSON.parse(JSON.stringify(convos));
                    fetch("http://localhost:4000/conversations/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        userId: user.id,
                        participantId: user1.id,
                      }),
                    }).then(resp=>resp.json()).then(convo=>{newConvos.push(convo)
                     setConvos(newConvos) 
                    })
                    setNewConvoModal(false)
                  }}
                  key={user1.id}
                  className="chat-button"
                >
                  <img
                    className="avatar"
                    height="50"
                    width="50"
                    alt=""
                    src={user1.avatar}
                  />
                  <div>
                    <h3>
                      {user1.firstName} {user1.lastName}
                    </h3>
                  </div>
                </button>
              ))}
            </ul>

            <button
              // @ts-ignore
              onClick={(e) => {
                setNewConvoModal((prevModal) => (prevModal = false));
              }}
              className="close-modal-btn"
            >
              X
            </button>
          </div>
        </section>
      )}
      {/* <!-- Side Panel --> */}
      <aside>
        {/* <!-- Side Header --> */}
        <Header
          setSelectedConvo={setSelectedConvo}
          setSelectedUser={setSelectedUser}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
          user={user}
        />

        {/* <!-- Search form --> */}
        <form className="aside__search-container">
          <input
            type="search"
            name="messagesSearch"
            placeholder="Search chats"
            // value=""
          />
        </form>
        {/* side chat */}
        <ul>
          <li>
            <button
              onClick={(e) => {
                setNewConvoModal(true);
              }}
              className="chat-button"
            >
              <div>
                <h3>+ Start a new Chat</h3>
              </div>
            </button>
          </li>
          {convoUsers.map(
            (
              user,
              // @ts-ignore
              i
            ) => {
              return (
                <Conversations key={user.id} user={user} setSelectedConvoMessages={setSelectedConvoMessages} convos={convos} navigate={navigate} setSelectedConvo={setSelectedConvo} selectedConvoMessages={selectedConvoMessages}/>
              );
            }
          )}
        </ul>
      </aside>

      {/* <!-- Main Chat Section --> */}
      <main className="conversation">
        {/* <!-- Chat header --> */}
        <header className="panel"></header>

        {/* <!-- 

      The Messages List will go here. Check main-messages-list.html
     --> */}

        {selectedConvo && (
          <ul id="msg-ul" className="conversation__messages">
            {selectedConvoMessages.map((message) => {
              if (message.userId === user.id) {
                return (
                  <li key={message.id} className="outgoing">
                    <p>{message.messageText}</p>
                  </li>
                );
              } else {
                return (
                  <li key={message.id}>
                    <p>{message.messageText}</p>
                  </li>
                );
              }
            })}

            {/* <!-- Outgoing messages are messages sent by the current logged in user --> */}

            {/* <!-- This one doesnt belong to the current logged in user --> */}
          </ul>
        )}

        <ul className="conversation__messages"></ul>

        {/* <!-- Message Box --> */}
        <footer>
          {selectedConvo && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(`http://localhost:4000/messages`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    conversationId: selectedConvo.id,
                    userId: user.id,
                    // @ts-ignore
                    messageText: e.target.msg.value,
                  }),
                })
                  .then((resp) => resp.json())
                  // @ts-ignore
                  .then((msg) => {
                    setSelectedConvoMessages([...selectedConvoMessages, msg]);
                    // @ts-ignore
                    e.target.reset();
                  });
              }}
              className="panel conversation__message-box"
            >
              <input
                type="text"
                placeholder="Type a message"
                name="msg"
                // value=""
              />
              <button type="submit">
                {/* <!-- This is the send button --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="currentColor"
                    d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                  ></path>
                </svg>
              </button>
            </form>
          )}
        </footer>
      </main>
    </div>
  );


  return <h1>testttttttttttttttttttt</h1>
};

export default MainApp;
