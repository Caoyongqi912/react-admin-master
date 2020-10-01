import React from "react";
import { Card, Icon, notification, Table, Divider, BackTop } from "antd";
import http from "../../../utils/request.js";

class Method extends React.Component {
  constructor(props) {
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
        title: "name",
        dataIndex: "name",
      },
      {
        title: "desc",
        dataIndex: "desc",
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
    ];
    this.state = {
      info: [],
      body:[]
    };
  }

  onclick = (id) => {
    const data = { methodId: id };
    new Promise(() => {
      http("del", "/methodOpt", data).then((res) => {
        if (res.code === 1) {
          this.openNotificationType("success", res.msg);
          const arr = this.state.info.slice();
          this.setState({
            info: arr.filter((item) => item.id !== id),
          });
        } else {
          this.openNotificationType("error", res.err);
        }
      });
    });
  };

  openNotificationType(type, msg) {
    notification[type]({
      message: msg,
    });
  }

  componentDidMount = () => {
    new Promise(() => {
      http("get", "/methodOpt").then((res) => {
        let body = [];
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index].body;
          body.push(element)
        }

        this.setState({ info: res.data,body:body });
      });
    });
  };

  render() {
    return (
      <div>
        <Card
          bordered={false}
          title="method"
          style={{ marginBottom: 10 }}
          id="basicUsage"
        >
          <Table
            dataSource={this.state.info}
            columns={this.Titles}
            style={styles.tableStyle}
            expandedRowRender={(record) =>{console.log(record.id)} }
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

export default Method;
