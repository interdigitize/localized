import React from 'react';
import { Button } from 'antd';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import FamiliesContainer from './FamiliesContainer.jsx';
import PostsContainer from './PostsContainer.jsx';
import UploadMedia from './UploadMedia.jsx';
import InviteModal from './InviteModal.jsx';
import { Avatar } from 'antd';
import { AvatarMenuItem } from '../styles/styled-components';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    if (window.innerWidth < 768) {
      this.setState({
        collapsed: true
      });
    }
  }

  render() {
    const { first, avatar } = __PRELOADED_STATE__.user;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <AvatarMenuItem isCollapsed={this.state.collapsed} key="1">
            <Avatar src={avatar}/>
            <span>{first}</span>
          </AvatarMenuItem>
          <Menu.Item key="2">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user" />
            <span>Profile</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="picture" />
            <span>Photo Collections</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="heart-o" />
            <span>Favorites</span>
          </Menu.Item>
          <Menu.Item key="6">
            <a href="/logout">
              <Icon type="logout"/>
              <span>Logout</span>
            </a>
          </Menu.Item>
          <InviteModal isCollapsed={this.state.collapsed} />
          <Menu.Item key="7">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}/>
            <span className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}>Expand/Collapse</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Navigation;
