import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import makeStyles from "@material-ui/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Star from "@material-ui/icons/Star";
import { REPOSITORY } from "../Queries";
import LanguagesList from "./LanguagesList";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    width: "100%"
  },
  header: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    padding: 16
  },
  repoLink: {
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "none"
    }
  },
  content: {
    padding: 16,
    paddingTop: 0
  },
  actions: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: 8
  },
  divider: {
    marginTop: 8,
    width: "100%"
  },
  stargazers: {
    alignItems: "center",
    display: "flex",
    padding: 12,

    "& svg": {
      marginRight: 2
    }
  }
});

const Detail = props => {
  const classes = useStyles(props);
  const {
    history,
    match: {
      params: { name, owner }
    }
  } = props;
  const { data, loading } = useQuery(REPOSITORY, {
    skip: !name || !owner,
    variables: { name, owner }
  });

  if (!name || !owner) return <h1>Error...</h1>;

  if (loading) return <h1>Loading...</h1>;

  return !loading && data ? (
    <Paper className={classes.root} elevation={4}>
      <div className={classes.header}>
        <Typography variant="h5">
          {data.repository.owner.login}/{data.repository.name}
        </Typography>
        <Link
          className={classes.repoLink}
          href={data.repository.url}
          rel="noopener noreferrer"
          target="_blank"
          variant="body2"
        >
          {data.repository.homepageUrl}
        </Link>
        <Divider className={classes.divider} />
      </div>
      <div className={classes.content}>
        <Typography variant="subtitle1">
          {data.repository.description}
        </Typography>
        <LanguagesList edges={data.repository.languages.edges} />
      </div>
      <div className={classes.actions}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <div className={classes.stargazers}>
          <Star />
          <Typography variant="h6">
            {data.repository.stargazers.totalCount}
          </Typography>
        </div>
      </div>
    </Paper>
  ) : null;
};

Detail.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Detail;
