import React, { Component } from "react";
import { connect } from "react-redux";
import { getInfo } from "../../api/incex";
import { menuFilter } from "../../utils/menuFilter";
import { asyncRouterMap } from "../../common/routerMap";
import { loginAction } from "../../redux/actions/login";
import { Route,NavLink } from "react-router-dom";
import { lazy, Suspense } from "react";
import { menuAction } from "../../redux/actions/menu";
import { Layout, Menu } from "antd";
import Headers from '../../components/header/Index'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class Home extends Component {
  state = {
    collapsed: false,
    menuTree: [],
  };
   //创建异步路由
  renderRoute = (menu) => {
    let routerList = [];
    const asyncRoute = (data) => {
      data.forEach((item) => {
        if (item.children) {
           asyncRoute(item.children);
        } 
        else {
          routerList.push(
            <Route
              path={item.path}
              component={lazy(() => import(`@/views${item.path}/Index.jsx`))}
              key={item.path}
            ></Route>
          );
        }
      });
    };
    console.log(routerList)
    asyncRoute(menu);
    return routerList;
  };

  componentDidMount() {
    //判断用户是否刷新
    console.log(this.props);
    if (this.props.res.menuReducer.length) {
      const menuTree = this.renderMenu(this.props.res.menuReducer);
      this.setState({
        menuTree,
      });
    } else {
      getInfo().then((res) => {
        const { loginAction, menuAction } = this.props;
        //重新设置用户名和权限
        loginAction({ nickname: res.data.nickname, role: res.data.role });
        //存储菜单数据
        menuAction(menuFilter(asyncRouterMap, res.data.role));
        const menuTree = this.renderMenu(this.props.res.menuReducer);
        this.setState({
          menuTree,
        });
      });
    }
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
 
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.meta.title} key={item.path}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={item.path}>
        <NavLink to={item.path}>
             {item.meta.title}
        </NavLink>
        
        </Menu.Item>;
    });
  };
  render() {
    const { menuReducer } = this.props.res;
    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Sider style={{ background: "#001529" }}>
            <h1 style={{textAlign:'center',color:'#fff',lineHeight:'50px',marginTop:'15px'}}>下北泽教育</h1>
            <Menu theme="dark">{this.state.menuTree}</Menu>
          </Sider>
          <Layout style={{background:'#f4f4f4',height:'100vh',overflow:'auto'}}>
            <Header style={{ color: "#fff",background:'#fff',textAlign:'right' }}>
              <Headers history={this.props.history}></Headers>
            </Header>
            <Suspense fallback={<div>Loading...</div>}>
              <Content style={{padding:'20px'}}>{this.renderRoute(menuReducer)}</Content>
            </Suspense>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    res: state,
  }),
  {
    loginAction,
    menuAction,
  }
)(Home);
