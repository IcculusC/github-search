import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles'
import LanguagesListItem from "./LanguagesListItem";
import { ILanguageNode } from '../common'

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  }
}));

export interface ILanguagesListProps {
  edges: [{ node: ILanguageNode }]
}

const LanguagesList = (props: ILanguagesListProps) => {
  const classes = useStyles(props);
  const { edges } = props;

  return (
    <div className={classes.root}>
      {edges.map(({ node }) => (
        <LanguagesListItem key={node.id} node={node} />
      ))}
    </div>
  );
};

export default LanguagesList;
