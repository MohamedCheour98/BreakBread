import React from 'react'

function TableHeader() {
    return (
        <thead>
          <tr>
            <th>From</th>
            <th>Owed</th>
          </tr>
        </thead>
);
}

function TableBody(props) {
const rows = props.user.inventory.itemOwedCount.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.user}</td>
        <td>${row.price}</td> 
        <td><button onClick={() => props.removePayment(index, "owed")}>Resolved</button></td>        

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
  console.log(props);
    return (
      
      <table>
        <TableHeader />
        <TableBody user={props.user} removePayment = {props.removePayment}  />
      </table>
    );
} 
export default InventoryTable;
