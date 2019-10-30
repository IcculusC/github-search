import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import useTheme from "@material-ui/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GoRepoForked, GoStar } from "react-icons/go";
import { IRepositoryNode } from "../../Queries";
import { RepositoryDetails } from "../../repository";

export interface IResultsListItemProps {
  expanded?: boolean;
  node: IRepositoryNode;
  onChange: (id: string, expanded: boolean) => void;
}

const useStyles = makeStyles<Theme, IResultsListItemProps>((theme: Theme) => ({
  details: {
    display: "flex",
    flexDirection: "column"
  },
  toolbar: {
    flex: 1,
    justifyContent: "flex-end"
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  summary: {
    alignItems: "center"
  },
  name: {
    textOverflow: "ellipsis"
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const ResultsListItem = (props: IResultsListItemProps) => {
  const classes = useStyles(props);
  const theme: Theme = useTheme();
  const small = useMediaQuery<Theme>(theme.breakpoints.down("sm"));
  const { expanded = false, node, onChange }: IResultsListItemProps = props;

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={(_, expanded) => onChange(node.id, expanded)}
    >
      <ExpansionPanelSummary
        classes={{ content: classes.summary }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.name} variant={small ? "body1" : "h6"}>
          {node.nameWithOwner}
        </Typography>
        <Toolbar className={classes.toolbar} variant="dense">
          {node.isFork ? <GoRepoForked className={classes.icon} /> : null}
          {!small ? (
            <React.Fragment>
              <GoStar />
              <Typography variant="h6">{node.stargazers.totalCount}</Typography>
            </React.Fragment>
          ) : null}
        </Toolbar>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <RepositoryDetails node={node} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ResultsListItem;
