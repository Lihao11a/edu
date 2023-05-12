import React, { Component } from "react";
import { Row, Col, Card, Tabs, Timeline } from "antd";
import style from "../main/Index.module.css";
import { Avatar, List } from "antd";
import * as echarts from "echarts";
import TimelineItem from "antd/lib/timeline/TimelineItem";
const { TabPane } = Tabs;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
export default class Index extends Component {
  drawBar = () => {
    var myChart = echarts.init(this.myRef);
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  };
  drawLine = () => {
    var myChart = echarts.init(this.myRef2);
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  };
  
  drawpie = () => {
    var myChart = echarts.init(this.myRef3);
    myChart.setOption({
      title: {
       
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: "销量",
          type: "pie",
          radius: '50%',
          data: 
          [ { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        }
      ],
    })
  }
  componentDidMount() {
    //绘制柱形图
    this.drawBar();
    this.drawpie()
  }
  callback = (key)=>{
      if(key==2){
        setTimeout(()=>{
           this.drawLine()
        },0)
      }

  }
  state = {
    list: [
      {
        cont: "王刚结算了一门课程",
        time: "操作时间 2020-09-18",
        color: "red",
      },
    ],
  };
  render() {
    return (
      <div>
        <div className={style.left}>
          <Row type="flex" justify="space-between">
            <Col span={6}>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
          
        </div>
        <div className={style.left}>
          <Card style={{ width: 1265 }}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="销售额" key="1">
                <Row>
                  <Col span={16}>
                    <div
                      className={style.panel}
                      ref={(a) => (this.myRef = a)}
                    ></div>
                  </Col>
                  <Col span={8}>
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={
                              <a href="https://ant.design">{item.title}</a>
                            }
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                          />
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="访问量" key="2" forceRender={true} >
                <Col span={16}>
                  <div
                    className={style.panel}
                    ref={(a) => (this.myRef2 = a)}
                  ></div>
                </Col>
                <Col span={8}></Col>
              </TabPane>
            </Tabs>
          </Card>
          <Row className="mt" gutter={15}>
            <Col span={12}>
              <Card title="操作状态">
                <Timeline>
                  {this.state.list.map((item, index) => {
                    return (
                      <Timeline.Item color={item.color} key={index}>
                        <p>{item.cont}</p>
                        <p>{item.time}</p>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              </Card>
            </Col>
            <Col span={12}>
              <Card title='销售占比'>
                    <div className={style.panel} ref={(a) => (this.myRef3 = a)}></div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
