import React, { useState } from "react";

function GroceryRun(props){
    
    const inventory = [
      ];

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
        setPerson({ item: "", price: "", user: ""});
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

    </form>


    );
}
export default GroceryRun;