import React, { useEffect, useState } from "react";

export const StudentDetail = () => {
  // state for student data
  const [user, setUser] = useState([]);
  useEffect(() => {
    // getting data from local storage
    setUser(JSON.parse(localStorage.getItem("StudentData")));
  }, []);
  return (
    <div style={{ marginTop: "5%" }}>
      <div className="detail">
        {/* displaying student detail */}
        <table className="table table-striped">
          <tr>
            <th>Name :</th>
            <td>{user.name}</td>
            <td>
              <img src={user.img} alt="" className="img" />
            </td>
          </tr>
          <tr>
            <th>Age :</th>
            <td>{user.age}</td>
          </tr>
          <tr className="mt-3">
            <th>Qualification :</th>
            <td>{user.Qualification}</td>
          </tr>
          <tr>
            <th>Your Id proof :</th>
            <td>{user.pdfName}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
