import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components/macro";
import { Button, Card } from "./common";

const DetailContainer = styled(Card)`
  max-width: 800px;
  padding: 16px;
`;

const RepoName = styled.div`
  font-size: 24px;
  font-weight: 600;
  max-width: 400px;
  padding: 8px;
  width: 100%;
`;

const RepoLink = styled.a`
  color: unset;
  font-size: 16px;
  font-weight: 400;
  max-width: 400px;
  padding: 8px;
  width: 100%;

  &:visited,
  &:hover {
    color: hsla(195, 50%, 40%, 1);
  }

  &:hover {
    text-decoration: none;
  }
`;

const RepoDescription = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.75;
  max-width: 400px;
  padding: 8px;
  width: 100%;
`;

const WatchersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
`;

const Watcher = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 18px;
  padding: 8px 0px;
  user-select: none;
  width: 50%;

  & > img {
    border-radius: 16px;
    box-shadow: inset 0px 2px 4px hsla(0, 0%, 0%, 0.2),
      0px 1px 2px hsla(0, 0%, 50%, 0.35), 0px 1px 5px hsla(0, 0%, 50%, 0.7);
    height: 32px;
    margin-right: 8px;
    width: 32px;
  }
`;

const WatcherList = ({ edges }) => (
  <WatchersContainer>
    {edges.map(({ node }) => (
      <Watcher key={node.id}>
        <img src={node.avatarUrl} alt={node.name} />
        {node.name}
      </Watcher>
    ))}
  </WatchersContainer>
);

const LanguagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
`;

const Language = styled.div`
  align-items: baseline;
  display: inline-flex;
  list-style-type: none;
  margin-right: 16px;
  user-select: none;

  &:before {
    background-color: ${props => props.color};
    border-radius: 8px;
    box-shadow: 0px 1px 2px hsla(0, 0%, 50%, 0.35),
      0px 1px 5px hsla(0, 0%, 50%, 0.7);
    content: " ";
    display: inline-flex;
    height: 16px;
    margin-right: 8px;
    width: 16px;
    transform: translateY(2px);
  }
`;

const LanguageList = ({ edges }) => (
  <LanguagesContainer>
    {edges.map(({ node }) => (
      <Language key={node.id} color={node.color}>
        {node.name}
      </Language>
    ))}
  </LanguagesContainer>
);

const Detail = props => {
  console.log(props);
  const {
    history,
    match: {
      params: { name, owner }
    }
  } = props;
  const { data, loading, error } = useQuery(
    gql`
      query Repository($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          description
          homepageUrl
          languages(first: 10) {
            edges {
              node {
                ... on Language {
                  id
                  color
                  name
                }
              }
            }
          }
          name
          owner {
            login
          }
          url
          watchers(first: 10) {
            edges {
              node {
                ... on User {
                  id
                  avatarUrl
                  name
                }
              }
            }
          }
        }
      }
    `,
    {
      skip: !name || !owner,
      variables: { name, owner }
    }
  );

  if (!name || !owner) return <h1>Error...</h1>;

  if (error) return <h1>Error...</h1>;
  if (loading) return <h1>Loading...</h1>;

  return !loading && data ? (
    <DetailContainer>
      <RepoName>
        {data.repository.owner.login}/{data.repository.name}
      </RepoName>
      <RepoLink
        href={data.repository.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {data.repository.homepageUrl}
      </RepoLink>
      <RepoDescription>{data.repository.description}</RepoDescription>
      <LanguageList edges={data.repository.languages.edges} />
      <WatcherList edges={data.repository.watchers.edges} />
      <Button onClick={history.goBack}>Back</Button>
    </DetailContainer>
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
