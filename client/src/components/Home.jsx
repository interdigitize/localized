// import React from 'react';
// import FamiliesContainer from './FamiliesContainer.jsx';
// import PostsContainer from './PostsContainer.jsx';
// import UploadMedia from './UploadMedia.jsx';
// import { Layout } from 'antd';
// const { Header, Sider, Content } = Layout;
// import dummydata from '../dummydata';
//
// const Home = (props) => (
//   <Layout style={{flexDirection: 'column'}}>
//     <Content style={{ background: '#fff', padding: 5 }}>
//       <FamiliesContainer familyImages={dummydata.profiles} />
//     </Content>
//     <Content style={{ background: '#f9f9f9', padding: 10 }}>
//       <UploadMedia />
//     </Content>
//     <Content style={{background: '#f1f1f1', padding: 5, minHeight: 800}}>
//       <PostsContainer posts={dummydata.posts}/>
//     </Content>
//   </Layout>
// );
//
// export default Home;

import React from 'react';
import FamiliesContainer from './FamiliesContainer.jsx';
import PostsContainer from './PostsContainer.jsx';
import UploadMedia from './UploadMedia.jsx';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
import dummydata from '../dummydata';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: {},
      posts: [],
      familyMembers: [],
      family_id: 1
    };
    this.getAllPostsByFamily = this.getAllPostsByFamily.bind(this);
  }

  getAllPostsByFamily() {
    axios.get('/api/1', {
      params: {
        family_id: this.state.family_id
      }})
      .then((response) => {
        console.log('assets response is', response.data.contacts);
        if (response.data.contacts) {
          this.setState({
            posts: response.data.contacts
          });
          console.log('this.posts is', this.state.posts);
        }
      })
      .catch((error) => {
        console.log('[client] display posts error:', error);
      });
  }

  componentDidMount() {
    this.getAllPostsByFamily();
  }

  render() {
    return (
      <Layout style={{flexDirection: 'column'}}>
        <Content style={{ background: '#fff', padding: 5 }}>
        </Content>
        <Content style={{ background: '#f9f9f9', padding: 10 }}>
          <UploadMedia />
        </Content>
        <Content style={{background: '#f1f1f1', padding: 5, minHeight: 800}}>
          <PostsContainer posts={this.state.posts}/>
        </Content>
      </Layout>
    );
  }
}

export default Home;
