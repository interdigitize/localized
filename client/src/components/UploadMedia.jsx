import React from 'react';
import axios from 'axios';

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data_uri: null,
      processing: false
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      processing: true
    });

    axios({
      method: 'post',
      url: '/upload',
      data: {
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      },
      dataType: 'json'
    })
    .then( res => {
      debugger;

      console.log('RES:', res);
      this.setState({
        fileList: [],
        uploading: false,
        processing: false
      });
      console.log('upload successfully.');
    })
    .catch(err => {
      this.setState({
        uploading: false,
        processing: false
      });
      console.log(err);
    });
  }

  handleFile(e) {
    const reader = new FileReader(); //You can read about what this is here, https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };
    reader.readAsDataURL(file);
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
