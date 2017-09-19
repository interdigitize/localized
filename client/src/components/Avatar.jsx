import React from 'react';
import { MemberImage as Image } from '../styles/styled-components';

const Avatar = (props) => {
  return (
    <Image small image={props.member.avatar}></Image>
  );
};

export default Avatar;
