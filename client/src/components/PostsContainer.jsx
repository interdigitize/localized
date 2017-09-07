import React from 'react';
import Post from './Post.jsx';
import { Row, Col } from 'antd';

const PostsContainer = (props) => (
  <div>
  The Vault
    <div>
      {props.posts.map((post, i) => (
        <Col sm={12} md={8} lg={6} xl={4} key={i}> <Post post={post}/> </Col>
      ))}
    </div>
  </div>
);

export default PostsContainer;
