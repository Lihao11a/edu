import React, { Component } from 'react'
import { Breadcrumb, Card,Form,Row,Col,Input,Select,DatePicker,Button,Table,Pagination } from 'antd'
import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import { examList } from '../../../../api/student'
import moment from 'moment'
const {Option} = Select
const {RangePicker} = DatePicker
export default class Index extends Component {
  state={
    formData:{},
    pageData:{
      page:1,
      pageSize:10
   },
   total:0,
   data:[]
  }
  loadData =()=>{
    examList({...this.state.pageData,...this.state.formData}).then((res)=>{
      this.setState({
        data:res.data,
        total:res.total,
     })
    })
  }
  componentDidMount(){
     this.loadData()
  }
  search=()=>{
    const formData = this.formref.getFieldsValue()
    this.setState({
       formData
    },function(){
      this.loadData()
    })
  }
  reset = ()=>{
    //清空表单数据
     this.formref.resetFields()
     this.setState({
      pageData:{
        page:1,
        pageSize:10
     },
     formData:{}
     },this.loadData())
  }
  pageChange=(page,pageSize)=>{
    this.setState({
       pageData:{
          page,
          pageSize
       }
    },function(){
       this.loadData()
    })
 }
  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        align: "center",
        width: 80,
        render: (text, record, index) => {return index + 1} 
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 80,
      },
      {
        title: "类别",
        dataIndex: "type",
        key: "type",
        width: 100,
      },
      {
        title: "考试时间",
        dataIndex: "date",
        key: "date",
        width: 100,
        render:(text) =>{
          return moment(text).format("YYYY-MM-DD");
        },
      },
      {
        title: "科目",
        dataIndex: "subject",
        key: "subject",
        width: 100,
      },
      {
        title: "成绩发布时间",
        dataIndex: "publishTime",
        key: "publishTime",
        render:(text)=>{
          return moment(text).format("YYYY-MM-DD");
        },
        width: 100,
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 120,
      },
      {
        title: "参与班级",
        dataIndex: "grade",
        key: "grade",
        width: 150,
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
            <span>学生管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>考试管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card className='mt'>
           <Form ref={(a)=>this.formref=a} name='basic' labelCol={{span:6}} wrapperCol={{span:18}}>
                <Row gutter={16}>
                   <Col span={6}>
                      <Form.Item
                         label='考试名称'
                         name='name'
                      >
                        <Input placeholder='请输入考试名称'></Input>
                      </Form.Item>
                   </Col>
                   <Col span={6}>
                      <Form.Item
                          label='考试类别'
                          name='type'
                       >
                        <Select>
                           <Option value='1'>摸底考试</Option>
                           <Option value='2'>随堂考试</Option>
                           <Option value='3'>期中考试</Option>
                           <Option value='4'>期末考试</Option>
                        </Select>
                      </Form.Item>
                   </Col>
                   <Col span={6}>
                      <Form.Item label='考试日期' name='date'>
                          <RangePicker/>
                      </Form.Item>
                   </Col>
                   <Col>
                     <Button type='primary' style={{marginRight:'10px'}} onClick={this.search}>搜索</Button>
                     <Button onClick={this.reset}>重置</Button>
                   </Col>
                </Row>
           </Form>
        </Card>
        <Card className='mt'>
           <Table columns={columns} dataSource={this.state.data} pagination={false} />
           <Pagination size="small" className='mt' total={this.state.total} onChange={this.pageChange} showSizeChanger showQuickJumper /> 
        </Card>
      </div>
    )
  }
}
