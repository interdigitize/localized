import React from 'react';
import { Card } from 'antd';

const Post = (props) => {
  const poster = props.post.user_id;
  const { id } = __PRELOADED_STATE__.user;
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
    <div>
      <Card style={{ width: 300}} bodyStyle={{ padding: 15 }}>
        <div className="custom-image" style={{backgroundImage: `url(${props.post.url})`}}></div>
        <div className="custom-card">
          <div contentEditable={poster === id} id={props.post.id} onInput={props.updatePostTitle}><h5>{props.post.title}</h5></div>
          <div contentEditable={poster === id} id={props.post.id} onInput={props.updatePostDescription}><p>{props.post.description}</p></div>
        </div>
      </Card>
    </div>
  );
};

export default Post;
