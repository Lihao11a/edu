import React, { Component } from "react";
import { Row, Col, Table, Card, Button, Modal, Radio,message} from "antd";
import { getUserList, changeRole } from "../../../api/incex";
export default class Index extends Component {
  state = {
    dataSource: [],
    pageData: {
      page: 1,
      pageSize: 10,
    },
    visible: false,
    roles: "",
    id: "",

  };
  componentDidMount() {
    getUserList().then((res) => {
      this.setState({
        dataSource: res.data,
      });
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleOk = () => {
    changeRole({role:this.state.roles, id: this.state.id}).then((res)=>{
         message.success(res.msg)
         this.setState({
            visible:false
         })
         getUserList().then((res) => {
          this.setState({
            dataSource: res.data,
          });
        })
    })
    this.setState({
      visible: false,
    });
  };
  setvisible = (record) => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
      id:record.id,
      roles:record.role
    });
  };
  onChange = (e) =>{
    this.setState({
      roles: e.target.value,
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
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: "手机号",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        key: "nickname",
      },
      {
        title: "角色",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "操作",
        dataIndex: "setRole",
        key: "setRole",
        render: (text, record, index) => {
          return (
            <Button type="primary" size="small" onClick={()=>{this.setvisible(record)}}>
              设置权限
            </Button>
          );
        },
      },
    ];
    const { dataSource, visible } = this.state;
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="员工信息">
              <Table columns={columns} dataSource={dataSource} />
            </Card>
          </Col>
        </Row>
        
        <Modal
          title="权限设置"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Radio.Group onChange={this.onChange} value={this.state.roles}>
            <Radio value={'admin'}>管理员/老板</Radio>
            <Radio value={'teacher'}>老师/咨询师</Radio>
            <Radio value={'manager'}>部门经理</Radio>
          </Radio.Group>
        </Modal>
      </div>
    );
  }
}
