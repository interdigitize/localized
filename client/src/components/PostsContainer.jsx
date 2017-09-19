import React from 'react';
import Post from './Post.jsx';
import { Row, Col, DatePicker } from 'antd';
const { RangePicker, MonthPicker } = DatePicker;
import { RangePickerItem } from '../styles/styled-components';
import Lightbox from './Lightbox.jsx';

const PostsContainer = (props) => (
  <div>
    <RangePickerItem size='small' onChange={props.searchPostsByDate}/><br /><br /> <br />
    <div>
      {props.posts.map((post, i) => (
        <Col sm={12} md={8} lg={6} xl={4} key={i}>
          <Post post={post}
            id={post.id}
            user_id={post.user_id}
            loggedInUser={props.loggedInUser}
            updatePostTitle={props.updatePostTitle}
            updatePostDescription={props.updatePostDescription}
            handleDisplayLightbox={() => props.handleDisplayLightbox(post)}
            deletePost={props.deletePost}
          />
        </Col>
      ))}
      { props.displayLightbox ? <Lightbox familyMembers={props.familyMembers} lightboxPost={props.lightboxPost} handleDisplayLightbox={props.handleDisplayLightbox} /> : null }
    </div>
  </div>
);



export default PostsContainer;
