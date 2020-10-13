import React from "react";
import http from "../../../utils/request.js";
import { Table, Button, Input,notification, Form, Modal } from "antd";
import { inject, observer } from "mobx-react";

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@inject("appStore")
@inject("stepFormStore")
@Form.create()
@observer
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.TITLES = [
      {
        title: "ID",
        dataIndex: "id",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Name",
        dataIndex: "project_name",
      },
      {
        title: "Desc",
        dataIndex: "project_desc",
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
    this.state = {
      projects: [],
      visible: false,
      confirmLoading: false,
    };
  }

  componentDidMount = () => {
    new Promise(() => {
      http("get", "/projectOpt").then((res) => {
        let projectList = res.data;
        for (let index = 0; index < projectList.length; index++) {
          projectList[index]["key"] = index;
        }
        this.setState({ projects: res.data });
      });
    });
  };

  onclick = (id) => {
    const data = { projectId: id };
    new Promise(() => {
      http("del", "/projectOpt", data).then((res) => {
        let resp = res.data;
        if (resp.code === 0) {
          this.openNotificationType("success", resp.msg);
          const arr = this.state.projects.slice();
          this.setState({
            projects: arr.filter((item) => item.id !== id),
          });
        } else {
          this.openNotificationType("error", resp.msg);
        }
      });
    });
  };
  openNotificationType(type, msg) {
    notification[type]({
      message: msg,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      new Promise(() => {
        http("post", "/projectOpt", values).then((res) => {
          console.log(res.data)
          let resp = res.data;
          if (resp.code === 0) {
            this.setState({
              confirmLoading: true,
            });
            setTimeout(() => {
              this.setState({
                visible: false,
                confirmLoading: false,
              });
            }, 2000);
            this.openNotificationType("success", resp.msg);

          } else {
            this.openNotificationType("error", resp.msg);
          }
        });
      });
    });
   
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="projectList">
        <Button type="primary" onClick={this.showModal}>
          add
        </Button>
        <Table
          dataSource={this.state.projects}
          columns={this.TITLES}
          style={styles.tableStyle}
        />
        <Modal
          title="createProject"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form className="projectForm" hideRequiredMark>
            <Form.Item {...formItemLayout} label="项目名">
              {getFieldDecorator("projectName", {
                initialValue: "",
                rules: [{ required: true, message: "send projectName" }],
              })(<Input placeholder="send projectName" />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="项目描述">
              {getFieldDecorator("projectDesc", {
                initialValue: "",
              })(<Input placeholder="send projectDesc" />)}
            </Form.Item>
          </Form>
        </Modal>
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
export default Project;
