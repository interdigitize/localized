import React from 'react';
import { MemberImage, MemberName } from '../styles/styled-components';

const Member = (props) => (
  <div>
    <MemberImage image={props.member.avatar}></MemberImage>
    <MemberName>{props.member.first}</MemberName>
  </div>
);

export default Member;
