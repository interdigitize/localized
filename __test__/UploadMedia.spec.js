import React from 'react';
import { shallow, mount, render } from 'enzyme';
import UploadMedia from '../client/src/components/UploadMedia.jsx';

describe('UploadMedia Component', function() {

  it('should mount in a full DOM', function() {
    expect(mount(<UploadMedia />).find('.fileUpload').length).toBe(1);
  });

  it('should be selectable by class "fileUpload"', function() {
    expect(shallow(<UploadMedia />).is('.fileUpload')).toBe(true);
  });

});
