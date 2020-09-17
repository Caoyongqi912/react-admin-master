import React from "react";
import axios from "axios";
import { Card, Icon, Table, Divider, BackTop } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import TypingCard from "../../../components/TypingCard";

const columns = [
  { title: "ID", dataIndex: "id", key: "id", render: (text) => <a>{text}</a> },
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
        <a className="ant-dropdown-link">
          detail <Icon type="down" />
        </a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

class Method extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: [],
    };
  }

  componentWillMount() {
    let url = "http://127.0.0.1:5000/api/methodOpt";
    axios
      .get(url)
      .then((response) => {
        const result = response.data.data;

        console.log(result);
        this.setState({ resData: result });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <CustomBreadcrumb arr={["方法"]} />
        <TypingCard source={"可使用的方法"} title="方法" />
        <Card bordered={false} title="method" style={{ marginBottom: 10 }}  id="basicUsage">
          <Table dataSource={this.state.resData} columns={columns}style={styles.tableStyle}/>
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
