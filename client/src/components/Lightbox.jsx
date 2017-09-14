import React, { Component } from 'react';
import {
  LightboxBackground as Background,
  LightboxContent as Content,
  LightboxCaption as Caption,
  LightboxImg as Img,
  Close
} from '../styles/styled-components.js';

const Lightbox = (props) => (
  <div>
    <Close onClick={props.handleDisplayLightbox} >
      <i className="fa fa-times fa-4x" aria-hidden="true"></i>
    </Close>
    <Background onClick={props.handleDisplayLightbox} />
    <Content onClick={props.handleDisplayLightbox}>
      <Img src={props.lightboxPost.url} />
      <Caption>
        {false ? props.lightboxPost.title : "Unnamed Picture"}
      </Caption>
    </Content>
  </div>
);

export default Lightbox;
