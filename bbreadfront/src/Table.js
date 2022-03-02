import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  return <tbody>{props}</tbody>;
}
function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        user={props.user}
      />
    </table>
  );
}
export default Table;