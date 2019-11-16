import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LanguagesListItem from "./LanguagesListItem";
import { ILanguagesEdge } from "../Queries";

export interface ILanguagesListProps {
  edges: ILanguagesEdge[];
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  }
}));

const LanguagesList = (props: ILanguagesListProps) => {
  const classes = useStyles(props);
  const { edges }: ILanguagesListProps = props;

  return (
    <div className={classes.root}>
      {edges.map(({ node }: ILanguagesEdge) => (
        <LanguagesListItem key={node.id} node={node} />
      ))}
    </div>
  );
};

export default LanguagesList;
