import React from 'react'

function TableHeader() {
    return (
        <thead>
          <tr>
            <th>Inventory</th>
          </tr>
        </thead>
);
}

function TableBody(props) {
const rows = props.user.inventory.itemList.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row}</td>         
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
        <TableBody user={props.user} />
      </table>
    );
} 
export default InventoryTable;
