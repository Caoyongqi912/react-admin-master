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
        title: "body",
        render: (text, record) => (
          <span>
            <a className="ant-dropdown-link" onClick={() => {}}>
              detail <Icon type="down" />
            </a>
            <Divider type="vertical" />
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
    };
  }

  onclick = (id) => {
    const data = { methodId: id };
    new Promise(() => {
      http("del", "/methodOpt", data).then((res) => {
        if (res.code === 1) {
          this.openNotificationType("success", res.msg);
          const arr = this.state.resData.slice();
          this.setState({
            resData: arr.filter((item) => item.id !== id),
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
        console.log(res.data);
        this.setState({ info: res.data });
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
            expandedRowRender={(record) => <Table columns={this.DETAIL}  dataSource={this.state.info.body}/>}
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
