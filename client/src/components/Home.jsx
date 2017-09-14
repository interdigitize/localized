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
      family_id: __PRELOADED_STATE__.family_id,
      familyName: '',
      user_id: __PRELOADED_STATE__.user.id
    };
    this.getAllPostsByFamily = this.getAllPostsByFamily.bind(this);
    this.getAllFamilyMembers = this.getAllFamilyMembers.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.updatePostTitle = this.updatePostTitle.bind(this);
    this.updatePostDescription = this.updatePostDescription.bind(this);
    this.updateFamilyName = this.updateFamilyName.bind(this);
    this.getFamilyName = this.getFamilyName.bind(this);
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
        console.log('[Client] display family members error:', error);
      });
  }

  getFamilyName() {
    axios.get(`/api/families/${this.state.family_id}`)
      .then((res) => {
        if (res.data) {
          this.setState({
            familyName: res.data
          });
        }
      })
      .catch( (err) => {
        console.log('[Client] getFamilyName error');
      });
  }

  componentDidMount() {
    this.getAllFamilyMembers();
    this.getAllPostsByFamily();
    this.getFamilyName();
  }

  updatePosts(postInfo) {
    var arr = this.state.posts;
    arr.unshift(postInfo);
    this.setState({
      posts: arr
    });
  }


  putTextEdits(url, params) {
    axios.put(url, params)
      .then((response) => {
        if (response) {
          console.log('[Client] Successful post family name update');
        }
      })
      .catch((error) => {
        console.log('[Client] Ssave post family name error:', error);
      });
  }


  updateFamilyName(info) {
    var name = info.target.textContent;
    this.putTextEdits(`api/families/${this.state.family_id}`, {
      params: {
        name: name
      }
    });
  }

  updatePostTitle(info) {
    var title = info.target.textContent;
    var post_id = info.target.getAttribute('id');
    this.putTextEdits(`/api/posts/${post_id}`, {
      params: {
        title: title,
        type: 'title'
      }
    });
  }

  updatePostDescription(info) {
    var description = info.target.textContent;
    var post_id = info.target.getAttribute('id');
    this.putTextEdits(`/api/posts/${post_id}`, {
      params: {
        description: description,
        type: 'description'
      }
    });
  }

  render() {
    return (
      <HomeLayout>
        <FamilyMemberLayout>
          <FamiliesContainer familyImages={this.state.familyMembers} familyName={this.state.familyName} updateFamilyName={this.updateFamilyName} />
        </FamilyMemberLayout>
        <Content style={{ background: '#f9f9f9', padding: 10 }}>
          <UploadMedia updatePosts={this.updatePosts} />
        </Content>
        <PostLayout>
          <PostsContainer posts={this.state.posts} loggedInUser={this.state.user_id} updatePostTitle={this.updatePostTitle} updatePostDescription={this.updatePostDescription}/>
        </PostLayout>
      </HomeLayout>
    );
  }
}

export default Home;
