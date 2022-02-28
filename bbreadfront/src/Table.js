import React from 'react'

import ProfileForm from "./ProfileForm";



function TableHeader()  {
  return (
    <thead>
      <tr>
        <th>Friends</th>
      </tr>
    </thead>
  );
}




function TableBody(props) {
  const rowsForFriends = props.friends.map((row, index) => {
    return (


<tr key={index}>
  <td>{row._id}</td>
  
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




function Table (props) {
    return (
        <table>
          <TableHeader />
          <TableBody
            
          />
        </table>
      );
    
    

    

  
}




export default Table;
