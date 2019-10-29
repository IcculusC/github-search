import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from "@material-ui/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import marky from "marky-markdown";
import sanitizeHtml from "sanitize-html";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {
  GoRepoForked,
  GoGitPullRequest,
  GoIssueOpened,
  GoStar
} from "react-icons/go";
import LanguagesList from "./LanguagesList";
import { RepoNode } from "../common";

const useStyles = makeStyles(theme => ({
  details: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    "& span svg": {
      marginRight: theme.spacing(1),
      transform: "translateY(2px)"
    },
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
      flexDirection: "column"
    }
  },
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  stars: {
    alignItems: "center",
    display: "flex",
    marginBottom: theme.spacing(2),
    "& svg": {
      marginRight: theme.spacing(1)
    }
  },
  description: {
    paddingBottom: theme.spacing(2)
  }
}));

const RepositoryDetails = props => {
  const classes = useStyles(props);
  const { node } = props;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (node) {
      setDescription(
        sanitizeHtml(marky(node.description || ""), { allowedTags: [] })
      );
    }
  }, [node]);

  return (
    <React.Fragment>
      <div className={classes.details}>
        {small ? (
          <React.Fragment>
            <Link
              href={node.url}
              rel="noopener noreferrer"
              target="_blank"
              variant="subtitle1"
            >
              {node.url}
            </Link>
            <Divider className={classes.divider} />
            <Typography className={classes.description} variant="body1">
              {description}
            </Typography>
          </React.Fragment>
        ) : null}
        {small ? (
          <div className={classes.stars}>
            <GoStar />
            <Typography variant="h6">{node.stargazers.totalCount}</Typography>
          </div>
        ) : null}
        <Typography variant="button">
          <GoIssueOpened />
          {node.issues.totalCount} open issues
        </Typography>
        <Typography variant="button">
          <GoGitPullRequest />
          {node.pullRequests.totalCount} open pull requests
        </Typography>
        <Typography variant="button">
          <GoRepoForked />
          {node.forkCount} forks
        </Typography>
      </div>
      {!small ? (
        <React.Fragment>
          <Link
            href={node.url}
            rel="noopener noreferrer"
            target="_blank"
            variant="subtitle1"
          >
            {node.url}
          </Link>
          <Divider className={classes.divider} />
          <Typography className={classes.description} variant="body1">
            {description}
          </Typography>
        </React.Fragment>
      ) : null}
      <LanguagesList edges={node.languages.edges} />
    </React.Fragment>
  );
};

RepositoryDetails.propTypes = {
  node: RepoNode.isRequired
};

export default RepositoryDetails;
