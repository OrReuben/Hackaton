import { useEffect, useState } from "react";
import "./Table.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function BasicTable() {
  const [hazards, setHazards] = useState([]);

  const getHazards = () => {
    axios.get("/api/hazards").then((res) => {
      res.data && setHazards(res.data);
    });
  };

//   const removeHandler = (id) => {
//     axios.delete(`api/hazards/${id}`).then(getHazards());
//     console.log(hazards);
//   };

  useEffect(() => {
    getHazards();
  }, []);

  const statusColor = (hazardStatus) => {
    if (hazardStatus === "בוצע") {
      return "green";
    } else if (hazardStatus === "בביצוע") {
      return "yellow";
    } else return "red";
  };

  return (
    <div className="Table">
      <h3 style={{ textAlign: "right" }}>עדכונים אחרונים</h3>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">סוג דיווח</TableCell>
              <TableCell align="right">מיקום</TableCell>
              <TableCell align="right">תאריך דיווח</TableCell>
              <TableCell align="right">סיבה</TableCell>
              <TableCell align="center">סטטוס</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hazards.map((hazard, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {index < 5 && (
                  <TableCell component="th" scope="row" align="right">
                    {hazard.type}
                  </TableCell>
                )}
                {index < 5 && (
                  <TableCell align="right">{hazard.location}</TableCell>
                )}
                {index < 5 && (
                  <TableCell align="right">{hazard.date}</TableCell>
                )}
                {index < 5 && (
                  <TableCell align="right">{hazard.body}</TableCell>
                )}
                {index < 5 && (
                  <TableCell
                    align="center"
                    className={statusColor(hazard.status)}
                  >
                    {hazard.status}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
