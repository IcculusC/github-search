import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import ResultsListItem from "./ResultsListItem";
import { IRepositoryEdge } from "../../Queries";

export interface IResultsListProps {
  edges: IRepositoryEdge[];
  show?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "hsla(200, 85%, 98%, 1)",
    boxSizing: "border-box",
    maxWidth: 600,
    width: "100%"
  },
  emptyState: {
    color: theme.palette.text.hint,
    padding: theme.spacing(4)
  }
}));

const Results = (props: IResultsListProps) => {
  const classes = useStyles(props);
  const { edges, show = false }: IResultsListProps = props;
  const [expanded, setExpanded] = useState<string>("-1");

  function onChange(id: string, expanded: boolean): void {
    if (!expanded) {
      setExpanded("-1");
    } else {
      setExpanded(id);
    }
  }

  return (
    <Collapse className={classes.root} in={show}>
      {edges && !edges.length ? (
        <Typography className={classes.emptyState} variant="h6">
          Oh no! This is the empty state...
        </Typography>
      ) : null}
      {edges && edges.length
        ? edges.map(({ node }: IRepositoryEdge) => (
            <ResultsListItem
              expanded={expanded === node.id}
              key={node.id}
              node={node}
              onChange={onChange}
            />
          ))
        : null}
    </Collapse>
  );
};

export default Results;
