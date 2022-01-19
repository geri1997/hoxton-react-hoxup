// @ts-ignore
import "../../../styles/modal.css";

export default function Modal({ setIsModalShown, setUsers }) {
  function signUp(user) {
    fetch(`http://localhost:4000/users/?phoneNumber=${user.phoneNumber}`)
      .then((resp) => {
        return resp.json();
      })
      .then((serverUser) => {
        if (serverUser.length === 0) {
          createNewUserOnServer(user)
            .then((resp) => resp.json())
            .then((user) =>
              setUsers((prevUser) => {
                const newUser = [...prevUser];
                newUser.push(user);
                return newUser;
              })
            );
          setIsModalShown((prevModal) => (prevModal = false));
        }
      });
  }
  // @ts-ignore
  function createNewUserOnServer(user) {
    return fetch("http://localhost:4000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  return (
    <section
      onClick={(e) => {
        // @ts-ignore
        if (e.target.classList.contains("modal-wrapper")) {
          setIsModalShown((prevModal) => (prevModal = false));
        }
      }}
      className="modal-wrapper"
    >
      <div
        // onClick={e=>e.stopPropagation()}
        className="modal"
      >
        <h2>Enter your details</h2>
        <form
          style={{ display: "grid" }}
          onSubmit={(e) => {
            e.preventDefault();
            signUp({
              // @ts-ignore
              firstName: e.target.firstname.value,
              // @ts-ignore
              lastName: e.target.lastname.value,
              // @ts-ignore
              phoneNumber: e.target.phoneNr.value,
              // @ts-ignore
              avatar: `https://avatars.dicebear.com/api/avataaars/${e.target.firstname.value}${e.target.lastname.value}.svg`,
            });
          }}
        >
          <label htmlFor="firstName">First Name</label>
          <input required type="text" name="firstname" id="firstname" />
          <label htmlFor="lastName">Last Name</label>
          <input required type="text" name="lastname" id="lastname" />
          <label htmlFor="phoneNr">Phone number</label>
          <input required type="text" name="phoneNr" id="phoneNr" />
          <button
            style={{ backgroundColor: "#009688", textAlign: "center" }}
            className="ok-button"
          >
            CREATE USER
          </button>
        </form>
        <button
          // @ts-ignore
          onClick={(e) => {
            setIsModalShown((prevModal) => (prevModal = false));
          }}
          className="close-modal-btn"
        >
          X
        </button>
      </div>
    </section>
  );
}
