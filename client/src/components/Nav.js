import React, {Component} from 'react';

import User from './User';
import Repo from './Repo';
import back from '../assets/images/back2.png'

class Nav extends Component {
	constructor(props){
		super(props);
		this.state = {
			placeholder: "Search GitHub Users...",
			search: " in:login",
			inSearch: true,
			userid: "",
			name: "",
			totalPages: 1,
			searching: false,
		}
	}

	Search(event){
		if(event.target.value !== ""){
			this.setState({
				search: event.target.value + ' in:login',
				searching: true,
			});
		}else{
			this.setState({
				searching: false,
			});
		}
	}

	changeInSearch(userid, name){
		this.setState({
			inSearch: !this.state.inSearch,
			userid: userid,
			name: name,
			cardsPerPage: 12,
			currentPage: 1,

		});
	}

	onSearching(){
		this.setState({
			searching: true
		});
	}

	render(){
		if(this.state.inSearch){
			if(this.state.searching){
				return (
					<div>
					<div className="grey lighten-3">
					<div className="container">
						<div className="row">
							<h3 className="col s12 m6 l6 xl6">GitHub Users</h3>
							<div className="col s12 m6 l6 xl6">
							<input 
								className="browser-default white"
								placeholder={this.state.placeholder}
								onChange={this.Search.bind(this)}
								style={{margin: '20px 0 0 0'}}
							/>
							</div>
						</div>
					</div>
					</div>
						<User 
							word={this.state.search} 
							click1={this.changeInSearch.bind(this)}
						/>
					</div>
				);
			}
			return (
					<div>
					<div className="grey lighten-3">
					<div className="container">
						<div className="row">
							<h3 className="col s12 m6 l6 xl6">GitHub Users</h3>
							<div className="col s12 m6 l6 xl6">
							<input 
								className="browser-default white"
								placeholder={this.state.placeholder}
								onChange={this.Search.bind(this)}
								style={{margin: '20px 0 0 0'}}
							/>
							</div>
						</div>
					</div>
					</div>
						<h4 className="center allign">Write Something ...</h4>
					</div>
				);
			
		} else {
			return (
				<div>
				<div className="grey lighten-3">
				<div className="container">
					<div className="row">
						<a className="col s12 m3 l2 xl2" href="#" onClick={()=>{this.changeInSearch()}}>
							<img alt="" src={back} />
						</a>
						<h3 className="col s12 m9 l10 xl10 center allign">{this.state.name}</h3>
					</div>
				</div>
				</div>
					<div>
					<Repo userid={this.state.userid}/>
					</div>
				</div>
			);
		}
	}
}

export default Nav;
