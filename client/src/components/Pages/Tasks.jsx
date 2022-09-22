import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './Tasks.css'
import axios from 'axios'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import TableHead from "@mui/material/TableHead";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? ">>" : "<<"}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? ">" : "<"}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? "<": ">"}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? "<<" : ">>"}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [hazards, setHazards] = useState([]);

  const getHazards = () => {
    axios.get("/api/hazards").then((res) => {
      console.log(res.data);
      res.data && setHazards(res.data);
    });
  };

   const removeHandler = (id) => {
     axios.delete(`api/hazards/${id}`).then(getHazards());
     console.log(hazards);
  };

  useEffect(() => {
    getHazards();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - hazards.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const statusColor = (hazardStatus) => {
    if (hazardStatus === "בוצע") {
      return "green";
    } else if (hazardStatus === "בביצוע") {
      return "yellow";
    } else return "red";
  };
  return (
    <TableContainer component={Paper} className="TableContainer">
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="right">סוג דיווח</TableCell>
              <TableCell align="right">מיקום</TableCell>
              <TableCell align="right">תאריך דיווח</TableCell>
              <TableCell align="right">סיבה</TableCell>
              <TableCell align="center">סטטוס</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? hazards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : hazards
          ).map((hazard,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Button variant="contained" onClick={() => removeHandler(hazard._id)}>בוצע</Button>
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {hazard.type}
              </TableCell>
              <TableCell component="th" scope="row" align="right" >
                {hazard.location}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {hazard.date}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {hazard.body}
              </TableCell>
              
              <TableCell className={statusColor(hazard.status)} style={{ width: 80 }} align="center">
                {hazard.status}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[6, 8, 15, 25, { label: 'All', value: -1 }]}
              colSpan={10}
              count={hazards.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}