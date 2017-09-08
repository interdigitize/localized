import React from 'react';
import { Button } from 'antd';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import '../styles.css';
import FamiliesContainer from './FamiliesContainer.jsx';
import PostsContainer from './PostsContainer.jsx';
import UploadMedia from './UploadMedia.jsx';

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
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}/>
            <span className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}>Expand/Collapse</span>
          </Menu.Item>
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
        </Menu>
      </Sider>
    );
  }
}

export default Navigation;
