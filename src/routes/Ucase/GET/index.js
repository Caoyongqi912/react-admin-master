import React from 'react';
import { Card, notification, Table, BackTop } from "antd";
import http from "../../../utils/request.js";



class uCase extends React.Component{
    constructor(props){
        super(props);
        this.Titles = [
            {
              title: "ID",
              dataIndex: "id",
              render: (text) => <a>{text}</a>,
            },
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "creator",
              dataIndex: "creator",
            },
            {
                title: "desc",
                dataIndex: "desc",
            },
            {
            title: "headless",
            dataIndex: "headless",
            },
            {
            title: "windowsSize",
            dataIndex: "windowsSize",
            },
            {
              title: "opt",
              render: (text, record) => (
                <span>
                  <a onClick={() => this.onclick(record.id)}>Delete</a>
                </span>
              ),
            },
        ];
        this.DETAIL = [
            {
                title: "step",
                dataIndex: "id",
                render: (text) => <a>{text}</a>,
            },
            {
                title: "name",
                dataIndex: "name",
            },
            {
                title: "desc",
                dataIndex: "desc",
                render: (text) => <p>{text}</p>,

            },
            {
                title: "methodID",
                dataIndex: "methodId",
                render: (text) => <a>{text}</a>,
            },
            {
                title: "do",
                dataIndex: "do",
            },
            {
                title: "type",
                dataIndex: "type",
            },
            {
                title: "locator",
                dataIndex: "locator",
            },
            {
                title: "value",
                dataIndex: "value",
            },
            {
                title: "validate",
                dataIndex: "validate",
                width:"10%"
            },
            {
                title: "variable",
                dataIndex: "variable",
            },
        ];
        this.state = {
            caseInfo:[]
        }
    }
    openNotificationType(type, msg) {
        notification[type]({
          message: msg,
        });
      }
    onclick = (id) => {
        const data = { caseId: id };
        new Promise(() => {
          http("del", "/uCaseOpt", data).then((res) => {
            if (res.code === 0) {
              this.openNotificationType("success", res.data.msg);
              const arr = this.state.caseInfo.slice();
              console.log(arr)
              this.setState({
                caseInfo: arr.filter((item) => item.id !== id),
              });
            } else {
              this.openNotificationType("error", res.data.msg);
            }
          });
        });
      };
    componentDidMount = () => {
        new Promise(() => {
          http("get", "/uCaseOpt",{steps:true}).then((res) => {    
            this.setState({ caseInfo: res.data });
          });
        });
      };
    expandedRowRender = (expandedRows) => {
    return <Table dataSource={expandedRows.steps} columns={this.DETAIL} pagination={false} bordered={false} />
    }
    render() {
    return (
        <div>
        <Card
        bordered={false}
        title="用例"
        style={{ marginBottom: 10 }}
        id="basicUsage">
        <Table
        dataSource={this.state.caseInfo}
        columns={this.Titles}
        style={styles.tableStyle}
        expandedRowRender={this.expandedRowRender}
        />
        </Card>
        <BackTop visibilityHeight={200} style={{ right: 50 }} />
        </div>
    );
    }
    
   
}

const styles = {
    tableStyle: {
      width: "100%",
    },
    affixBox: {
      position: "absolute",
      top: 100,
      right: 50,
      with: 170,
    },
  };
export default uCase