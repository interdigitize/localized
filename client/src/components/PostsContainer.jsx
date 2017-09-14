import React from 'react';
import Post from './Post.jsx';
import { Row, Col } from 'antd';
import Lightbox from './Lightbox.jsx';

const PostsContainer = (props) => (
  <div>
    <div>
      {props.posts.map((post, i) => (
        <Col sm={12} md={8} lg={6} xl={4} key={i}>
          <Post post={post}
            id={post.id}
            user_id={post.user_id}
            loggedInUser={props.loggedInUser}
            updatePostTitle={props.updatePostTitle}
            updatePostDescription={props.updatePostDescription}
            handleDisplayLightbox={() => props.handleDisplayLightbox(post)}/>
        </Col>
      ))}
      { props.displayLightbox ? <Lightbox lightboxPost={props.lightboxPost} handleDisplayLightbox={props.handleDisplayLightbox} /> : null }
    </div>
  </div>
);



export default PostsContainer;
