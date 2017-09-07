import React, { Component } from 'react';
import Navigation from './components/navigation.jsx';
import Footer from './components/Footer.jsx';
import Main from './components/Main.jsx';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Layout style={{flexDirection: 'row'}}>
          <Navigation />
          <Main />
        </Layout>
        <Footer />
      </div>
    );
  }
}

export default Index;
