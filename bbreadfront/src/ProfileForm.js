import React, { useState } from "react";

function ProfileForm(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ username: "", password: "" }); /*  id: ''  this was added*/
  }

  function handleChange(event) {
    const { name, value } = event.target; /* added id*/
    if (name === "password") setPerson({ username: person["username"], password: value });
    else setPerson({ username: value, password: person["password"] });
  }

  return (
    <form>
      <div className="app">
        <div className="header">
          <h1>BreakBread</h1>
        </div>
      </div>
      <div className = "form">
      <label htmlFor="friends">Friends</label>
      <input
        type="text"
        name="friends"
        value={person.friends}
        onChange={handleChange}
      />
      <label htmlFor="inventory">Inventory</label>
      <input
        type="text"
        name="inventory"
        value={person.inventory}
        onChange={handleChange}
      />
      </div>
      
    </form>
  );
}

export default ProfileForm;
