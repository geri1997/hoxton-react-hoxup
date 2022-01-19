import React, { useEffect, useState } from "react";
import Header from "./Components/Header";

const MainApp = ({ user, users }) => {
  const [convos, setConvos] = useState([]);
  const [otherConvs, setOtherConvs] = useState([]);
  const [convoUsers, setConvoUsers] = useState([]);
  const [allConvos, setAllConvos] = useState([])

  

  //fetch conversations
  useEffect(() => {
    fetch(`http://localhost:4000/conversations?userId=${user.id}`)
      .then((resp) => resp.json())
      .then((serverConvos) => {
        setConvos(serverConvos);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:4000/conversations?participantId=${user.id}`)
      .then((resp) => resp.json())
      .then((serverConvos) => {
        setOtherConvs(serverConvos);
      });
  }, []);



  

//   useEffect(() => {
//     for (const convo of otherConvs) {
//       if (user.id === convo.userId) {
//         fetch(`http://localhost:4000/users/${convo.participantId}`)
//           .then((resp) => resp.json())
//           .then((user1) => {
//             setConvoUsers([...convoUsers, user1]);
//           });
//       } else if (user.id === convo.participantId) {
//         fetch(`http://localhost:4000/users/${convo.userId}`)
//           .then((resp) => resp.json())
//           .then((user1) => {
//             setConvoUsers([...convoUsers, user1]);
//           });
//       }
//     }
//   }, [otherConvs]);
  useEffect(() => {
      
      setAllConvos(convos.concat(otherConvs) )
      let userArr=[]
    for(let conv of allConvos){
        for(let user1 of users){
            if(conv.userId===user1.id&&user.id!==user1.id){
                userArr=[...userArr,user1]
            }
        }
    }
    for(let conv of allConvos){
        for(let user1 of users){
            if(conv.participantId===user1.id&&user.id!==user1.id){
                userArr=[...userArr,user1]
            }
        }
    }
    
    setConvoUsers(userArr)
  }, [convos,otherConvs]);

  return (
    <div className="main-wrapper">
      {/* <!-- Side Panel --> */}
      <aside>
        {/* <!-- Side Header --> */}
        <Header user={user} />

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
            <button className="chat-button">
              <div>
                <h3>+ Start a new Chat</h3>
              </div>
            </button>
          </li>
          {convoUsers.map((user) => {
            return (
              <li key={user.id}>
                <button className="chat-button">
                  <img
                    className="avatar"
                    height="50"
                    width="50"
                    alt=""
                    src={user.avatar}
                  />
                  <div>
                    <h3>{user.firstName}</h3>
                    <p>Last message</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* <!-- Main Chat Section --> */}
      <main className="conversation">
        {/* <!-- Chat header --> */}
        <header className="panel"></header>

        {/* <!-- 

      The Messages List will go here. Check main-messages-list.html
     --> */}

        <ul className="conversation__messages">
          <li className="outgoing">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              excepturi non odit quisquam et assumenda suscipit maxime officiis
              repellat possimus! Soluta illum rerum eligendi labore ut nemo quod
              voluptates ad.
            </p>
          </li>

          {/* <!-- Outgoing messages are messages sent by the current logged in user --> */}
          <li className="outgoing">
            <p>Lorem ipsum...</p>
          </li>

          {/* <!-- This one doesnt belong to the current logged in user --> */}
          <li>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              excepturi non odit quisquam et assumenda suscipit maxime officiis
              repellat possimus!
            </p>
          </li>

          <li className="outgoing">
            <p>Some test message</p>
          </li>
          <li className="outgoing">
            <p>more messagesss!!!</p>
          </li>
          <li className="outgoing">
            <p>more messagesss!!!</p>
          </li>
          <li className="outgoing">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              excepturi non odit quisquam et assumenda suscipit maxime officiis
              repellat possimus! Soluta illum rerum eligendi labore ut nemo quod
              voluptates ad.Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Natus excepturi non odit quisquam et assumenda suscipit
              maxime officiis repellat possimus! Soluta illum rerum eligendi
              labore ut nemo quod voluptates ad.Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Natus excepturi non odit quisquam
              et assumenda suscipit maxime officiis repellat possimus! Soluta
              illum rerum eligendi labore ut nemo quod voluptates ad.Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Natus excepturi non
              odit quisquam et assumenda suscipit maxime officiis repellat
              possimus! Soluta illum rerum eligendi labore ut nemo quod
              voluptates ad.Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Natus excepturi non odit quisquam et assumenda suscipit
              maxime officiis repellat possimus! Soluta illum rerum eligendi
              labore ut nemo quod voluptates ad.Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Natus excepturi non odit quisquam
              et assumenda suscipit maxime officiis repellat possimus! Soluta
              illum rerum eligendi labore ut nemo quod voluptates ad.Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Natus excepturi non
              odit quisquam et assumenda suscipit maxime officiis repellat
              possimus! Soluta illum rerum eligendi labore ut nemo quod
              voluptates ad.
            </p>
          </li>
        </ul>

        <ul className="conversation__messages"></ul>

        {/* <!-- Message Box --> */}
        <footer>
          <form className="panel conversation__message-box">
            <input
              type="text"
              placeholder="Type a message"
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
        </footer>
      </main>
    </div>
  );
};

export default MainApp;
