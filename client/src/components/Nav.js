import React, {Component} from 'react';

import User from './User';

class Nav extends Component {
	constructor(props){
		super(props);
		this.state = {
			placeholder: "Search GitHub Users...",
			search: " in:login",
		}
	}

	Search(event){
		this.setState({
			search: event.target.value + ' in:login',

		});
	}

	render(){
		return (
			<div>
			<div className="grey lighten-3">
			<div class="container">
				<div class="row">
					<h3 className="col s12 m6 l6 xl6">GitHub Users</h3>
					<input 
						className="col s12 m6 l6 xl6"
						placeholder={this.state.placeholder}
						onChange={this.Search.bind(this)}
					/>
				</div>
				<h1>{this.state.search}</h1>
			</div>
			</div>
				<User word={this.state.search}/>
			</div>
		);
	}
}

export default Nav;
