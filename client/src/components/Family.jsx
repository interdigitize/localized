import React from 'react';
import dummydata from '../dummydata';
import Member from './Member.jsx';
import { FamilyImages } from '../styles/styled-components';

const Family = (props) => (
  <FamilyImages>
    {props.members.map((user, i) => (
      <Member key={i} member={user}/>
    ))}
  </FamilyImages>
);

export default Family;
