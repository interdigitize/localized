import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Post from '../client/src/components/Post.jsx';

var dummyState = {
  id: 1,
  first: 'firstName',
  last: 'lastName',
  display: 'displayName',
  email: '123@gmail.com',
  phone: null,
  avatar: 'http://i.huffpost.com/gen/1899877/images/n-BEYONCE-SMILING-628x314.jpg',
  created_at: '2017-09-14T02:45:51.914Z',
  updated_at: '2017-09-14T02:45:51.914Z'
};

const dummydata = [
  {
    id: 1,
    url: "https://s3-us-west-1.amazonaws.com/localized-0001/1505188538887_AgeOfTheGeek_1504911888007+2.mp4",
    title: "Age of the Geek",
    description: "A classic Hardison-Eliot exchange.",
    type: "video/mp4",
    created_at: "2017-09-11 18:55:53.201982-05",
    user_id: 4
  },
  {
    id: 2,
    url: `https://s3-us-west-1.amazonaws.com/localized-0001/1505022937257_Bachs+granddaughter.m4a`,
    title: "Bach's Grandaughter",
    description: "A rough of a riff inspired by a Beatles song that was inspired by a Bach song",
    type: "audio/x-m4a",
    created_at: "2017-09-03 18:56:53.201982-05",
    user_id: 5
  }
];

// const noTypeOrURL = [{
//   id: 1,
//   title: "Age of the Geek",
//   description: "A classic Hardison-Eliot exchange.",
//   created_at: "2017-09-11 18:55:53.201982-05",
//   user_id: 4
// }]

// suggestions use 'in' ??

//Cases to Cover
describe('Post Component', () => {
  //1) no props
  it('It should have props', function(){
    expect(shallow(<Post post={dummydata[0]} __PRELOADED_STATE__={dummyState}/>).find('[post]')).toBeTruthy();
  });
  //2) no post url
  it('A post should have a url', function(){
    expect(shallow(<Post post={dummydata[0]}/>).find('[post="https://s3-us-west-1.amazonaws.com/localized-0001/1505188538887_AgeOfTheGeek_1504911888007+2.mp4"]')).toBeTruthy();
    // expect(shallow(<Post post={noTypeOrURL[0]}/>).find('[post='undefined']')).toBeUndefined();
  });
  it('A post should have a type', function(){
    expect(shallow(<Post post={dummydata[0]}/>).find('[post="video/mp4"]')).toBeTruthy();
    // expect(shallow(<Post post={noTypeOrURL[0]}/>).find('[post].type')).toBeUndefined();
  });
  //3) if the type is audio
  it('It should render an audio html5 element if the file has an audio mimetype', function(){
    const wrapper = shallow(<Post post={dummydata[1]}/>);
    expect(wrapper.contains(
      <audio className="custom-image" controls>
        <source src='https://s3-us-west-1.amazonaws.com/localized-0001/1505022937257_Bachs+granddaughter.m4a' type='audio/x-m4a'/>
      </audio>
    )).toEqual(true);
  });
  //4) if the type is video
  // it('It should render an video html5 element if the file has an video mimetype', function(){
  //   const wrapper = shallow(<Post post={dummydata[0]}/>);
  //   expect(wrapper.contains(
  //     <video className="custom-image" controls>
  //       <source src='https://s3-us-west-1.amazonaws.com/localized-0001/1505188538887_AgeOfTheGeek_1504911888007+2.mp4' type='video/mp4'/>
  //     </video>
  //   )).toEqual(true);
  // });

});
