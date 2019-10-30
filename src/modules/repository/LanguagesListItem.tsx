import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ILanguagesNode } from "../Queries";

export interface ILanguagesListItemProps {
  node: ILanguagesNode;
}

const useStyles = makeStyles<Theme, ILanguagesListItemProps>(
  (theme: Theme) => ({
    language: {
      alignItems: "baseline",
      display: "inline-flex",
      marginRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      userSelect: "none",

      "&:before": {
        background: props => props.node.color,
        borderRadius: theme.spacing(1),
        boxShadow:
          "0px 1px 2px hsla(0, 0%, 50%, 0.35),0px 1px 5px hsla(0, 0%, 50%, 0.7)",
        content: "''",
        display: "inline-flex",
        height: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: theme.spacing(2),
        transform: "translateY(2px)"
      }
    }
  })
);

const Language = (props: ILanguagesListItemProps) => {
  const classes = useStyles(props);
  const { node }: ILanguagesListItemProps = props;

  return <Typography className={classes.language}>{node.name}</Typography>;
};

export default Language;
