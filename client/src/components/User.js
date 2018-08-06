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
	constructor(props){
		super(props);
		this.state = {
			currentPage: 1,
			cardsPerPage: 12,
		}
		window.addEventListener('resize', ()=>this.changeCardsPerPage());
	}

	nextPage(){
		this.setState({
			currentPage: this.state.currentPage+1,
		});
	}
	prevPage(){
		this.setState({
			currentPage: this.state.currentPage-1,
		});
	}
	changeCardsPerPage(){
		let height = document.documentElement.clientHeight;
		let width = document.documentElement.clientWidth;
		if(width>1200){
			if(height<900){
				this.setState({
					cardsPerPage: 12,
				});
			} else {
				this.setState({
					cardsPerPage: 16,
				});
			}
		} else if(width>992){
			if(height<900){
				this.setState({
					cardsPerPage: 16,
				});
			} else {
				this.setState({
					cardsPerPage: 24,
				});
			}
		} else if(width>600){
			if(height<900){
				this.setState({
					cardsPerPage: 8,
				});
			} else {
				this.setState({
					cardsPerPage: 12,
				});
			}
		} else {
			if(height<900){
				this.setState({
					cardsPerPage: 3,
				});
			} else {
				this.setState({
					cardsPerPage: 4,
				});
			}
		}
	}

	render(){
		var word = this.props.word;
		var click1 = this.props.click1;
		var state = this.state;
		return (
			<Query query={getUserData} variables={{word}}>
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
						if(error) return `Error! ${error.message}`;
						console.log(state);
						let indexOfLast = (state.currentPage)*(state.cardsPerPage);
						let indexOfFirst = indexOfLast-state.cardsPerPage;
						const currentCards = data.search.edges.slice(indexOfFirst, indexOfLast);
						return (
							<div id="users">
							<div className="row">
								{currentCards.map((edge, ind) => {
									return (
										<div 
											className="col s12 m6 l4 xl3"
											key={edge.node.id}
											onClick={()=>{click1(edge.node.id, edge.node.name)}}
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

