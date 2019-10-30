import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { IPaginationInfo } from "../../Queries";

export interface ISearchPaginationProps {
  color?: string;
  onPageDown: () => void;
  onPageUp: () => void;
  pageInfo: IPaginationInfo;
  repositoryCount: number;
}

const useStyles = makeStyles<Theme, ISearchPaginationProps>((theme: Theme) => ({
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
    display: "flex",
    flex: 1,
    flexBasis: "100%",
    justifyContent: "space-between",
    padding: "4px 0"
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
    "&:first-of-type": {
      marginLeft: 8
    },
    "&:last-of-type": {
      marginRight: 8
    }
  },
  pageInfo: {
    color: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.contrastText;
        case "secondary":
          return theme.palette.primary.contrastText;
        default:
          return undefined;
      }
    }
  }
}));

const SearchPagination = (props: ISearchPaginationProps) => {
  const classes = useStyles(props);
  const {
    onPageDown,
    onPageUp,
    pageInfo,
    repositoryCount
  }: ISearchPaginationProps = props;

  function onChange(direction: string): void {
    if (!direction) return;
    if (direction === "down") {
      onPageDown();
    } else {
      onPageUp();
    }
  }

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.iconButton}
        disabled={!pageInfo.hasPreviousPage}
        onClick={() => onChange("down")}
      >
        <ChevronLeft />
      </IconButton>
      <Typography className={classes.pageInfo} variant="button">
        {repositoryCount} total results
      </Typography>
      <IconButton
        className={classes.iconButton}
        disabled={!pageInfo.hasNextPage}
        onClick={() => onChange("up")}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default SearchPagination;
