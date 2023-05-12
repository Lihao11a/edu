import React, { Component } from "react";
import { Card, Tabs, Form, Input, Button,message } from "antd";
import style from "./Login.module.css";
import { loginAction } from "../../redux/actions/login";
import { menuAction } from "../../redux/actions/menu";
import { connect } from "react-redux";
import { login,register } from "../../api/incex";
import { asyncRouterMap } from "../../common/routerMap";
import { menuFilter } from "../../utils/menuFilter";
const { TabPane } = Tabs;
class Login extends Component {
  getvalue = () => {
    const { loginAction, menuAction, history } = this.props;
    console.log(3,this.formRef2)
    console.log(4,this.props)
    this.formRef.validateFields().then((res) => {
        //表单校验通过
        //用户的权限和昵称
        login(res).then((res) => {
            //存token
            sessionStorage.setItem("token", res.token);
            loginAction({
              role: res.role,
              nickname: res.nickname,
            });
            //筛选菜单项并加入到redux中
            menuAction(menuFilter(asyncRouterMap, res.role));
            history.push("/home/main");
            //直接筛选出每个角色所对应的菜单项
            //跳转
          }).catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
        //表单校验不通过
        console.log(err);
      });
  };
  getRegister=()=>{
      this.formRef2.validateFields().then(res=>{
         register(res).then((res)=>{
            if(res.code==0){
               message.success(res.msg)
            }
         })
      })
  }
  
  render() {
    return (
      <div className={style.wrap}>
        <h1>{this.props.res.loginReducer.nickname}</h1>
        <Card
          title="下北泽中学教务管理系统"
          headStyle={{ textAlign: "center" }}
          style={{ width: 500 }}
          bordered={false}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="手机号密码登录" key="1">
              <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                ref={(a) => (this.formRef = a)}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "请输入用户名！" },
                    {
                      pattern: /^\w{4,8}$/,
                      message: "四到八位数字或字母组合！",
                    },
                  ]}
                >
                  <Input placeholder="请输入账户" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "密码不能为空！" }]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.getvalue}
                >
                  立即登录！
                </Button>
              </Form>
            </TabPane>
            <TabPane tab="新用户注册" key="2">
              <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                ref={(a)=>(this.formRef2 = a)}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "请输入用户名！" },
                    {
                      pattern: /^\w{4,8}$/,
                      message: "四到八位数字或字母组合！",
                    },
                  ]}
                >
                  <Input placeholder="请输入账户" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "密码不能为空！" }]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Form.Item
                  name="nickname"
                  rules={[
                    { required: true, message: "请输入姓名！" },
                  ]}
                >
                  <Input placeholder="请输入姓名" />
                </Form.Item>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.getRegister}
                >
                  立即注册！
                </Button>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
export default connect((state) => ({ res: state }), {
  loginAction,
  menuAction,
})(Login);
