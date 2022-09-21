import React from "react";
import Cards from "../Cards/Cards";
import BasicTable from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h3 style={{textAlign:"right"}}>נתונים</h3>
      <Cards />
      <BasicTable />
    </div>
  );
};

export default MainDash;