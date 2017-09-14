import styled, { injectGlobal, css } from 'styled-components';
import { black, orange } from './colors';

// Global Styles
injectGlobal`
  @import url('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css');

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    font-variant-ligatures: no-common-ligatures;
    text-rendering: optimizeLegibility;
    padding: 0;
    margin: 0;
    color: ${black};
  }

  main {
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6{
    margin: 0 0 15px 0;
    line-height: 1.3;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }

{/* From styles.css  */}
  .custom-image {
    position: relative;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 301px;
  }

  .custom-card {
    padding: 10px 16px;
  }

  .custom-card p {
    color: #999;
  }
`;
