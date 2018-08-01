import React, {Component} from 'react';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const fragments = gql`
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
		var word = this.props.word;
		var click1 = this.props.click1;
		var click2 = this.props.click2;
		return (
			<Query query={getUserData} variables={{word}}>
				{({loading, error, data}) => {
						if(loading) return <h2>Loading ...</h2>;
						if(error) return `Error! ${error.message}}`;
						return (
							<div id="users">
							<div className="row">
								{data.search.edges.map(edge => {
									return (
										<div 
											className="col s12 m6 l4 xl4"
											key={edge.node.id}
											onClick={()=>{click1();click2(edge.node.id, edge.node.name)}}
										>
											<div className="card-panel grey lighten-5 z-depth-1">
											<div className="row valign-wrapper">
											<div className="col s4">
												<img alt="" src={edge.node.avatarUrl} className="circle responsive-img"/>
											</div>
											<div className="col s8">
												<h5 className="truncate">{'['+edge.node.name+'], ['+edge.node.location+']'}</h5>
												<h6 className="truncate">{'['+edge.node.login+']'}</h6>
											</div>
											</div>
											</div>
										</div>
									);
								})}
							</div>
							</div>
						);

					}
				}
			</Query>
		);
	}
}

export default User;

