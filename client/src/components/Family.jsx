import React from 'react';
import dummydata from '../dummydata';
import Member from './Member.jsx';

const Family = (props) => (
  <div>
    {props.members.map((user, i) => (
      <Member key={i} member={user}/>
    ))}
  </div>
);

export default Family;
