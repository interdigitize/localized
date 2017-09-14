import React from 'react';
import Family from './Family.jsx';
import AddFamily from './AddFamily.jsx';
import { FamiliesHeader, FamilyImages, AddFamilyContainer } from '../styles/styled-components';

const FamiliesContainer = (props) => {
  // Below removes the contentEditable warning in the console that a component is contentEditable.
  console.error = (() => {
    const error = console.error;
    return (exception) => {
      if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
        error.apply(console, arguments);
      }
    };
  })();

  return (
    <FamiliesHeader>
      <span contentEditable={true} onInput={props.updateFamilyName}>{props.familyName}</span>
      <Family members={props.familyImages} />
      <AddFamilyContainer>
        <AddFamily />
      </AddFamilyContainer>
    </FamiliesHeader>
  );
};

export default FamiliesContainer;
