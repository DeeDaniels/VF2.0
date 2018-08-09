import React, { Component } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import "./PresentationPanel.css";


class PresentationPanel extends Component{
  constructor(){
    super()
    this.handleLoad = this.handleLoad.bind( this );
    this.handleVideoEnd = this.handleVideoEnd.bind( this );
    this.state = {
      videos:[],
      vidCounter: 0,
      activeVid: ''
    }
  }
  handleLoad = e =>{
    console.log('clicked')
    this.callApi()
  }

  // handleStateChange( e ) {
  //   console.log( e );
  //   let playerState = e.data;
  // }
  handleVideoEnd (e){

    if ( e.target.getCurrentTime() < this.state.activeVid.endSec ) {
      return false;
    }

    if (this.state.vidCounter < this.state.videos.length - 1){
      let count = this.state.vidCounter + 1;
      let nextVid = this.state.videos[count]
      console.log(count)
      console.log(nextVid)
      this.setState({
        activeVid: nextVid,
        vidCounter: count
      });
    }
  }
  callApi(myState) {

    axios({
      method: 'GET',
      url: '/Vids/'
    }).then( res => {

      this.setState({
        videos: res.data,
        activeVid: res.data.length ? res.data[ 0 ] : ''
      });
    })
  }
  render(){
    var opts = {
      playerVars: {
        autoplay: 1,
        showinfo: 0,
        autohide: 0,
        start:this.state.activeVid.startSec,
        end:this.state.activeVid.endSec
      }
    };
    return(
      <div>
      <button onClick={this.handleLoad}>Load VF Stream</button>

    <section>
        <YouTube
          videoId={this.state.activeVid.url}
          opts={opts}
          onEnd={ this.handleVideoEnd }
        />
    </section>

      </div>
    )
  }

}
export default PresentationPanel;
