import React, { Component } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import Slider from "rc-slider";
import "../node_modules/rc-slider/assets/index.css";
import axios from "axios";


// import { youtubeParse } from "../../util/videoUtils";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const MainContainer = styled.div`
  text-align: center;
`;

const FormContainer = styled.div``;

const UrlForm = styled.input``;

const TimeInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StartTimeContainer = styled.span``;

const EndTimeContainer = styled.span``;


class VideoPanel extends Component {
  constructor(props) {
    super(props);
    this.startMin = React.createRef();
    this.startSec = React.createRef();
    this.endMin = React.createRef();
    this.endSec = React.createRef();
    this.urlInput = React.createRef();
  }
  state = {
    url: "",
    videoDuration: 0,
    time: [0, 0],
    sliderStartPos: 0,
    sliderEndPos: 0,
    currentVidEvent: null,
    inputStartMin: 0,
    inputStartSec: 0,
    inputEndMin: 0,
    inputEndSec: 0
  };

  youtubeParse = e => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = e.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  secondsToMinutes = seconds => {
    let minutes = Math.floor(seconds / 60);
    let remaining = Math.floor(seconds % 60);
      // remaining < 10 ? remaining = '0' + remaining : remaining;
      return `${minutes}:${remaining}`;
    };

  updateUrl = e => {
    e.preventDefault();
    this.setState({
      url: this.youtubeParse(e.target.value)

    });
  };


  handleStateChange = e => {
    this.setState({
          currentVidEvent: e.target
    });

    if (e.target.getCurrentTime() === 0) {
      e.target.playVideo();
    } else {
      this.setState({ videoDuration: e.target.getDuration() });
    }
  };

//slider stuff
  formatTips = seconds => {
    console.log(this.secondsToMinutes(seconds));
    return this.secondsToMinutes(seconds);
  };

  renderSlider = duration => {
    const { sliderStartPos, sliderEndPos } = this.state;
    duration = Math.round(duration);
    return (
      <Range
        allowCross={false}
        value={[sliderStartPos, sliderEndPos]}
        max={duration}
        onChange={this.onSliderChange}
        tipProps={{
          placement: "top",
          prefixCls: "rc-slider-tooltip"
        }}
        tipFormatter={duration => this.secondsToMinutes(duration)}
      />
    );
  };


  onSliderChange = e => {
    const sliderStartPos = e[0];
    const sliderEndPos = e[1];

    console.log("slider change", sliderStartPos, sliderEndPos);

    const initialStart = sliderStartPos;
    const initialEnd = sliderEndPos;

    if (sliderStartPos === initialStart) {
      this.state.currentVidEvent.pauseVideo();
      this.state.currentVidEvent.seekTo(sliderEndPos);
      this.setState({
        inputEndMin: this.secondsToMinutes(sliderEndPos).split(":")[0],
        inputEndSec: this.secondsToMinutes(sliderEndPos).split(":")[1],
        sliderStartPos: sliderStartPos
      });
    }

    if (sliderEndPos === initialEnd) {
      this.state.currentVidEvent.pauseVideo();
      this.state.currentVidEvent.seekTo(sliderStartPos);
      this.setState({
        inputStartMin: this.secondsToMinutes(sliderStartPos).split(":")[0],
        inputStartSec: this.secondsToMinutes(sliderStartPos).split(":")[1],
        sliderEndPos: sliderEndPos
      });
    }
  };

  updateSlider = e => {
    const currentTime = Math.round(e.target.getCurrentTime());
    if (e.data === 1) {
      this.setState({
        inputStartMin: this.secondsToMinutes(currentTime).split(":")[0],
        inputStartSec: this.secondsToMinutes(currentTime).split(":")[1],
        sliderStartPos: currentTime
      });
    }

    if (e.data === 2) {
      this.setState({
        inputEndMin: this.secondsToMinutes(currentTime).split(":")[0],
        inputEndSec: this.secondsToMinutes(currentTime).split(":")[1],
        sliderEndPos: currentTime
      });
    }
  };
  componentDidMount() {
     this.callApi()

  }
  callApi() {
    console.log('called!')
    let reel = {
      url: "",
      inputStartMin: 0,
      inputStartSec: 0,
      inputEndMin: 0,
      inputEndSec: 0
    };
    axios.post('/projects',{ reel})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

  handleSubmit = event => {
    event.preventDefault();
    console.log('clicked!!')
  };


  render() {
    const {
      url,
      videoDuration,
      inputStartMin,
      inputEndMin,
      inputStartSec,
      inputEndSec
    } = this.state;

    return (
      <MainContainer>
        <UrlForm
          type="text"
          placeholder="Paste Link Here"
          ref={this.url}
          onChange={this.updateUrl}
        />

        <YouTube
          videoId={url}
          onStateChange={this.handleStateChange}
          onPlay={this.updateSlider}
          onPause={this.updateSlider}
        />

        {videoDuration === 0 ? null : this.renderSlider(videoDuration)}
        <FormContainer>
          <TimeInputContainer>
            <StartTimeContainer>
              <h3>Start Time</h3>
              <input
                type="number"
                maxLength="2"
                value={inputStartMin}
                ref={this.startMin}
              />
              :
              <input
                type="number"
                maxLength="2"
                value={inputStartSec}
                ref={this.startSec}
              />
            </StartTimeContainer>
            <EndTimeContainer>
              <h3>End Time</h3>
              <input
                type="number"
                maxLength="2"
                value={inputEndMin}
                ref={this.endMin}
              />
              :
              <input
                type="number"
                maxLength="2"
                value={inputEndSec}
                ref={this.endSec}
              />
            </EndTimeContainer>
          </TimeInputContainer>
          <button type="submit" id="submitButton" onSubmit={this.onSubmit} value="Submit">Submit</button>
        </FormContainer>
      </MainContainer>
    );
  }
}

export default VideoPanel;
