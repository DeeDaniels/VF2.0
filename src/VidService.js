import axios from 'axios';

class VidService {

  sendData(data) {
    axios.post('http://localhost:3000/Vids/add/post', {
    item: data
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
}

export default VidService;
