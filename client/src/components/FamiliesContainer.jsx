import React from 'react';
import Family from './Family.jsx';
import AddFamily from './AddFamily.jsx';

const FamiliesContainer = (props) => (
  <div style = {{padding: '20px'}}>
    My Family
    <div style = {{padding: '10px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      {props.familyImages.map((member, i) => (
        <Family key={i} member={member}/>
      ))}
    </div>
    <div style= {{float: 'right', padding: '10px'}}>
      <AddFamily />
    </div>
  </div>
);

export default FamiliesContainer;
