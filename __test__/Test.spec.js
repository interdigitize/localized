import React from 'react';
import {shallow} from 'enzyme';

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('<Upload />', () => {
  it('should render one <Modal /> component', () => {
    const wrapper = shallow(<Upload />);
    expect(wrapper.find(Modal)).to.have.length(1);
  });
  // it('should render an `.icon-star`', () => {
  //   const wrapper = shallow(<MyComponent />);
  //   expect(wrapper.find('.icon-star')).to.have.length(1);
  // });
});
