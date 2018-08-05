import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './VidContainer.css';

//obsolete component that you are building out of

class VidContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      starttime: '',
      endtime: ''
  }
}
youtubeParse = (e) => {
const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
const match = e.match(regExp);
return (match && match[7].length === 11) ? match[7] : false;
}
  updateUrl = (e) => {
        e.preventDefault();
        this.setState({
            url: this.youtubeParse(e.target.value)
        })
    }
  handleInputChange = (event) => {
    let target = event.target
    let value = event.target.value
    let name = target.name
    this.setState({
       [name]: value
    });
  }
  render() {
    // console.log(this.state.starttime,this.state.endtime, this.state.linkvalue );
    // const opts = {
    //   height: '390',
    //   width: '640',
    //   start:'03',
    //   end:'05',
    //   playerVars: {
    //     autoplay: 1
    //   }
    return(
    <div className="vidContainer">
      // <form onSubmit={this.props.handleSubmit}>
      //   <label>
      //     Submit your sampled youtube video link here:
      //     <input type="text" placeholder="Put in youtube link" name="url" id="vidUrl" onChange={this.updateUrl}/>
      //   </label>
      //   <label>
      //     Start Time
      //     <input type="number" name="starttime" value={this.state.starttime} onChange={this.handleInputChange}/>
      //   </label>
      //   <label>
      //     End Time
      //     <input type="number" name="endtime" value={this.state.endtime} onChange={this.handleInputChange}/>
      //   </label>
      //   <button type="submit" id="submitButton" value="Submit">Submit</button>
      // </form>
      // <YouTube
      //     videoId={this.state.url}
      //     onStateChange={this.handleInputChange}
      //
      //     />
    </div>
    );
  }
}
export default VidContainer;
