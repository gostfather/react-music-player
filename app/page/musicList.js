import React from "react";
import MusicListItem from "../components/musicListItem";

class MusicList extends React.Component{
	render(){
		let list = null ;
		list = this.props.musicList.map((item)=>{
			return(<MusicListItem 
					focus={item === this.props.currentMusicItem}
					key={item.id}
					musicItem={item}
				></MusicListItem>)
		})
		return(
			<ul>
				{ list }
			</ul>
		);
	}
}

export default MusicList;
