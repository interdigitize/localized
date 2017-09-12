import React from 'react';
import { Card } from 'antd';

const Post = (props) => (
  <div>
    <Card style={{ width: 300}} bodyStyle={{ padding: 15 }}>
      <div className="custom-image" style={{backgroundImage: `url(${props.post.url})`}}></div>
      <div className="custom-card">
        <h5>{props.post.title}</h5>
        <p>{props.post.description}</p>
      </div>
    </Card>
  </div>
);

export default Post;
