import React from "react";
import "./progress.less";

class Progress extends React.Component{
	changeProgress(e){
		let progressBar = e.target;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress);
	}
	render(){
		return(
			<div 
				className="components-progress"
				onClick={this.changeProgress.bind(this)}
			>
				<div 
					className="progress"
					style={{width: `${this.props.progress}%`,
						background:this.props.barColor
					}}
				></div>
			</div>
		);
	}
}
Progress.defaultProps = {
	barColor: "#2f9842",
};
export default Progress;
