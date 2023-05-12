import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { menuAction } from "../../redux/actions/menu";
import { loginAction } from "../../redux/actions/login";
import { DownOutlined, UserOutlined, LogoutOutlined,NotificationOutlined } from "@ant-design/icons";
import style from '../../components/header/Index.module.css'
class Index extends Component {
    logOut=()=>{
        //清除token
        sessionStorage.clear()
        //清空redux的数据
        this.props.menuAction([])
        this.props.loginAction({role:'',nickname:''})
        //路由跳转
        this.props.history.push('/login')
    }
    render() {
    const menu = (
        <Menu>
          <Menu.Item key='a'>
            <NavLink to='/home/personal'>
              <UserOutlined /> 个人中心
            </NavLink>
          </Menu.Item>
          <Menu.Item key='b' onClick={this.logOut}>
            <LogoutOutlined /> 退出登录
          </Menu.Item>
        </Menu>
      );
    const { nickname } = this.props.res.loginReducer;
    return (
      <div>
        <span className={style.notification}>
             <NotificationOutlined style={{ fontSize: '16px', color: '#08c' }}/>
        </span>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <span style={{ marginRight: "3px" }}>欢迎你，{nickname}</span>{" "}
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default connect((state) => ({
  res: state,
}),{
    
    menuAction,
    loginAction
    
})(Index);
