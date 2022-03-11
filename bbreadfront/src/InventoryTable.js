import React from 'react'
//this is the inventory table
function TableHeader() {
    return (
        <thead>
          <tr>
            <th>Inventory</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
);
}

function TableBody(props) {
const rows = props.user.inventory.itemList.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.item}</td>
        <td>{row.price}</td> 
        <td>{row.quantity}</td>
        <td><button onClick={() => props.removeItem(index)}>delete</button></td>        
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

function InventoryTable(props) {
    return (
      
      <table>
        <TableHeader />
        <TableBody user={props.user} removeItem = {props.removeItem} />
      </table>
    );
} 
export default InventoryTable;
