//not needed or used just example code
class AddVid extends Component {

  constructor(props) {
      super(props);
      this.state = {value: ''};
      this.addVidService = new VidService();
//did not add this to my code
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      //did not add this to my code
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      this.addVidService.sendData(this.state.value);
      this.props.history.push('/');
    }

    render() {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label>
              Add Vid:
              <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control"/>
            </label><br/>
            <input type="submit" value="Submit" className="btn btn-primary"/>
          </form>
      </div>
      );
    }
  }

export default AddVid;
