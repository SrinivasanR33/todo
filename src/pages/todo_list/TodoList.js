import React, { useEffect, useState } from "react";
import StickyHeadTable from "../../components/table/TableData";
import { getTodoList } from "../../service/Todoservice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function TodoList() {
  const [stateValue, setstateValue] = useState({
    id: "",
    title: "",
    status: false,
    edit: false,
  });
  const [open, setOpen] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const handleInputChange = (e, index) => {
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setstateValue((per) => {
      return {
        ...per,
        [index]: newValue,
      };
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
    setstateValue({
      title: "",
      status: false,
      edit: false,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setstateValue({
      title: "",
      status: false,
      edit: false,
    });
  };
  const GETApi = async () => {
    try {
      const res = await getTodoList();
      setTodoItems(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handelCreate = () => {
    if (stateValue.edit) {
      const res = todoItems.findIndex((val) => val.id === stateValue.id);
      if (res !== -1) {
        todoItems[res].title = stateValue?.title;
        todoItems[res].completed = stateValue?.status;
      }
      setOpen(false);
    } else {
      todoItems.push({
        id: todoItems.length,
        title: stateValue.title,
        completed: stateValue.status,
      });
      setOpen(false);
    }
  };
  useEffect(() => {
    GETApi();
  }, []);

  return (
    <div className="min-h-screen">
      <Box className="p-6 flex justify-center">
        <Typography variant="h4">Todo List</Typography>
      </Box>
      <Box className="p-6 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen()}
        >
          +Add
        </Button>
      </Box>
      <div className="p-5">
        <StickyHeadTable
          rows={todoItems}
          setstateValue={setstateValue}
          setOpen={setOpen}
          setTodoItems={setTodoItems}
        />
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
        <DialogTitle variant="h5" align="center">
          Todo Master
        </DialogTitle>
        <DialogContent>
          <Box className="flex flex-col gap-4 p-2">
            <TextField
              value={stateValue.title}
              onChange={(e) => handleInputChange(e, "title")}
              type="text"
              label={"Title"}
              fullWidth
              variant="outlined"
            />

            <FormGroup>
              <FormControlLabel
                checked={stateValue.status}
                onChange={(e) => handleInputChange(e, "status")}
                control={<Checkbox />}
                label="Status"
              />
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button
            color="success"
            variant="contained"
            disabled={!stateValue.title}
            onClick={handelCreate}
            type="submit"
          >
            {stateValue.edit ? "Edit" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TodoList;
