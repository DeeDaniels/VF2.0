import React, { Component } from 'react';
import './Inputs.css';

class Inputs extends Component {
      constructor(props) {
        super(props);
        this.state = {
          linkvalue: '',
          starttime:'',
          endtime:''
      };
      }
      youtubeParse = (event) => {
          const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
          const match = event.match(regExp);
          return (match && match[7].length === 11) ? match[7] : console.log(false);
      }
      handleInputChange = (event) => {
        this.setState({
           [event.target.name]: event.target.value
        });
      }
      handleSubmit= (event) => {
        console.log(event.target.value);
        event.preventDefault();
      }

  render() {
    return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Submit your sampled youtube video link here:
          <input type="text" placeholder="Put in youtube link" name="linkvalue" value={this.youtubeParse(this.state.linkvalue)} onChange={this.handleInputChange}/>
        </label>
        <label>
          Start Time
          <input type="number" name="starttime" value={this.state.starttime} onChange={this.handleInputChange}/>
        </label>
        <label>
          End Time
          <input type="number" name="endtime" value={this.state.endtime} onChange={this.handleInputChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
    );
  }

}
export default Inputs;

// value={this.youtubeParse(this.state.linkvalue)}
// value={this.state.starttime}
// value={this.state.endtime}
