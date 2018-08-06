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
		var userid = this.props.userid;
		return(
			<Query query={getRepoData} variables={{userid}}>
				{({loading, error, data}) => {
					if(loading) return (
						<div className="center allign">
						<div className="preloader-wrapper big active">
						<div className="spinner-layer spinner-blue-only">
							<div className="circle-clipper left">
								<div className="circle"></div>
							</div>
							<div className="gap-patch">
								<div className="circle"></div>
							</div>
							<div className="circle-clipper right">
								<div className="circle"></div>
							</div>
						</div>
						</div>
						</div>
					);
					if(error) return `Error! ${error.message}}`;
					return (
						<div>
							{data.node.repositories.edges.map(edge => {
								return (
									<div key={edge.node.id} className = "container">
									<div className="row">
									<div className="col s12">
										<div className="card-panel grey lighten-5 z-depth-1">
											<div className="row">
												<div className="col s4 m5 l5 xl5">
													<h6>{edge.node.name}</h6>
													<p>{edge.node.description}</p>
												</div>
												<div className="col s4 offset-s4 m3 offset-m4 l3 offset-l4 xl3 offset-xl4">
													{'Pull Requests Count: '+edge.node.pullRequests.totalCount}
												</div>
											</div>
										</div>
									</div>
									</div>
									</div>
									);
								}
								)}
						</div>
					);
				}}
			</Query>
		);
	}
}

export default Repo;