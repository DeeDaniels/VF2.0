import React, { Component } from "react";
import "./App.css";
// import YouTube from 'react-youtube';
import VideoPanel from "./VideoPanel";
import PresentationPanel from "./PresentationPanel";
import vfintroguide from './img/vfintroguide.png'



class App extends Component {
//example api call
  // componentDidMount() {
  //    this.callApi()
  // }
  //
  // callApi() {
  //   axios.post('/projects',{
  //     email:"dee@gmail.com",
  //     password:"dee"
  //   })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  // }

  render() {
    return (
      <div className="mainContainer">
      <img src={vfintroguide}/>
      <h2>Video WorkStation</h2>
      <h4>Enter Youtube links into the Video WorkStation below.</h4>
        <VideoPanel> </VideoPanel>
        <h2>Viewing Station</h2>
        <h4>Enjoy the visual fantasy below. Press load!</h4>
        <PresentationPanel></PresentationPanel>
      </div>
    );
  }
}

export default App;
