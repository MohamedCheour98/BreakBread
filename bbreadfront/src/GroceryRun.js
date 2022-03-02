import React, { useState } from "react";

function GroceryRun(props){
    const [person, setPerson] = useState({
        item: "",
        price: "",
    })

    function handleChange(event) {
        const { name, value } = event.target; /* added inventory*/
        if (name === "price")
          setPerson({ item: person["item"], price: value });
        else setPerson({ item: value, price: person["price"] });
      }

    async function submitForm() {
        setPerson({ item: "", price: "" });
      }

    return(
    <form>
      <div className="form">
        <label htmlFor="item">Item</label>
        <input
          type="text"
          name="item"
          value={person.username}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          value={person.password}
          onChange={handleChange}
        />
      </div>

      <input type="button" value="add" onClick={submitForm} />

    </form>


    );
}
export default GroceryRun;