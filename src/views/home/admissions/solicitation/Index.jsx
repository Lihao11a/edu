import React, { Component } from "react";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Input,
  Form,
  Button,
  Table,
  Divider,
  Tag,
  Badge,
} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default class Index extends Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/home/main">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <span>招生管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>邀约查询</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="mt" style={{textAlign:'right'}}>
           <Link to='/home/admissions/intentional'>
               <Button type="primary" >返回</Button>
           </Link>
        </Card>
        <Card className="mt">
            <Row>
               <h3>家长信息</h3>
            </Row>
            <Row className="mt">
                <Col span={6}>
                   <span>姓名：陈妍青</span>
                </Col>
                <Col span={6}>
                   <span>电话：15789887654</span>
                </Col>
                <Col span={6}>
                   <span>家庭住址：北京市朝阳区</span>
                </Col>
                <Col span={6}>
                   <span>咨询课程：三年级数学</span>
                </Col>
            </Row>
            <Row className="mt">
                <Col span={6}>
                    <span>年龄：37</span>
                </Col>
                <Col span={6}>
                    <span>文化程度：本科</span>
                </Col>
                <Col span={6}>
                    <span>关系：母亲</span>
                </Col>
                <Col span={6}>
                   <span>意向成度：2</span>
                </Col>
            </Row>
            <Row className="mt">
                <Col span={6}>
                  <span>满意因素：环境好，老师素质高</span>
                </Col>
                <Col span={6}><span>不满意因素：费用贵</span></Col>
                <Col span={6}><span>其他意向机构：学而思</span></Col>
                <Col span={6}><span>备注：再考虑一下，预计一星期内回复</span></Col>
            </Row>
        </Card>
      </div>
    );
  }
}
