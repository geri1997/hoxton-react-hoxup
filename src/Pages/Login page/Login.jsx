import React from 'react'

const Login = () => {
    return (
        <div className="main-wrapper login">
      <section className="login-section">
        <h2>Choose your user!</h2>
        <ul>
          <li>
            <button className="user-selection">
              <img
                className="avatar"
                width="50"
                height="50"
                src="https://robohash.org/1"
                alt=""
              />
              <h3>John Doe</h3>
            </button>
          </li>
          <li>
            <button className="user-selection">
              <img
                className="avatar"
                width="50"
                height="50"
                src="https://robohash.org/2"
                alt=""
              />
              <h3>Tin Man</h3>
            </button>
          </li>
          <li>
            <button className="user-selection">
              <img
                className="avatar"
                width="50"
                height="50"
                src="https://robohash.org/3"
                alt=""
              />
              <h3>Carl T-800</h3>
            </button>
          </li>
          <li>
            <button className="user-selection">
              <h3>+ Add a new user</h3>
            </button>
          </li>
        </ul>
      </section>
    </div>
    )
}

export default Login
