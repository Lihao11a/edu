import React, { Component } from 'react'
import {Card, Col, Form , Input,Row , Select, Button,Table,Pagination,ConfigProvider,message} from 'antd'
import { getTeacherList,deleteTeacher,batchDelete } from '../../../api/teacher'
import AddModal from './AddModal'
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'
const {Option} = Select
export default class teacher extends Component {
 formRef = React.createRef()
edit = (record)=>{
   console.log(record)
   this.setState({
      record,
      visible:true,
      title:'编辑菜单'
   },function(){
      this.ref.formRef.setFieldsValue({
      ...record,
      date:moment(record.date),
      birth:moment(record.birth)
    })
   })
}
 state={
    disabled:true,
    loading:false,
    data:[],
    pageData:{
       page:1,
       pageSize:10
    },
    formData:{},
    total:0,
    visible:false,
    locale: zhCN,
    record:{},
    title:'',
    selectedRowKeys:[]
 }
 columns = [
  {
    title:'序号',
    dataIndex:'index',
    key:'index',
    align:'center',
    width:60,
    render: (text, record, index) => { return index+1}
  },
  {
    title:'姓名',
    dataIndex:'name',
    key:'name',
    width:80,
    align:'center'
  },
  {
    title:'性别',
    dataIndex:'gender',
    key:'gender',
    align:'center',
    width:60,
    render:(text)=>text==1?'男':'女'
  },
  {
    title:'级别',
    dataIndex:'level',
    key:'level',
    align:'center',
    width:90,
    render:(text)=>{
       if(text==1){
          return '初级教师'
       }else if(text==2){
          return '中级教师'
       }else if(text=3){
          return '高级教师'
       }else{
          return '特级教师'
       }
    }
  },
  {
    title:'年级',
    dataIndex:'grade',
    key:'grade',
    align:'center',
    width:70
  },
  {
    title:'科目',
    dataIndex:'subject',
    key:'subject',
    width:70,
    align:'center'
  },
  {
    title:'入职日期',
    dataIndex:'date',
    key:'date',
    width:120,
    align:'center'
  },
  {
    title:'类型',
    dataIndex:'type',
    key:'type',
    align:'center',
    width:70,
    render:(text)=>text==1?'全职':'兼职'
  },
  {
    title:'手机号码',
    dataIndex:'tel',
    key:'tel',
    align:'center',
    width:120
  },
  {
    title:'毕业院校',
    dataIndex:'school',
    key:'school',
    align:'center',
    width:90
  },
  {
    title:'出生年月',
    dataIndex:'birth',
    key:'birth',
    align:'center'
  },
  {
    title:'家庭住址',
    dataIndex:'address',
    key:'address',
    align:'center'
  },
  {
    title:'学历',
    dataIndex:'education',
    key:'education',
    align:'center',
    width:80
  },
  {
    title:'操作',
    dataIndex:'operation',
    key:'operation',
    fixed:'right',
    align:'center',
    render:(text,record)=>{
        return <div>
           <Button type='primary' size='small' onClick={()=>{this.edit(record)}}>编辑</Button>
           <Button type='danger' size='small' className='ml' onClick={()=>{this.deletes(record.id)}} >删除</Button>
        </div>
    }
  }
]
deletes=(id)=>{
   deleteTeacher({id}).then(res=>{
      if(res.code===0){
         //发送消息提示
         message.success(res.msg);
         //调用loadData方法刷新数据
         this.loadData()
      }
   })
}
show = ()=>{
   this.setState(
       {
          visible:true,
          title:'新建菜单'
       },function(){
         this.ref.formRef.resetFields()
       }
   )
}
 changeVisible = (visible)=>{
      this.setState(
         {
            visible
         }
      )
 }
 componentDidMount(){
   this.loadData()
 }
 loadData=()=>{
   this.setState({
       loading:true
   })
   
   getTeacherList({...this.state.pageData,...this.state.formData}).then(res=>{
    console.log(1,res.data)
    this.setState({
       data:res.data,
       loading:false,
       total:res.total,
       disabled:true
    })
   })
 }
 search=()=>{
  const formData = this.formRef.current.getFieldsValue(true)
  this.setState({
     formData
  },function(){
    this.loadData()
  })
  }
reset = ()=>{
  //清空表单数据
   this.formRef.current.resetFields()
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
selectChange=(selectedRowKeys)=>{
   this.setState({
      selectedRowKeys,
      disabled:selectedRowKeys.length>0? false:true
   })
}
batchDelete=()=>{
   batchDelete({ids:this.state.selectedRowKeys}).then(res=>{
      if(res.code===0){
         //发送消息提示
         message.success(res.msg);
         //调用loadData方法刷新数据
         this.loadData()
   }
   }
   )
}
render() {
    const {loading,visible,total,record,disabled,title,selectedRowKeys} = this.state
    
    return (
      <div>
         <Card>
             <Form
                ref={this.formRef}
                name='basic'
                labelCol={{span:6}}
                wrapperCol={{span:18}}
            >
               <Row gutter={16}>
                   <Col span={6}>
                      <Form.Item
                         label='姓名'
                         name='name'
                      >
                        <Input></Input>
                      </Form.Item>
                   </Col>
                   <Col span={6}>
                      <Form.Item
                          label='科目'
                          name='subject'
                       >
                        <Select>
                           <Option value='语文'>语文</Option>
                           <Option value='数学'>数学</Option>
                           <Option value='物理'>物理</Option>
                           <Option value='化学'>化学</Option>
                           <Option value='生物'>生物</Option>
                           <Option value='地理'>地理</Option>
                        </Select>
                      </Form.Item>
                   </Col>
                   <Col span={6}>
                   <Form.Item
                         label='手机号'
                         name='tel'
                      >
                        <Input></Input>
                      </Form.Item>
                   </Col>
                   <Col span={6}>
                     <Button type='primary' style={{marginRight:'10px'}} onClick={this.search}>搜索</Button>
                     <Button onClick={this.reset}>重置</Button>
                   </Col>
        
               </Row>
                
             </Form>
         </Card>
         <Card className='mt'>
            <Button type='primary' onClick={this.show}>新建员工</Button>
            <Button danger disabled={disabled} className='ml' onClick={this.batchDelete}>批量删除</Button>
         </Card>
         <Card className='mt'>
             <Table  
             columns={this.columns} 
             dataSource={this.state.data}  
             scroll={{x: 1500}}
             loading={loading}
             pagination={false}
             rowKey={(record) => record.id}
             rowSelection={
               {
                  type:'checkbox',
                  selectedRowKeys,
                  onChange:this.selectChange
               }
             }/>
             <ConfigProvider locale={zhCN} >
                  <Pagination size="small" className='mt' total={total} onChange={this.pageChange} showSizeChanger showQuickJumper /> 
             </ConfigProvider>
            
         </Card>
         <AddModal visible={visible} 
         changeVisible={this.changeVisible} 
         reload = {this.loadData}
         record = {record}
         ref={(a)=>this.ref=a}
         title = {title}
         ></AddModal>
      </div>
    )
  }
}
