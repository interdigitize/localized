import styled, { css } from 'styled-components';
import { small } from './utils';
import { Layout } from 'antd';
const { Content } = Layout;
import { Menu } from 'antd';

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
  flexWrap: wrap;
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


// PostContainer.jsx


// UploadMedia.jsx
