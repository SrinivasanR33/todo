import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import {
  CancelRounded,
  Delete,
  DoneAllRounded,
  Edit,
} from "@mui/icons-material";

export default function StickyHeadTable(props) {
  const { rows, setOpen, setstateValue, setTodoItems } = props;
  const [page, setPage] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const columns = [
    { id: "id", label: "ID", width: 170 },
    { id: "title", label: "Title", width: 170 },
    {
      id: "completed",
      label: "Status",
      width: 200,
      format: (val) => {
        return (
          <Box className="flex gap-4">
            {val.completed ? (
              <DoneAllRounded color="success" onClick={() => handelOpen(val)} />
            ) : (
              <CancelRounded color="error" onClick={() => handelDelete(val)} />
            )}
          </Box>
        );
      },
    },
    {
      id: "Action",
      label: "Action",
      width: 200,

      format: (val) => {
        return (
          <Box className="flex gap-5">
            <Edit
              color="primary"
              className="cursor-pointer"
              onClick={() => handelOpen(val)}
            />
            <Delete
              color="error"
              className="cursor-pointer"
              onClick={() => handelDelete(val)}
            />
          </Box>
        );
      },
    },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handelOpen = (val) => {
    setOpen(true);
    setstateValue({
      id: val.id,
      title: val.title,
      status: val.completed,
      edit: true,
    });
  };
  const handelDelete = (vale) => {
    const res = rows.findIndex((val) => val.id === vale.id);
    if (res !== -1) {
      rows.splice(res, 1);
      setIsActive(!isActive)
      setTodoItems(rows);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.length > 0 &&
              rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(row) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
