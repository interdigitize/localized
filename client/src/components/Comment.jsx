import React, { Component } from 'react';
import Avatar from './Avatar.jsx';
import { Flex } from '../styles/utils';
import { MemberImage } from '../styles/styled-components';

const Comment = (props) => (
  <Flex comment>
    <div>
      <Avatar small member={props.postedBy} />
    </div>
    <div>
      <span>{props.postedBy.display} </span>
      <span>{props.comment.content}</span>
    </div>
  </Flex>
);

export default Comment;
