import React from 'react';
import dummydata from '../dummydata';

const Family = (props) => (
  <div>
    <div className="family-member-image" style={{display: 'flex', backgroundImage: `url(${props.member.avatar})`}}></div>
    <div className="family-member-name">{props.member.first}</div>
  </div>
);

export default Family;
