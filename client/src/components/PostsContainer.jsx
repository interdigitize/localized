import React from 'react';
import Post from './Post.jsx';
import { Row, Col } from 'antd';

const PostsContainer = (props) => (
  <div>
  My Family's Posts
    <div>
      {props.posts.map((post, i) => (
        <Col sm={12} md={8} lg={6} xl={4} key={i}> <Post post={post} id={post.id} savePostTitle={props.savePostTitle} savePostDescription={props.savePostDescription}/> </Col>
      ))}
    </div>
  </div>
);



export default PostsContainer;
