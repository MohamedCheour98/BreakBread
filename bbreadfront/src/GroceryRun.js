import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";


let inventory = [

];
function GroceryRun(props){
    
    const [person, setPerson] = useState({
        item: "",
        price: "",
        user: "",
    })

    function handleChange(event) {
        const { name, value } = event.target; /* added inventory*/
        if (name === "price")
          setPerson({ item: person["item"], price: value, user: person["user"]});
        else if (name === "item")
            setPerson({ item: value, price: person["price"], user: person["user"]});
        else(setPerson({ item: person["item"], price: person["price"], user: value}))

      }

    async function submitForm() {
      let newPerson = person
      inventory.push(newPerson)
      setPerson({ item: "", price: "", user: ""});
      }

      async function makePatchCall(person) {
        // doesn't work for breakbread2
        try {
          const response = await axios.patch(" https://breakbread2.herokuapp.com/users", person);  
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
        <label htmlFor="user">User</label>
        <input
          type="text"
          name="user"
          value={person.user}
          onChange={handleChange}
        />
      </div>

      <input type="button" value="add item" onClick={submitForm} />
      <Link to = "/profile" className = "button"> Return </Link>
      <input type="button" value="finish run" onClick={submitInventory} />
    </form>


    );
}
export default GroceryRun;