import React from 'react'

const Header = ({user}) => {
    return (
        <header className="panel">
          <img
            className="avatar"
            width="50"
            height="50"
            src={user.avatar}
            alt=""
          />
          <h3>
            {user.firstName} {user.lastName}
          </h3>
        </header>
    )
}

export default Header
