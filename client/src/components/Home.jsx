import React from 'react';
import FamiliesContainer from './FamiliesContainer.jsx';
import PostsContainer from './PostsContainer.jsx';
import UploadMedia from './UploadMedia.jsx';
import axios from 'axios';
import { HomeLayout, FamilyMemberLayout, PostLayout } from '../styles/styled-components';
import { Layout } from 'antd';
const { Content } = Layout;
const moment = require('moment');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      familyMembers: [],
      family_id: __PRELOADED_STATE__.family_id,
      familyName: '',
      user_id: __PRELOADED_STATE__.user.id,
      displayLightbox: false,
      lightboxPost: {}
    };
    this.getAllPostsByFamily = this.getAllPostsByFamily.bind(this);
    this.getAllFamilyMembers = this.getAllFamilyMembers.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.updatePostTitle = this.updatePostTitle.bind(this);
    this.updatePostDescription = this.updatePostDescription.bind(this);
    this.updateFamilyName = this.updateFamilyName.bind(this);
    this.getFamilyName = this.getFamilyName.bind(this);
    this.handleDisplayLightbox = this.handleDisplayLightbox.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.searchPostsByDate = this.searchPostsByDate.bind(this);
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
      .catch( (error) => {
        console.log('[Client] getFamilyName error:', error);
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
          console.log('[Client] Successful post update');
        }
      })
      .catch((error) => {
        console.log('[Client] Save post error:', error);
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

  handleDisplayLightbox(post) {
    this.setState({
      displayLightbox: !this.state.displayLightbox,
      lightboxPost: post
    });
  }

  deletePost(id, url) {
    console.log('urlpost :', url);
    axios.delete(`/api/posts/${id}`, {
      params: {
        url,
      }
    })
      .then((response) => {
        let updatedPosts = this.state.posts;
        for (let i = 0; i < updatedPosts.length; i++) {
          if (updatedPosts[i].id === id) {
            updatedPosts.splice(i, 1);
            break;
          }
        }
        
        this.setState({
          posts: updatedPosts
        });
        console.log('Post deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting post:', error);
      });
  }

  searchPostsByDate(events) {
    var fromDate = moment(events[0]['_d']).startOf('day')._d; // Using MomentJS, the "from" date will be manipulated to be the start of the day (e.g., September 14, 2017 at 12:00:00am)
    var toDate = moment(events[1]['_d']).endOf('day')._d; // Using MomentJS, the "to" date will be manipulated to be the end of the day (e.g., September 14, 2017 at 11:59:59pm)
    axios.get(`/api/posts/family/${this.state.family_id}`, {
      params: {
        fromDate: fromDate,
        toDate: toDate,
      }
    })
      .then((response) => {
        if (response.data) {
          this.setState({
            posts: response.data
          });
        }
        console.log('response is', response);
      })
      .catch( (error) => {
        console.log('[Client] searchPosts error', error);
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
          <PostsContainer posts={this.state.posts}
            loggedInUser={this.state.user_id}
            updatePostTitle={this.updatePostTitle}
            updatePostDescription={this.updatePostDescription}
            handleDisplayLightbox={this.handleDisplayLightbox}
            displayLightbox={this.state.displayLightbox}
            lightboxPost={this.state.lightboxPost}
            deletePost={this.deletePost}
            searchPostsByDate={this.searchPostsByDate}
          />
        </PostLayout>
      </HomeLayout>
    );
  }
}

export default Home;
