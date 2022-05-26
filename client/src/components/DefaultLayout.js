import React from 'react'

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  LoginOutlined,
  HomeOutlined,
UserOutlined,
  ProfileOutlined,
  PlusOutlined,
  CheckOutlined,
  LogoutOutlined,
  MenuFoldOutlined
  
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import Filter from './Filter';

const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {

  constructor(props){
      super(props)
     this.state = {
        collapsed: false,
      };
     
  }
  logout=()=>{
    localStorage.removeItem('user')
    window.location.reload('')
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  

  render() {
    const user=JSON.parse(localStorage.getItem('user'))
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}
         style={{position: 'sticky' , overflow : 'auto' , height:'100%' , top:0}}
        >
          <div className="logo" >
             {this.state.collapsed ?(<h2 style={{color:'white',marginTop:'5px'}}>JI</h2>):( <h2 style={{color:'white',marginTop:'5px'}}>JUC Index</h2>)}
          </div>
          <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="/appliedjobs" icon={<PlusSquareOutlined />}>
            <Link to="/appliedjobs">Applied Jobs</Link>
          </Menu.Item>
          
          <Menu.Item key="/postjobs" icon={<PlusOutlined />}>
            <Link to="/postjobs">Post Jobs</Link>
          </Menu.Item>
          <Menu.Item key="/posted" icon={<CheckOutlined />}>
            <Link to="/posted">Posted Jobs</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={()=>{
            localStorage.removeItem('user')
           window.location.reload()
          }}>
          Logout
          </Menu.Item>
          
          
        </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 , position: 'sticky' , overflow : 'auto' , top:0 , zIndex:9999}}> 
        
        <div className='flex justify-content-between'>
          <div>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </div>

          <div>
            <Filter/>
          </div>

          <div style={{display :this.state.collapsed ?'none':'inline'}}>
            <h5  className='mr-2' style={{marginRight:'20px'}}><b>
              {user.username}
            </b></h5>
          </div>
        </div>
                  
          
          
          
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
           {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayout