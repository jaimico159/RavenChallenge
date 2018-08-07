import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Pagi from './Pagi';

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
	constructor(props){
		super(props);
		this.state = {
			currentPage: 1,
			cardsPerPage: 3,
		}
		this.totalPages = 1;
		window.addEventListener('resize', ()=>this.changeCardsPerPage());
	}

	nextPage(){
		if(this.state.currentPage<this.totalPages){
			this.setState({
					currentPage: this.state.currentPage+1,
			});
		}
	}
	prevPage(){
		if(this.state.currentPage>1){
			this.setState({
				currentPage: this.state.currentPage-1,
			});
		}
	}


	changeCardsPerPage(){
		let height = document.documentElement.clientHeight;
		let width = document.documentElement.clientWidth;
		if(width>1200){
			if(height<900){
				this.setState({
					cardsPerPage: 4,
				});
			} else {
				this.setState({
					cardsPerPage: 6,
				});
			}
		} else if(width>992){
			if(height<900){
				this.setState({
					cardsPerPage: 4,
				});
			} else {
				this.setState({
					cardsPerPage: 6,
				});
			}
		} else if(width>600){
			if(height<900){
				this.setState({
					cardsPerPage: 4,
				});
			} else {
				this.setState({
					cardsPerPage: 6,
				});
			}
		} else {
			if(height<900){
				this.setState({
					cardsPerPage: 4,
				});
			} else {
				this.setState({
					cardsPerPage: 6,
				});
			}
		}
	}
	calculateTotalPages(data){
		let tot = Math.ceil(data.length/this.state.cardsPerPage);
		this.setState({
			totalPages: tot<2 ? 1:tot,
		});
	}

	render(){
		var userid = this.props.userid;
		var state = this.state;
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

					const indexOfLast = (state.currentPage)*(state.cardsPerPage);
					const indexOfFirst = indexOfLast-state.cardsPerPage;
					const currentCards = data.node.repositories.edges.slice(indexOfFirst, indexOfLast);
					this.totalPages = Math.ceil(data.node.repositories.edges.length/this.state.cardsPerPage);
					return (
						<div>
							<Pagi
								currentPage={state.currentPage} 
								totalPages={this.totalPages} 
								next={this.nextPage.bind(this)}
								prev={this.prevPage.bind(this)}
							/>
							{currentCards.map(edge => {
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