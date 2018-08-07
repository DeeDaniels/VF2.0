import React, { Component } from "react";
import YouTube from "react-youtube";
import axios from "axios";
// import "./VidPanel.css";


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
    console.log('VIDEO END EVENT');
    if (this.state.vidCounter < this.state.videos.length){
      let count = this.state.vidCounter + 1;
      let nextVid = this.state.videos[count]
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
        start:this.state.activeVid.startSec,
        end:this.state.activeVid.endSec
      }
    };
    return(
      <div>
      <button onClick={this.handleLoad}>Load Videos</button>

      { this.state.activeVid !== '' &&
        <YouTube
          videoId={this.state.activeVid.url}
          opts={opts}
          onEnd={ this.handleVideoEnd }
        />
      }

      </div>
    )
  }

}
export default PresentationPanel;
