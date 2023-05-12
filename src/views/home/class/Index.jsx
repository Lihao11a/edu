import React, { Component } from "react";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Statistic,
  Button,
  List,
  Avatar,
  message
} from "antd";
import moment from "moment";
import Model from "./Model";
import { getClassList,deleteClass } from "../../../api/class";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
const { Countdown } = Statistic;
const { Meta } = Card;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
export default class Index extends Component {
  state = {
    visible: false,
    record: {},
    dataSource: [],
  };
  time(t) {
    return (t) => moment(t).format("YYYY-MM-DD HH:mm:ss");
  }
  onFinish() {
    console.log("finished!");
  }
  changeVisible = (visible) => {
    this.setState({
      visible,
    });
  };
  loadData = () => {
    getClassList().then((res) => {
      this.setState({
        dataSource: res.data,
      });
    });
  };
  delete = (id) =>{
      deleteClass({id}).then((res)=>{
          message.success(res.msg)
          this.loadData()
      })
  }
  componentDidMount(){
     this.loadData()
  }
  render() {
    const { visible, record, dataSource } = this.state;
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/home/main">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <span>学生管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>排课管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="mt">
          <Row>
            <Col span={8}>
              <Countdown
                title="模拟考倒计时"
                value={deadline}
                onFinish={this.onFinish}
              />
            </Col>
            <Col span={8}>
              <Countdown
                title="测评日"
                value={deadline}
                format="HH:mm:ss:SSS"
              />
            </Col>
            <Col span={8}>
              <Countdown
                title="中考倒计时"
                value={deadline}
                format="D 天 H 时 m 分 s 秒"
              />
            </Col>
          </Row>
        </Card>
        <Card className="mt">
          <Button type="primary" onClick={this.changeVisible}>
            新增排课
          </Button>
        </Card>
        <List
          className="mt"
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
                <Card
                   style={{ width: 300 }}
                   actions={[
                      <a onClick={()=>{this.setState({visible:true})}}>新增排课</a>,
                      <a onClick={()=>{this.delete(item.id)}}>删除排课</a>
                  ]}
                >
                   <Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={item.classroom}
                      description={
                               <div>
                                    <div style={{color:'#666'}}>时间：{moment(item.time).format("YYYY-MM-DD HH:mm:ss")}</div>
                                    <div style={{color:'#666'}}>老师：{item.teacher}</div>
                                    <div style={{color:'#666'}}>学科：{item.subject}</div>
                               </div>
                      }
                   />
                     
                </Card>
            </List.Item>
          )}
        ></List>
        <Model
          visible={visible}
          changeVisible={this.changeVisible}
          ref={(a) => (this.ref = a)}
          reload={this.loadData}
          record={record}
        ></Model>
      </div>
    );
  }
}
