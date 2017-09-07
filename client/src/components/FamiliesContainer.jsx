import React from 'react';
import Family from './Family.jsx';
import AddFamily from './AddFamily.jsx';

const FamiliesContainer = (props) => (
  <div>
    <div><Family /></div>
    <div style= {{float: 'right', padding: '20px'}}>
      <AddFamily />
    </div>
  </div>
);

export default FamiliesContainer;
