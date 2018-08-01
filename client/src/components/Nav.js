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
			inSearch: "true",
			userid: "",
		}
	}

	Search(event){
		this.setState({
			search: event.target.value + ' in:login',

		});
	}

	changeInSearch(){
		this.setState({
			inSearch: !this.state.inSearch,
		});
	}

	setUserId(userid){
		this.setState({
			userid: userid
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
					<User 
						word={this.state.search} 
						click1={()=>this.changeInSearch()}
						click2={this.setUserId.bind(this)}
					/>
				</div>
			);
		} else {
			return (
				<div>
				<div className="grey lighten-3">
				<div className="container">
					<div className="row">
						<a className="col s1 m2 l2 xl2" href="#" onClick={()=>{this.changeInSearch()}}>
							<img alt="" src={back} />
						</a>
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
