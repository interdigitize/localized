import React from 'react';
import { Card } from 'antd';

const Post = (props) => (
  <div>
    <Card style={{ width: 300}} bodyStyle={{ padding: 15 }}>
      <div className="custom-image" style={{backgroundImage: `url(${props.post.url})`}}></div>
      <div className="custom-card">
        <div contentEditable={true} onInput={props.savePostTitle}><h5>{props.post.title}</h5></div>
        <div contentEditable={true} onInput={props.savePostDescription}><p>{props.post.description}</p></div>
      </div>
    </Card>
  </div>
);

export default Post;
