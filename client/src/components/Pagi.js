import React, {Component} from 'react';

class Pagi extends Component {

	render(){
		const arr = [];
		if(this.props.currentPage === 1){
			arr.push(<li className="disabled" key="left"><a href="#!"><i className="material-icons">chevron_left</i></a></li>);
		}
		else{
			arr.push(<li key="left"><a href="#!" onClick={()=>this.props.prev()}><i className="material-icons">chevron_left</i></a></li>);
		}
		for(let i=1;i<=this.props.totalPages;i++){
			if(i===this.props.currentPage){
	 			arr.push(<li className="active" key={i}><a href="#!">{i}</a></li>);
			}
			else{
 				arr.push(<li className="waves-effect" key={i} onClick={()=>this.props.setPage(i)}><a href="#!">{i}</a></li>);  			
   		}
  	}
  	if(this.props.currentPage === this.props.totalPages){
			arr.push(<li className="waves-effect disabled" key="right"><a href="#!"><i className="material-icons">chevron_right</i></a></li>);
		}
		else{
			arr.push(<li className="waves-effect" key="right"><a href="#!" onClick={()=>this.props.next()}><i className="material-icons">chevron_right</i></a></li>);
		}
		return (
			<div>
				<ul className="pagination center allign">
					{arr}
	 			</ul>
			</div>

		);
	}
}

export default Pagi;