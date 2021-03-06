import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";

export interface ISearchInputProps {
  color?: string;
  onChange: (e: React.SyntheticEvent) => void;
  onSearch: () => void;
  value?: string;
}

const useStyles = makeStyles<Theme, ISearchInputProps>(theme => ({
  root: {
    alignItems: "center",
    background: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.secondary.main;
        default:
          return undefined;
      }
    },
    boxSizing: "border-box",
    display: "flex",
    maxWidth: 600,
    paddingBottom: 4,
    width: "100%"
  },
  iconButton: {
    color: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.contrastText;
        case "secondary":
          return theme.palette.primary.contrastText;
        default:
          return undefined;
      }
    },
    marginRight: theme.spacing(1),
    position: "relative"
  },
  input: {
    color: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.contrastText;
        case "secondary":
          return theme.palette.primary.contrastText;
        default:
          return undefined;
      }
    },
    flex: 1,
    paddingLeft: theme.spacing(2),
    "& input[type=text]::placeholder": {
      opacity: 0.75
    }
  }
}));

const SearchInput = (props: ISearchInputProps) => {
  const classes = useStyles(props);
  const { onChange, onSearch, value }: ISearchInputProps = props;
  return (
    <Paper square className={classes.root} elevation={0}>
      <InputBase
        autoFocus
        className={classes.input}
        onChange={onChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder='Search Github repositories and press Enter... try "apollo-client"'
        type="text"
        value={value}
      />
      <IconButton
        centerRipple
        className={classes.iconButton}
        onClick={() => onSearch()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchInput.defaultProps = {
  color: "",
  value: ""
};

export default SearchInput;
