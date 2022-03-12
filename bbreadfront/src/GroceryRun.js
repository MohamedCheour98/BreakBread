import React, { useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Redirect } from "react-router";


let inventory = [
  

];
let finalTable = [


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
    const [show, setShow] = React.useState(false);
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
          // https://breakbread2.herokuapp.com/users?username=un&password=p for herokuapp instead of local
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
      // https://breakbread2.herokuapp.com/users for herokuapp instead of local
      try {
          const response = await axios.patch("http://localhost:5000/users", {item: person, mode: "add"});  
          return response;
        
        } catch (error) {  
          console.log(error);
          return false;
        }
      }

    // function that updates after the finish run button is hit on the grocery run page
    // this function parses the inventory list and sends all the objects to the backend 
    // then shows the total price by user on the grocery run page
    
    async function submitInventory() {
      for (let i = 0; i < inventory.length; i++) {
        await makePatchCall(inventory[i])
      }
      let userFlag = 0;
      let userCount = 0
      for (let i = 0; i < inventory.length; i++) {
        for (let j = 0; j < finalTable.length; j++) {
          if (inventory[i].user === finalTable[j].user) {
            userFlag = 1;
            userCount = j;
          }
        }
        if (userFlag === 1) {
          finalTable[userCount].price = finalTable[userCount].price + parseFloat(inventory[i].price);
        } else {
          finalTable.push({user: inventory[i].user, price: parseFloat(inventory[i].price)});
        }
        userFlag = 0;
      }
      console.log(finalTable);
      setShow(true);
      inventory = [];
      finalTable = [];
    }

    function FinalTableHeader() {
      return (
          <thead>
            <tr>
              <th>User</th>
              <th>Total Price</th>
            </tr>
          </thead>
  );
  }
  
  function FinalTableBody(props) {
  const rows = finalTable.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.user}</td>       
          <td>{row.price}</td>  
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );	
  }

  // this table shows the total price by user of the entire grocery run
  
  function FinalTable(props) {
      return (
        
        <table>
          <FinalTableHeader />
          <FinalTableBody />
        </table>
      );
  } 

    function TrackingTableHeader() {
      return (
          <thead>
            <tr>
              <th>Inventory</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>User</th>
            </tr>
          </thead>
  );
  }

  
  function TrackingTableBody(props) {
  const rows = inventory.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.item}</td>
          <td>{row.price}</td> 
          <td>{row.quantity}</td>
          <td>{row.user}</td>        
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );	
  }
  
  // this table shows all the items added to the grocery run
  
  function TrackingTable(props) {
      return (
        
        <table>
          <TrackingTableHeader />
          <TrackingTableBody />
        </table>
      );
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
        <input type="button" value="add item" onClick={submitForm} />
        <input type="button" value="finish run" onClick={submitInventory}/>

      </div>

      {returnBack ? (
        <div>
        <Redirect to={{pathname: "/profile", state: {user : user}}} /> 
      
      </div> 
      ): null}
      <div className = "header">
      <h2>Groceries to Add</h2>
      <TrackingTable />
      {show ? (
        <div id="ip">
          <FinalTable />
        </div>
      ) : null}
      </div>
      //
      <input type="button" value="Return" onClick={goBack}/>
      //
    </form>


    );
  
    async function goBack(){
      let currentUser2 = await makeGetCall(currentUser.username, currentUser.password);
      let finalAddedUser1 = currentUser2.data.users_list[0];
      setUser(finalAddedUser1);
      setReturnBack(true);
    }
}
export default GroceryRun;
