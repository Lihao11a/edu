import React, { Component } from 'react'
import { Modal,Form,Input,DatePicker,Select,message} from 'antd'
import { addClass } from '../../../api/class'
import moment from 'moment'
const {Option} = Select
export default class Model extends Component {
    handleCancel = () => {
        this.props.changeVisible(false)
    }
    handleOk = () =>{
        this.formRef.validateFields().then((res)=>{
            let time = moment(res.time).format("YYYY-MM-DD HH:mm:ss")
            addClass({...res,time}).then((res)=>{
                  if(res.code == 0){
                    //发送成功提示
                    message.success(res.msg)
                    //隐藏弹窗
                    this.props.changeVisible(false)
                    //重置表单数据
                    this.formRef.resetFields()
                    //调用父组件方法刷新数据
                    this.props.reload()
                  }
            })
        })
    }
  render() {
    const {visible} = this.props
    return (
      <div>
          <Modal
          title="新增排课"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
        >
          <Form
              labelCol={{span:4}}
              wrapperCol={{span:20}}
              ref={(a)=>this.formRef=a}
           >
             <Form.Item
                label='教室'
                name='classroom'
                rules={[{ required: true, message: "教室名不能为空" }]}
             >
               <Input></Input>
             </Form.Item>
             <Form.Item
                label='老师'
                name='teacher'
                rules={[{ required: true, message: "教室名不能为空" }]}
             >
                <Input></Input>
             </Form.Item>
             <Form.Item
                label='学科'
                name='subject'
                rules={[{ required: true, message: "学科名不能为空" }]}
             >
                <Input></Input>
             </Form.Item>
             <Form.Item
                label='上课时间'
                name='time'
                rules={[{ required: true, message: "上课时间不能为空" }]}
             >
                <DatePicker style={{width:'100%'}} />
             </Form.Item>
             <Form.Item
                label='班型'
                name='type'
                rules={[{ required: true, message: "班型不能为空" }]}
             >
                 <Select>
                    <Option value={1}>一对一</Option>
                    <Option value={2}>小班</Option>
                    <Option value={3}>大班</Option>
                    <Option value={4}>精英班</Option>
                 </Select>
             </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
