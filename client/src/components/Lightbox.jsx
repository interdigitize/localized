import React, { Component } from 'react';
import Comments from '../components/Comments.jsx';
import Member from '../components/Member.jsx';
import {
  LightboxBackground as Background,
  LightboxContent as Content,
  LightboxCaption as Caption,
  LightboxContainer,
  LightboxImg as Img,
  LightboxSidebar as Sidebar,
  Close,
  LightboxMember,
  PostCategories

} from '../styles/styled-components.js';

const determineDimensions = (url) => {
  let tmpImg = new Image();
  tmpImg.src = url;
  let height = tmpImg.height / document.documentElement.clientHeight * 100;
  let width = tmpImg.width / document.documentElement.clientWidth * 100;
  return (width / height > 0.5 ? 'large' : '');
};

const determineMember = (familyMembers, postId) => {
  return familyMembers.filter((member) => {
    return member.id === postId;
  });
};

const Lightbox = (props) => {
  const size = determineDimensions(props.lightboxPost.url);
  const member = determineMember(props.familyMembers, props.lightboxPost.id);

  return (
    <div>
      <Close onClick={props.handleDisplayLightbox} >
        <i className="fa fa-times fa-4x" aria-hidden="true"></i>
      </Close>
      <Background onClick={props.handleDisplayLightbox} />
      <Content>
        <LightboxContainer>
          <Img size={size} image={props.lightboxPost.url} />
          <Sidebar>
            <LightboxMember>
              <Member member={member[0]} postDate={props.lightboxPost.created_at} />
            </LightboxMember>
            <Caption>
              <h6>{props.lightboxPost.title ? props.lightboxPost.title : 'Unnamed Picture'}</h6>
              <p>{props.lightboxPost.description ? props.lightboxPost.description : ''}</p>
            </Caption>
            <PostCategories>
              <div>Categories</div>
            </PostCategories>
            <Comments postId={props.lightboxPost.id} familyMembers={props.familyMembers} />
          </Sidebar>
        </LightboxContainer>
      </Content>
    </div>
  );
};

export default Lightbox;
