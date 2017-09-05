import React from 'react';
import { Button } from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Navigation = (props) => (
  <Menu
    mode="horizontal">
    <Menu.Item key="mail">
      <Icon type="home" />Localized
    </Menu.Item>
    <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
);

export default Navigation;
