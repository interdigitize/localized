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
    this.getAllFamilyMembers = this.getAllFamilyMembers.bind(this);
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

  getAllFamilyMembers() {
    axios.get('/api/profiles/familymembers')
    // we need to add in the criterion of family id here!!! Right now it is only pulling in ALL profiles until users are connected w/ family ids. 
      .then((response) => {
        if(response.data) {
          this.setState({
            familyMembers: response.data
          });
        }
      })
      .catch((error) => {
        console.log('[client] display family members error:', error);
      });
  }

  componentDidMount() {
    this.getAllFamilyMembers();
    this.getAllPostsByFamily();
  }

  render() {
    return (
      <Layout style={{flexDirection: 'column'}}>
        <Content style={{ background: '#fff', padding: 5 }}>
          <FamiliesContainer familyImages={this.state.familyMembers} />
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
