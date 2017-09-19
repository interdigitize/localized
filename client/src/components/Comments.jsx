import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, Textarea } from 'antd';
const FormItem = Form.Item;
import Comment from './Comment.jsx';
import Avatar from './Avatar.jsx';

import {
  MemberImage,
  CommentsContainer as Container
 }from '../styles/styled-components';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentString: '',
      familyMap: {}
    };
    this.getComments = this.getComments.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hashFamily = this.hashFamily.bind(this);
  }

  componentDidMount() {
    this.getComments(this.props.postId);
    this.hashFamily(this.props.familyMembers);
  }

  getComments(postId) {
    axios.get(`/api/comments/${postId}`)
      .then((response) => {
        this.setState({
          comments: response.data
        });
      })
      .catch((error) => {

      });
  }

  handleChange(e) {
    this.setState({
      commentString: e.target.value
    });
  }

  handleSubmit() {
    this.postComment(this.state.commentString, __PRELOADED_STATE__.user.id, this.props.postId);
    this.setState({
      comments: this.state.comments.concat({ content: this.state.commentString, posted_by: __PRELOADED_STATE__.user.id }),
      commentString: ''
    });
  }

  postComment(content, posted_by, post_id) {
    axios.post(`/api/comments/${post_id}`, {
      content,
      posted_by,
      post_id
    })
      .then((response) => {
        console.log('success');
      })
      .catch(() => {
        console.log('error');
      });
  }

  hashFamily(familyMembers) {
    const familyMap = familyMembers.reduce((hash, member) => {
      hash[member.id] = member;
      return hash;
    }, {});
    this.setState({
      familyMap
    });
  }

  render() {
    return (
      <Container>
        {this.state.comments.map(comment => (
          <div>
            <Comment comment={comment} postedBy={this.state.familyMap[comment.posted_by]} />
          </div>
        ))}
        <div>
          <Input style={{ marginBottom:'5px', width: '97%' }}
            placeholder="Write a comment..."
            onChange={this.handleChange}
            value={this.state.commentString}
            prefix={<Icon type="message" style={{ fontSize: 13 }} />} />
          <Button onClick={this.handleSubmit} type="dashed" style={{ width: '97%'}}>Submit</Button>
        </div>
      </Container>
    );
  }
}

export default Comments;
