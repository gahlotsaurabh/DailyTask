import React, { useState, useRef } from "react";
import { createTask } from "../APIs/api";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { TASK_TYPES } from "../utils";

const AddTask = ({ setData1, classes, rows, useStyles }) => {
  const [taskName, setTaskName] = useState("");
  const [detail, setDetail] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const taskType = useRef();
  const classesDAte = useStyles();

  const handleAddTask = () => {
    let newTask = {
      name: taskName,
      detail: detail,
      _type: taskType.current.value,
      _to: toDate,
      _from: fromDate,
    };
    createTask(newTask)
      .then(({ data }) => {
        console.log(data);
        setData1([...rows, data]);
        setTaskName("");
        setDetail("");
        setFromDate(null);
        setFromDate(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const style = {
    header: {
      fontWeight: "900",
      fontSize: "2rem",
      backgroundColor: "#adfeff",
      padding: "10px",
      borderRadius: "5px",
      textAlign: "center",
      marginBlock: "5px",
      flexDirection: "column",
      display: "flex",
      float: "left",
      background: "rgba(225, 225, 225, 0.6)",
      marginLeft: "10vw",
      marginRight: "auto",
    },
    taskWrap: {
      backgroundColor: "#adfeff",
      float: "right",
      background: "rgba(225, 225, 225, 0.6)",
      borderRadius: "5px",
      marginLeft: "auto",
      marginRight: "10vw",
      marginBottom: "10px",
    },
    input: {
      width: "200px",
      height: "20px",
      marginBlock: "2px",
    },
  };

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };
  const handleDetail = (event) => {
    setDetail(event.target.value);
  };
  const handleFromDate = (x, e) => {
    setFromDate(x.target.value);
  };
  const handleToDate = (x, event) => {
    setToDate(x.target.value);
  };

  return (
    <div className="task-wrapper" style={style.taskWrap}>
      <div className="add-task">
        <h1>Add task</h1>
        <input
          type="text"
          style={style.input}
          value={taskName}
          onChange={(e) => handleTaskName(e)}
          placeholder="Task Name"
        />
        <br />
        <input
          type="text"
          style={style.input}
          value={detail}
          onChange={(e) => handleDetail(e)}
          placeholder="Task Detail"
        />
        <br />
        <select
          name="Change Status"
          ref={taskType}
          style={{
            padding: "5px",
            width: "205px",
            marginBottom: "5px",
          }}
        >
          {TASK_TYPES.map((option, index) => (
            <option
              key={index}
              value={option.value}
            >{`Add to ${option.title}`}</option>
          ))}
        </select>
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-localfrom"
            label="Start time"
            type="datetime-local"
            onChange={(x, e) => handleFromDate(x, e)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <form className={classesDAte.container} noValidate>
          <TextField
            id="datetime-local"
            label="End Time"
            type="datetime-local"
            onChange={(x, e) => handleToDate(x, e)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              margin: "5px",
            }}
          />
        </form>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleAddTask}
          style={{
            margin: "5px",
          }}
        >
          ADD
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
