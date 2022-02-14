import React, { useState } from "react";





function Form(props) {
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
  const [isAuth, setIsAuth] = useState(true);
  if(!isAuth){
    return <Redirect to = 'https://www.google.com'/>
  }
  return (
    <form>

       

    



      <div className="app">
        <div className="header">
          <h1>BreakBread</h1>
        </div>
      </div>
      <div className = "form">
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="username"
        value={person.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        value={person.password}
        onChange={handleChange}
      />
      </div>
<<<<<<< HEAD
=======
      
>>>>>>> 06436ffc764aa3b7ca34541d91be751609f9e9fa
      <input type="button" value="Login" onClick={submitForm} />

      <button onClick={() => props.history.push("https://www.google.com")}>lmao</button><br />
      <div> isAuth: {isAuth.toString()}</div>


      



      <img src = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"></img>
    
    
      


      

    </form>
  );
}

export default Form;
