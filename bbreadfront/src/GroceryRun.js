import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom"
import axios from "axios";
import { useLocation} from 'react-router-dom';


let inventory = [

];
function GroceryRun(props){
    
    const [person, setPerson] = useState({
        item: "",
        price: "",
        quantity: "",
        user: "",
    })
    let location = useLocation();
    console.log(location.state.user)
    const [redirect, setRedirect] = React.useState(false);
    const [userData, setUserData] = useState({});
    function handleChange(event) {
        const { name, value } = event.target; /* added inventory*/
        if (name === "price")
          setPerson({ item: person["item"], price: value, quantity: person["quantity"], user: person["user"]});
        else if (name === "item")
            setPerson({ item: value, price: person["price"], quantity: person["quantity"], user: person["user"]});
        else if (name === "quantity")
          setPerson({ item: person["item"], price: person["price"], quantity: value, user: person["user"]})
        else(setPerson({ item: person["item"], price: person["price"], quantity: person["quantity"], user: value}))

      }
    async function submitReturn() {
      setRedirect(true);
    }
    async function submitForm() {
      let newPerson = person
      inventory.push(newPerson)
      setPerson({ item: "", price: "", quantity: "", user: ""});
      }

      async function makePatchCall(person) {
        // doesn't work for breakbread2
        try {
          const response = await axios.patch("http://localhost:5000/users", person);  
          return response;
        
        } catch (error) {  
          console.log(error);
          return false;
        }
      }
    
    async function submitInventory() {
      for (let i = 0; i < inventory.length; i++) {
        console.log(inventory[i])
        await makePatchCall(inventory[i])
      }
    }
    return(
    <form>
      <div className="form">
        <label htmlFor="item">Item</label>
        <input
          type="text"
          name="item"
          value={person.item}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          value={person.price}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          name="quantity"
          value={person.quantity}
          onChange={handleChange}
        />
        <label htmlFor="user">User</label>
        <input
          type="text"
          name="user"
          value={person.user}
          onChange={handleChange}
        />
        
      </div>

      <input type="button" value="add item" onClick={submitForm} />
      <div className = "grocery">
      <input type="button" value="return" onClick={submitReturn} />
      {redirect  ? (<div>
        <Redirect to={{pathname: "/profile", state: {user: userData}}}  />
      </div> 
      ): null}  
      </div>
      <input type="button" value="finish run" onClick={submitInventory} />
    </form>


    );
    // <Link to = "/profile" className = "button"> Return </Link>
}
export default GroceryRun;