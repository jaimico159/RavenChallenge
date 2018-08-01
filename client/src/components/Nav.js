import React, {Component} from 'react';

import User from './User';

class Nav extends Component {
	constructor(props){
		super(props);
		this.state = {
			placeholder: "Search GitHub Users...",
			search: " in:login",
			inSearch: "true",
		}
	}

	Search(event){
		this.setState({
			search: event.target.value + ' in:login',

		});
	}

	changeInSearch(){
		this.setState({
			inSearch: !this.state.inSearch
		});
	}

	render(){
		if(this.state.inSearch){
			return (
				<div>
				<div className="grey lighten-3">
				<div className="container">
					<div className="row">
						<h3 className="col s12 m6 l6 xl6">GitHub Users</h3>
						<input 
							className="col s12 m6 l6 xl6"
							placeholder={this.state.placeholder}
							onChange={this.Search.bind(this)}
						/>
					</div>
				</div>
				</div>
					<User word={this.state.search} click={()=>this.changeInSearch()}/>
				</div>
			);
		} else {
			return (
				<h1>Repositories</h1>
			);
		}
	}
}

export default Nav;
