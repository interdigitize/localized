import React from 'react';
import FamiliesContainer from './FamiliesContainer.jsx';
import PostsContainer from './PostsContainer.jsx';
import UploadMedia from './UploadMedia.jsx';
import axios from 'axios';
import { HomeLayout, FamilyMemberLayout, PostLayout } from '../styles/styled-components';
import { Layout } from 'antd';
const { Content } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      familyMembers: [],
      family_id: 1,
      editedContent: false,
      title: '',
      description: ''
    };
    this.getAllPostsByFamily = this.getAllPostsByFamily.bind(this);
    this.getAllFamilyMembers = this.getAllFamilyMembers.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.savePostTitle = this.savePostTitle.bind(this);
    this.savePostDescription = this.savePostDescription.bind(this);
  }

  getAllPostsByFamily() {
    axios.get('/api/postsByFamily/', {
      params: {
        family_id: this.state.family_id
      }})
      .then((response) => {
        if (response.data.contacts) {
          this.setState({
            posts: response.data.contacts
          });
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
        if (response.data) {
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

  updatePosts(postInfo) {
    var arr = this.state.posts;
    arr.unshift(postInfo);
    this.setState({
      posts: arr
    });
  }

  savePostTitle(info) {
    var title = info.target.textContent;
    axios.get('/api/posts')
      .then((response) => {
        if (response.data) {
          this.setState({
            title: response.data
          });
        }
      })
      .catch((error) => {
        console.log('[client] save title error:', error);
      });
  }

  render() {
    // console.log('this.state.family_id is', this.state.family_id);
    return (
      <HomeLayout>
        <FamilyMemberLayout>
          <FamiliesContainer familyImages={this.state.familyMembers} />
        </FamilyMemberLayout>
        <Content style={{ background: '#f9f9f9', padding: 10 }}>
          <UploadMedia updatePosts={this.updatePosts} />
        </Content>
        <PostLayout>
          <PostsContainer posts={this.state.posts}/>
        </PostLayout>
      </HomeLayout>
    );
  }
}

export default Home;
