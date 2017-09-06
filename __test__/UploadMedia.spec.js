import React from 'react';
import { shallow, mount, render } from 'enzyme';
import UploadMedia from '../client/src/components/UploadMedia.jsx';

describe('Image upload btn', function() {

  it('should mount in a full DOM', function() {
    expect(mount(<UploadMedia />).find('.uploadedFiles').length).toBe(1);
  });

  it('should be selectable by class "uploadFiles"', function() {
    expect(shallow(<UploadMedia />).is('.uploadedFiles')).toBe(true);
  });
});
