import React, { Component } from "react";
import { Breadcrumb, Card, Row, Col } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Calendar, Badge } from 'antd'
import { connect } from "react-redux";
import { loginAction } from "../../../redux/actions/login";
import style from "../personal/Index.module.css";
class Index extends Component {
  state = {
    date: new Date(),
    h: new Date().getHours(),
  };
  time = () => {
    const { h } = this.state;
    if (h <= 11) {
      return "上午好";
    } else if (h <= 13) {
      return "中午好";
    } else if (h <= 18) {
      return "下午好";
    } else {
      return "晚上好";
    }
  };

  render() {
    const { nickname } = this.props.res.loginReducer;
    function getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 10:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' },
          ];
          break;
        case 15:
          listData = [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event。。....' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' },
          ];
          break;
        default:
      }
      return listData || [];
    }
    
    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events">
          {listData.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    }
    
    function getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    }
    
    function monthCellRender(value) {
      const num = getMonthData(value);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      ) : null;
    }
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
        <Card className="mt">
          <Row>
            <Col span={8}>
              <p className={style.welcome}>
                {this.time()}!{nickname},准备吃点什么呢？
              </p>
              <p>课程咨询师 | 禾苗教育-IT技术部-教育管理系统后台</p>
            </Col>
            <Col
              xxl={{ span: 6, offset: 10 }}
              xl={{ span: 8, offset: 8 }}
              className={style.todo}
            >
              <div>
                <span class="items">转化学员数</span>
                <p class="count">56</p>
              </div>
              <div>
                <span class="items">团队排名</span>
                <p class="count">5/23</p>
              </div>
              <div style={{ border: "none" }}>
                <span class="items">本月目标</span>
                <p class="count">2,345</p>
              </div>
            </Col>
          </Row>
        </Card>
        <Card className="mt">
          <div className={style.second}>
            <div class={style.headinfo}>
              <span>我的待办</span>
              <p>8个任务</p>
            </div>
            <div class={style.headinfo}>
              <span>本周任务平均处理时间</span>
              <p>30分钟</p>
            </div>
            <div class={style.headinfo}>
              <span>本周对接学员数</span>
              <p>33个</p>
            </div>
          </div>
        </Card>
        <Row className="mt" gutter={18}>
           <Col span={18}>
              <Card>
                   <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
              </Card>
           </Col>
           <Col span={6}></Col>
        </Row>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    res: state,
  }),
  {
    loginAction,
  }
)(Index);
