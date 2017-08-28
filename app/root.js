import React from "react";
import Header from "./components/header";
import Player from "./page/player";
import MusicList from "./page/musicList";
import { MUSIC_LIST } from "./config/config";
import {Router , IndexRoute , Link , Route , hashHistory} from "react-router";
import Pubsub from "pubsub-js";

class Root extends React.Component{
	render(){
		return (<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Player}></IndexRoute>
				<Route path="/list" component={MusicList}></Route>
			</Route>
		</Router>)
	}
}

class App extends React.Component{
	constructor(prop){
		super(prop);
		this.state={
			musicList:MUSIC_LIST,
			currentMusicItem:MUSIC_LIST[0],
		}
	}
	playMusic(musicItem){
		$("#player").jPlayer("setMedia",{mp3:musicItem.file}).jPlayer('play');
		this.setState({
			currentMusicItem:musicItem
		})
	}
	playNext(type = "next"){
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null;
		let musicLength = this.state.musicList.length ;
		if(type === "next"){
			newIndex = (index + 1) % musicLength;
		}else{
			newIndex = (index - 1 + musicLength) % musicLength;
		}
		this.playMusic(this.state.musicList[newIndex]);
	}
	findMusicIndex(musicItem){
		return this.state.musicList.indexOf(musicItem);
	}
	componentWillMount() {
		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});
		this.playMusic(this.state.currentMusicItem);
		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		});
		Pubsub.subscribe("Delete_Music",(msg,musicItem)=>{
			this.setState({
				musicList:this.state.musicList.filter((item)=>{
					return item !== musicItem;
				}),
			})
		});
		Pubsub.subscribe("Play_Music",(msg,musicItem)=>{
		
			this.playMusic(musicItem);
		});
		Pubsub.subscribe("Play_Prev",(msg,musicItem)=>{
			this.playNext("prev");
		});
		Pubsub.subscribe("Play_Next",(msg,musicItem)=>{
			this.playNext();
		});
		
	}
	componentWillUnmount(){
		Pubsub.unsubscribe("Delete_Music");
		Pubsub.unsubscribe("Play_Music");
		Pubsub.unsubscribe("Play_Next");
		Pubsub.unsubscribe("Play_Prev");
		$("#player").unbind($.jPlayer.event.ended);
	}
	render(){
		return( <div>
				<Header />
				{ React.cloneElement(this.props.children,this.state) }
			</div>
		);
	}			
}

export default Root;
