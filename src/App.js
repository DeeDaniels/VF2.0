import React, { Component } from "react";
import "./App.css";
// import YouTube from 'react-youtube';
import VideoPanel from "./VideoPanel";
import PresentationPanel from "./PresentationPanel";



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
      <h2>Visual Fantasy</h2>
      <h4>Enter Youtube links into the Video WorkStation below.</h4>
        <VideoPanel> </VideoPanel>
        <PresentationPanel></PresentationPanel>
      </div>
    );
  }
}

export default App;
