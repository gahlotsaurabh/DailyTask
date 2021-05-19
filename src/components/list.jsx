import React, { useState, useEffect } from "react";
import { getAllTask, deleteTask } from "../APIs/api";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddTask from "./addTask";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 150,
    margin: 10,
  },
}));

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    opacity: 0.5,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = (theme) => ({
  root: {
    width: "80%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    display: "flex",
    margin: "auto",
  },
  table: {
    minWidth: 700,
  },
  row: {
    // '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default,
    opacity: 0.8,
    // },
  },
});

function CustomizedTable(props) {
  const { classes } = props;
  const [rows, setData1] = useState(null);
  const [, setSearchKey] = useState("");

  const classesDAte = useStyles();

  useEffect(() => {
    if (!rows) {
      getAllTask()
        .then(({ data }) => {
          setData1(data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rows]);

  const parseDate = (date) => {
    let dt = new Date(date);
    return (
      dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
      //  +
      // "/" +
      // dt.toLocaleTimeString()
    );
  };
  const onDeleteTask = (e) => {
    if (e.target.id) {
      deleteTask(e.target.id)
        .then(({ data }) => {
          console.log(data.results);
          setData1(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearchDate = (x, event) => {
    setSearchKey(x.target.value);
    let query = `?startDate=${x.target.value}`;
    getAllTask(query)
      .then(({ data }) => {
        setData1(data.results);
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

  return (
    <div>
      <div className="header" style={style.header}>
        <span>Daily Task</span>
        <form className={classesDAte.container} noValidate>
          <TextField
            id="datetime-local"
            label="Search Start date"
            type="datetime-local"
            onChange={(x, e) => handleSearchDate(x, e)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              margin: "5px",
            }}
          />
        </form>
      </div>
      <AddTask
        setData1={setData1}
        classes={classes}
        rows={rows}
        useStyles={useStyles}
      />
      <Box className={classes.root}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">Name</CustomTableCell>
              <CustomTableCell align="center">Detail</CustomTableCell>
              <CustomTableCell align="center">Type</CustomTableCell>
              <CustomTableCell align="center">From</CustomTableCell>
              <CustomTableCell align="center">To</CustomTableCell>
              <CustomTableCell align="center">Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length ? (
              rows.map((row) => (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell align="center" component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell align="center">{row.detail}</CustomTableCell>
                  <CustomTableCell align="center">{row._type}</CustomTableCell>
                  <CustomTableCell align="center">
                    {parseDate(row._from)}
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    {parseDate(row._to)}
                  </CustomTableCell>
                  <DeleteForeverIcon
                    className={classes.icon}
                    id={row.id}
                    onClick={(e) => onDeleteTask(e)}
                  />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <CustomTableCell
                  style={{ visibility: "hidden" }}
                ></CustomTableCell>
                <CustomTableCell
                  style={{ visibility: "hidden" }}
                ></CustomTableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.button}
                  style={{
                    margin: "10px",
                  }}
                >
                  No New Task Available
                </Button>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
