import React, {Component} from 'react';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const fragments = const fragments = gql`
	fragment fields on Node {
  ...on User{
    login
    name
    id
    location
    avatarUrl
  }
  ...on Organization{
    login
    name
    id
    location
    avatarUrl
  }
}
`;

const getUserData = gql`
	query($word: String!){
  		search(query: $word, first: 100, type: USER) {
    		userCount
    		pageInfo {
      			endCursor
      			hasNextPage
    		}
    		edges {
      			node {
        			...fields
      			}
    		}
		}
	}

	${fragments}

`;


class User extends Component {

	render(){

	}
}

export default User;

