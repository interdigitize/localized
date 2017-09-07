import React, { Component } from 'react';
import Navigation from './components/navigation.jsx';
import dummydata from './dummydata';
import Footer from './components/Footer.jsx';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import UploadMedia from './components/UploadMedia.jsx';
import PostsContainer from './components/PostsContainer.jsx';
import FamiliesContainer from './components/FamiliesContainer.jsx';
import posts from './dummyphotodata';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Layout style={{flexDirection: 'row'}}>
          <Navigation />
          <Layout style={{flexDirection: 'column'}}>
            <Content style={{ background: '#fff', padding: 5 }}>
              <FamiliesContainer />
            </Content>
            <Content style={{ background: '#f9f9f9', padding: 10 }}>
              <UploadMedia />
            </Content>
            <Content style={{background: '#f1f1f1', padding: 5, minHeight: 800}}>
              <PostsContainer posts={posts}/>
            </Content>
          </Layout>
        </Layout>
        <Footer />
      </div>
    );
  }
}

export default Index;
