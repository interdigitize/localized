import React from 'react';
import { Card, Icon} from 'antd';

const Post = (props) => {

  var tagType;
  const poster = props.post.user_id;
  // Below removes the contentEditable warning in the console that a component is contentEditable.
  console.error = (() => {
    const error = console.error;
    return (exception) => {
      if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
        error.apply(console, arguments);
      }
    };
  })();

  if (
    props.post.type === 'audio/mp3' ||
    props.post.type === 'audio/x-m4a' ||
    props.post.type === 'audio/ogg' ||
    props.post.type === 'audio/wav') {
    tagType = (
      <audio className="custom-image" controls>
        <source src={props.post.url} type={props.post.type}/>
      </audio>
    );
  } else if (
    props.post.type === 'video/mp4' ||
    props.post.type === 'video/webm' ||
    props.post.type === 'video/ogg') {
    tagType = (
      <video className="custom-image" controls>
        <source src={props.post.url} type={props.post.type}/>
      </video>
    );
  } else {
    tagType = (<div className="custom-image" onClick={props.handleDisplayLightbox}  style={{backgroundImage: `url(${props.post.url})`}}></div>);
  }

  return (
    <div>
      <Card style={{ width: 300}} bodyStyle={{ padding: 15 }}>
        {tagType}
        <div className="custom-card">
          <div 
            contentEditable={poster === props.loggedInUser} 
            id={props.post.id} 
            onInput={props.updatePostTitle}>
            <h5>{props.post.title}</h5>
          </div>
          <div 
            contentEditable={poster === props.loggedInUser} 
            id={props.post.id} 
            onInput={props.updatePostDescription}>
            <p>{props.post.description}</p>
          </div>
          <Icon type="delete" onClick={() => props.deletePost(props.post.id)}/>
        </div>
      </Card>
    </div>
  );
};

export default Post;
