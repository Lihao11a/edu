import React, { Component } from "react";
import {
  Breadcrumb,
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Radio,
  Table
} from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import {  studentList } from "../../../../api/student";
const { Option } = Select;
export default class Index extends Component {
  state = {
    expand: false,
    formdata:{},
    pageData: {
      page: 1,
      pageSize: 10,
    },
    total:0,
    data:[]
  };
  
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  search = () =>{
     const formdata = this.ref2.getFieldsValue()
     this.setState({
       formdata
     },this.loadData())
  }
  componentDidMount(){
     this.loadData()
  }
  loadData=()=>{
    studentList({...this.state.pageData,...this.state.formData}).then(res=>{
     console.log(1,res.data)
     this.setState({
        data:res.data,
        total:res.total,
      })
    })
  }
  render() {
    const { expand } = this.state;
   const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        align: "center",
        width: 80,
        Render: (text, record, index) =>  { return index + 1},
      },
      { title: "姓名", dataIndex: "name", key: "name", width: 80 },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: 80,
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        width: 100,
      },
      { title: "科目", dataIndex: "subject", key: "4", width: 100 },
      {
        title: "班型",
        dataIndex: "type",
        key: "type",
        width: 100,
        Render: (text) => {
          if (text == 1) {
            return "一对一";
          } else if (text == 2) {
            return "小班";
          } else if (text == 3) {
            return "大班";
          } else {
            return "精英班";
          }
        },
      },
      { title: "家长姓名", dataIndex: "parentname", key: "parentname", width: 100 },
      { title: "家长电话", dataIndex: "parenttel", key: "parenttel", width: 180 },
      {
        title: "班主任姓名",
        dataIndex: "classteacher",
        key: "classteacher",
        width: 120,
      },
      {
        title: "校区",
        dataIndex: "campus",
        key: "campus",
        width: 100,
        Render:(text)=> {
          if (text == 1) {
            return "中心校区";
          } else if (text == 2) {
            return "顺义校区";
          } else if (text == 3) {
            return "昌平校区";
          } else {
            return "大兴校区";
          }
        },
      },
      {
        title: "剩余课时",
        dataIndex: "percent",
        key: "percent",
        width: 150,
      },
      { title: "已缴费用", dataIndex: "charge", key: "charge", width: 100 },
      {
        title: "课程有效期",
        dataIndex: "validperiod",
        key: "validperiod",
        width: 150
      },
      { title: "课程顾问", dataIndex: "consultant", key: "consultant", width: 100 },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 150,
      },
    ]
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
          <Breadcrumb.Item>学生信息</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          className="mt"
          style={{ paddingTop: "15px", boxSizing: "border-box" }}
        >
          <Form
            ref={(a)=>{this.ref2=a}}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="姓名" name="name">
                  <Input placeholder="请输入学生姓名"></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="科目" name="subject">
                  <Select>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="物理">物理</Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                    <Option value="地理">地理</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="年级" name="grade">
                  <Select>
                    <Option value="一年级">一年级</Option>
                    <Option value="二年级">二年级</Option>
                    <Option value="三年级">三年级</Option>
                    <Option value="四年级">四年级</Option>
                    <Option value="五年级">五年级</Option>
                    <Option value="六年级">六年级</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <a
                  style={{
                    fontSize: 12,
                  }}
                  onClick={this.toggle}
                >
                  <DownOutlined rotate={expand ? 180 : 0} />{" "}
                  {expand ? "收起" : "展开"}
                </a>
              </Col>
              <Col span={4}>
                <Button type="primary" className="mr" onClick={this.search}>
                  查询
                </Button>
                <Button>重置</Button>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6} style={{ display: expand ? "block" : "none" }}>
                <Form.Item label="教师" name="headTeacher">
                  <Input placeholder="请输入班主任姓名"></Input>
                </Form.Item>
              </Col>
              <Col span={6} style={{ display: expand ? "block" : "none" }}>
                <Form.Item label="班型" name="type">
                  <Select>
                    <Option value="1">1对1</Option>
                    <Option value="2">小班</Option>
                    <Option value="3">大班</Option>
                    <Option value="4">精英班</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} style={{ display: expand ? "block" : "none" }}>
                <Form.Item label="家长" name="parent">
                  <Input placeholder="请输入家长姓名"></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className="mt">
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">全部</Radio.Button>
            <Radio.Button value="b">中心校区</Radio.Button>
            <Radio.Button value="c">顺义校区</Radio.Button>
            <Radio.Button value="d">大兴校区</Radio.Button>
            <Radio.Button value="e">昌平校区</Radio.Button>
          </Radio.Group>
        </Card>
        <Card className="mt">
          <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1300 }} />
        </Card>
      </div>
    );
  }
}
