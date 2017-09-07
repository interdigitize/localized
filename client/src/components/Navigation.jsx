import React from 'react';
import { Button } from 'antd';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import '../styles.css';
import FamiliesContainer from './FamiliesContainer.jsx';
import PostsContainer from './PostsContainer.jsx';

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

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="picture" />
              <span>Photo Collections</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="heart-o" />
              <span>Favorites</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ background: '#fff', padding: 5 }}>
            <FamiliesContainer />
          </Content>
          <Content style={{background: '#f1f1f1', padding: 5, minHeight: 800}}>
            <PostsContainer posts={posts}/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Navigation;
