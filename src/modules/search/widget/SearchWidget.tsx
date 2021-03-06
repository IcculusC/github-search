import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import SearchInput, { ISearchInputProps } from "./SearchInput";
import SearchPagination, { ISearchPaginationProps } from "./SearchPagination";

export interface ISearchWidgetProps {
  color?: string;
  loading?: boolean;
  SearchInputProps: ISearchInputProps;
  SearchPaginationProps: ISearchPaginationProps;
  showPagination?: boolean;
}

const useStyles = makeStyles<Theme, ISearchWidgetProps>((theme: Theme) => ({
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
    flexWrap: "wrap",
    maxWidth: 600,
    paddingTop: 4,
    width: "100%"
  },
  progress: {
    boxSizing: "border-box",
    width: "100%"
  },
  collapse: {
    width: "100%"
  },
  divider: {
    background: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.contrastText;
        case "secondary":
          return theme.palette.primary.contrastText;
        default:
          return undefined;
      }
    },
    width: "100%"
  },
  pagination: {
    width: "100%"
  }
}));

const SearchWidget = (props: ISearchWidgetProps) => {
  const classes = useStyles(props);
  const {
    color,
    loading,
    showPagination,
    SearchInputProps,
    SearchPaginationProps
  }: ISearchWidgetProps = props;

  return (
    <Paper square className={classes.root} elevation={0}>
      <SearchInput color={color} {...SearchInputProps} />
      <Collapse className={classes.collapse} in={showPagination}>
        <Divider light className={classes.divider} />
        <SearchPagination color={color} {...SearchPaginationProps} />
      </Collapse>
      <Collapse className={classes.collapse} in={loading}>
        <LinearProgress
          className={classes.progress}
          color={color === "primary" ? "secondary" : "primary"}
        />
      </Collapse>
    </Paper>
  );
};

export default SearchWidget;
