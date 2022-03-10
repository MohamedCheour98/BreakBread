import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { useHistory, useLocation } from 'react-router-dom';
import { Redirect } from "react-router";


let inventory = [

];
function GroceryRun(props){
  let location = useLocation();
  let currentUser = location.state.user;

  const[user, setUser] = useState({});

    const [person, setPerson] = useState({
        item: "",
        price: "",
        quantity: "",
        user: "",
    })
    const [returnBack, setReturnBack] = useState(false)

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
      async function makeGetCall(username, password) {
        try {
          const response = await axios.get(
            "http://localhost:5000/users?username=" +
              username +
              "&password=" +
              password
          );
          return response;
        } 
        
        catch (error) {
          console.log(error);
          return false;
        }
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
  
      
     //currentUser = finalAddedUser1;

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
      <input type="button" value="Return" onClick={goBack}/>
      {returnBack ? (
        <div>
        <Redirect to={{pathname: "/profile", state: {user : user}}} /> 
      
      </div> 
      ): null}
      <input type="button" value="finish run" onClick={submitInventory}/>

    </form>


    );
  
    async function goBack(){
      let currentUser2 = await makeGetCall(currentUser.username, currentUser.password);
      let finalAddedUser1 = currentUser2.data.users_list[0];
      await setUser(finalAddedUser1);
      setReturnBack(true);
    }
}
export default GroceryRun;