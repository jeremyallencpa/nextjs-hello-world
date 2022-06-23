import { makeStyles } from "@material-ui/core";
import { useReducer, useContext, createContext } from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid white",
      borderRadius: 5,
      padding: 5,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "white" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 500 : 500,
      "&:hover": {
        backgroundColor: "white",
        color: "black",
      },
      width: "20%",
      margin: 6,
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;