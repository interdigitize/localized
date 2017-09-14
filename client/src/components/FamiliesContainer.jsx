import React from 'react';
import Family from './Family.jsx';
import AddFamily from './AddFamily.jsx';
import { FamiliesHeader, FamilyImages, AddFamilyContainer } from '../styles/styled-components';

const FamiliesContainer = (props) => (
  <FamiliesHeader>
    <span>My Family</span>
    <Family members={props.familyImages} />
    <AddFamilyContainer>
      <AddFamily />
    </AddFamilyContainer>
  </FamiliesHeader>
);

export default FamiliesContainer;
