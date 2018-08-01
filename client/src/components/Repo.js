import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const fragments = gql`
	fragment repos on Node {
  ...on User{
    repositories(first: 20, privacy: PUBLIC, orderBy: {field:NAME,direction :ASC} ){
      edges{
        node{
          ...on Repository{
            name
            id
            description
            pullRequests(first:1){
              totalCount
            }
          }
        }
      }
    }
  }
  ...on Organization{
    repositories(first: 20, privacy: PUBLIC, orderBy: {field:NAME,direction :ASC} ){
      edges{
        node{
          ...on Repository{
            name
            id
            description
            pullRequests(first:1){
              totalCount
            }
          }
        }
      }
    }
  }
}
`;

const getRepoData = gql`
	query($userid: ID!){
  		node(id: $userid){
    		... repos
  		}
	}
	${fragments}

`;

class Repo extends Component {

	render(){

	}
}

export default Repo;