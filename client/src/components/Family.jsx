import React from 'react';
import dummydata from '../dummydata';
import '../styles.css';

const Family = (props) => (
  <div>
    <div className="family-member-image" style={{backgroundImage: `url(${props.member.avatar})`}}></div>
    <div className="family-member-name">{props.member.first}</div>
  </div>
);

export default Family;
