import React from 'react';
import axios from 'axios';

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      processing: false,
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      processing: true
    });

    axios.post('/api/upload', this.state.file)
      .then( res => {
        this.setState({
          processing: false
        });
        this.props.updatePosts(res.data);
        console.log('File was uploaded successfully.');
      })
      .catch(err => {
        this.setState({
          processing: false
        });
        console.log('Error sending the file to the server:', err);
      });
  }

  handleFile(e) {
    let formData = new FormData(); //FormData needs to be used for Multer to parse the data on the server
    formData.append('file', e.target.files[0]);
    formData.append('family_id', __PRELOADED_STATE__.family_id);
    this.setState({
      file: formData
    });
  }

  render() {
    return (
      <div className='fileUpload'>
        <label>Upload an image</label>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input type="file" onChange={this.handleFile} />
          {this.state.processing ? <input disabled className='btn btn-primary' type="submit" value="Upload" /> : <input className='btn btn-primary' type="submit" value="Upload" />}
        </form>
      </div>
    );
  }
}

export default Uploader;
