import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from "@material-ui/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GoRepoForked, GoStar } from "react-icons/go";
import { RepoNode } from "../common";
import RepositoryDetails from "./RepositoryDetails";

const useStyles = makeStyles(theme => ({
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
  }
}));

const ResultsListItem = props => {
  const classes = useStyles(props);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const { expanded, node, onChange } = props;

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={(_, expanded) => onChange(node.id, expanded)}
    >
      <ExpansionPanelSummary
        classes={{ content: classes.summary }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.name} variant="h6">
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

ResultsListItem.propTypes = {
  expanded: PropTypes.bool,
  node: RepoNode.isRequired,
  onChange: PropTypes.func.isRequired
};

ResultsListItem.defaultProps = {
  expanded: false,
  forkCount: 0,
  isFork: false
};

export default ResultsListItem;
