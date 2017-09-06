// import React from 'react';
// import {shallow} from 'enzyme';

describe('<Upload />', () => {
  it('should render one <Modal /> components', () => {
    const wrapper = shallow(<Upload />);
    expect(wrapper.find(Modal)).to.have.length(1);
  });
  // it('should render an `.icon-star`', () => {
  //   const wrapper = shallow(<MyComponent />);
  //   expect(wrapper.find('.icon-star')).to.have.length(1);
  // });
});

//
// test('CheckboxWithLabel changes the text after click', () => {
//   // Render a checkbox with label in the document
//   const checkbox = shallow(
//     <CheckboxWithLabel labelOn="On" labelOff="Off" />
//   );
//
//   expect(checkbox.text()).toEqual('Off');
//
//   checkbox.find('input').simulate('change');
//
//   expect(checkbox.text()).toEqual('On');
// });
