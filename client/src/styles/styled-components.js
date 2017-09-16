import styled, { css } from 'styled-components';
import { small } from './utils';
import { Layout } from 'antd';
const { Content } = Layout;
import { Menu, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import colors from './colors';

// 404.jsx
export const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & > h2 {
    text-decoration: underline;
  }
`;

// AddFamily.jsx

// FamiliesContainer.jsx
export const FamiliesHeader = styled.div`
  padding: 20px;
`;

export const FamilyImages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
`;

export const AddFamilyContainer = styled.div`
  float: right;
  padding: 10px;
`;

// Family.jsx


// Footer.jsx


// Home.jsx
export const HomeLayout = styled(Layout)`
  flex-direction: column;
`;

export const FamilyMemberLayout = styled(Content)`
  background: #fff;
  padding: 5px;
`;

export const PostLayout = styled(Content)`
  background: #f1f1f1;
  padding: 5px;
  minHeight: 800;
`;

// InviteModal.jsx
export const InviteModalContainer = styled.div`
  text-align: center;
`;

// Lightbox
export const Close = styled.div`
  & i {
    z-index: 99999;
    position: fixed;
    color: ${colors.grey};
    top: 3%;
    right: 7%;
  }
  &:hover{
    cursor: pointer;
  }
`;

export const LightboxBackground = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
`;

export const LightboxContent = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  overflow: visible;
`;

export const LightboxImg = styled.img`
  height: 40vw;
  width: auto;
  margin: 50px auto;
`;

export const LightboxCaption = styled.div`
  color: #ccc;
`;

// Main.jsx

// Member.jsx
export const MemberImage = styled.div`
  ${props => props.image && css`
    background-image: url(${props.image});
  `}
  position: relative;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const MemberName = styled.div`
  position: relative;
  margin-right: 20px;
  margin-bottom: 10px;
`;

// Navigation.jsx
export const AvatarMenuItem = styled(Menu.Item)`
  align-items: center;

  &.ant-menu-item {
    display: flex;
  }

  & span:last-of-type {
    padding: 5px 0 0 8px;
  }

  ${props => props.isCollapsed && css`
    align-items: center;
    &.ant-menu-item[role="menuitem"] {
      padding: 0;
      justify-content: center;
    }
    & span:last-of-type {
      display: none;
    }
  `}
`;

// Post.jsx
export const RangePickerItem = styled(RangePicker)`
  padding: 10px;
  float: right;
`;


// PostContainer.jsx


// UploadMedia.jsx
