import React, { Component } from "react";
import { Modal, Form, Row, Col, Input, Select, DatePicker, Radio,message } from "antd";
import { addTeacher ,editTeacher} from "../../../api/teacher";
import moment from 'moment'
const { Option } = Select;
export default class AddModal extends Component {
  componentDidUpdate(){
     console.log(this.props)
  }
  handleOk = () => {
     this.formRef.validateFields().then((res)=>{
        const {id} = this.props.record
        const birth = moment(res.birth).format("YYYY-MM-DD")
        const date=moment(res.date).format("YYYY-MM-DD")
        const fn = this.props.title == '新建菜单'?addTeacher({...res,birth,date}):editTeacher({...res,birth,date,id})
        fn.then(data=>{
             if(data.code===0){
                //发送消息提示
                message.success(data.msg);
                //隐藏弹窗
                this.props.changeVisible(false)
                //清空表单数据
                this.formRef.resetFields()
                //调用父组件方法刷新数据
                this.props.reload()
             }
        })
     }).catch((err)=>{
         console.log(err)
     })
  };
  handleCancel = () => {
      this.props.changeVisible(false)
  };
  render() {
    const {visible,title} = this.props
    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          width={800}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} ref={(a) => (this.formRef = a)}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: "姓名不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="性别"
                  name="gender"
                  rules={[{ required: true, message: "性别不能为空" }]}
                >
                  <Select>
                    <Option value={1}>男</Option>
                    <Option value={2}>女</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="级别"
                  name="level"
                  rules={[{ required: true, message: "级别不能为空" }]}
                >
                  <Select>
                    <Option value={1}>初级教师</Option>
                    <Option value={2}>中级教师</Option>
                    <Option value={3}>高级教师</Option>
                    <Option value={4}>特级教师</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="年级"
                  name="grade"
                  rules={[{ required: true, message: "年级不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="科目"
                  name="subject"
                  rules={[{ required: true, message: "科目不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="入职日期"
                  name="date"
                  rules={[{ required: true, message: "日期不能为空" }]}
                >
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="类型"
                  name="type"
                  rules={[{ required: true, message: "类型不能为空" }]}
                >
                  <Radio.Group >
                    <Radio value='1'>全职</Radio>
                    <Radio value='2'>兼职</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="手机号码"
                  name="tel"
                  rules={[{ required: true, message: "手机号码不能为空" },
                  {pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,message:'手机号码格式错误'}]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="毕业院校"
                  name="school"
                  rules={[{ required: true, message: "毕业院校不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="出生年月"
                  name="birth"
                  rules={[{ required: true, message: "出生年月不能为空" }]}
                >
                  <DatePicker style={{width:'100%'}}></DatePicker>
                </Form.Item>
                <Form.Item
                  label="家庭住址"
                  name="address"
                  rules={[{ required: true, message: "家庭住址不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="学历"
                  name="education"
                  rules={[{ required: true, message: "学历不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
