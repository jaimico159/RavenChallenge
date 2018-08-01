import React, {Component} from 'react';


class Nav extends Component {
	constructor(props){
		super(props);
		this.state = {
			placeholder: "Search GitHub Users...",
			search: "in:login",
		}
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
						onChange=""
					/>
				</div>
			</div>
			</div>
			</div>
		);
	}
}

export default Nav;
