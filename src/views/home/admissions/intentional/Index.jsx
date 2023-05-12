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
import { getStudentList } from "../../../../api/student";
import { Link } from "react-router-dom";
export default class Index extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    getStudentList().then((res) => {
      this.setState({
        data: res.data,
      });
      console.log(8, this.state.data);
    });
  }
  render() {
    const columns = [
      {
        title: "序号",
        align: "center",
        dataIndex: "index",
        width: 60,
        key: "index",
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 80,
        align: "center",
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        align: "center",
        width: 60,
        render: (text) => (text == 1 ? "男" : "女"),
      },
      {
        title: "客户状态",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (text) => {
          if (text == 1) {
            return <Tag color="#87d068">转化成功</Tag>;
          } else if (text == 2) {
            return <Tag color="#2db7f5">待转化</Tag>;
          } else {
            return <Tag color="#f50">转化失败</Tag>;
          }
        },
      },
      {
        title: "试听状态",
        key: "audition",
        dataIndex: "audition",
        align: "center",
        render: (text) => {
          if (text == 1) {
            return <Badge status="success" text="已转试听"></Badge>;
          } else if (text == 2) {
            return <Badge status="default" text="未转试听"></Badge>;
          }
        },
      },
      {
        title: "招生来源",
        key: "source",
        dataIndex: "source",
        align: "center",
      },
      {
        title: "手机号码",
        dataIndex: "tel",
        key: "tel",
        align: "center",
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        align: "center",
      },
      {
        title: "意向级别",
        dataIndex: "level",
        key: "level",
        align: "center",
        render: (text) => {
          if (text == 1) {
            return <div>意向强烈！</div>;
          } else if (text == 2) {
            return <div>疑似有点意向了</div>;
          } else {
            return <div>没有意向😫</div>;
          }
        },
      },
      {
        title: "主负责任人",
        dataIndex: "principal",
        key: "principal",
        align: "center",
      },
      {
        title: "详情",
        align: "center",
        render: (text, record) => {
          return (
            <div>
              <Link to='/home/admissions/solicitation'>
                <Button
                  type="danger"
                  size="small"
                  className="ml"
                  onClick={this.detail}
                >
                  详情
                </Button>
              </Link>
            </div>
          );
        },
      },
    ];
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
        <Card className="mt">
          <Form
            ref={this.formRef}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Row gutter={18}>
              <Col span={6}>
                <Form.Item label="姓名" name="name">
                  <Input placeholder="请输入教师姓名"></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="负责人" name="leader">
                  <Input placeholder="请输入负责人姓名"></Input>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button type="primary" style={{ marginRight: "10px" }}>
                  查询
                </Button>
                <Button>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className="mt">
          <Button type="primary" className="mr">
            新增
          </Button>
          <Button type="danger" className="mr">
            删除
          </Button>
          <Button type="primary" className="mr">
            转化为正式学员
          </Button>
          <Button type="primary" className="mr">
            取消转换
          </Button>
        </Card>
        <Card className="mt">
          <Table columns={columns} dataSource={this.state.data} />
        </Card>
      </div>
    );
  }
}
