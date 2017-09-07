import React from 'react';

const Family = (props) => (
  <div className="family-member-image" style={{backgroundImage: `url(${props.member.image})`}}></div>
);

export default Family;
