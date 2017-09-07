import React, { Component } from 'react';
import Navigation from './components/navigation.jsx';
import dummydata from './dummydata';
import Footer from './components/Footer.jsx';
import 'antd/dist/antd.css';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Navigation />
        <Footer />
      </div>
    );
  }
}

export default Index;
