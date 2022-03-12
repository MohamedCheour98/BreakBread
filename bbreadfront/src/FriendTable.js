import React from 'react'

function TableHeader() {
    return (
        <thead>
          <tr>
            <th>Friends</th>
          </tr>
        </thead>
);
}

function TableBody(props) {
const rows = props.user.friends.friendList.map((row, index) => {
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

// this table renders the friends on the profile page

function FriendTable(props) {
    return (
      
      <table>
        <TableHeader />
        <TableBody user={props.user} />
      </table>
    );
} 
export default FriendTable;
