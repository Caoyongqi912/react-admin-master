import React from "react";
import {
  Card,
  Table,
  Divider,
  Select,
  Steps,
  Icon,
  Button,
  Form,
  BackTop,
  Popconfirm,
  Input,
} from "antd";
import { inject, observer } from "mobx-react";
import ".././css/formDeni2.css";
import http from "../../../utils/request.js";

const { Step } = Steps;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    offset: 5,
  },
};
const selectOpt = (
  <Select placeholder="choice do" bordered>
    <Option value="get">get</Option>
    <Option value="click">click</Option>
    <Option value="send_keys">send_keys</Option>
    <Option value="get_text">get_text</Option>
    <Option value="get_title">get_title</Option>
    <Option value="get_url">get_url</Option>
    <Option value="clear">clear</Option>
    <Option value="action_click">action_click</Option>
    <Option value="action_send_keys">action_send_keys</Option>
    <Option value="go_back">go_back</Option>
    <Option value="switch_window">switch_window</Option>
    <Option value="screenshot">screenshot</Option>
    <Option value="js">js</Option>
    <Option value="sleep">sleep</Option>
  </Select>
);

@inject("appStore")
@inject("stepFormStore")
@Form.create()
@observer
class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
    };
  }
  componentDidMount = () => {
    new Promise(() => {
      http("get", "/projectOpt").then((res) => {
        this.setState({ projectData: res.data });
      });
    });
  };

  nextStep = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.stepFormStore.setInfo(values);
        this.props.stepFormStore.setCurrent(1);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="stepForm" hideRequiredMark>
          <Form.Item {...formItemLayout} label="Project">
            {getFieldDecorator("ProjectId", {
              initialValue: "",
              rules: [{ required: true, message: "选择项目" }],
            })(
              <Select style={{ width: "100%" }} placeholder="选择项目">
                {this.state.projectData.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.project_name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="methodName">
            {getFieldDecorator("methodName", {
              initialValue: "",
              rules: [{ required: true, message: "请输如方法名姓名" }],
            })(<Input placeholder="请输如方法名姓名" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="methodDesc">
            {getFieldDecorator("methodDesc", {
              initialValue: "",
            })(<Input placeholder="请输入详情" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" onClick={this.nextStep}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <BackTop visibilityHeight={200} style={{ right: 50 }} />
      </div>
    );
  }
}


@inject("stepFormStore")
@Form.create()
@observer
class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    const { getFieldDecorator } = this.props.form;

    this.Titles = [
      {
        title: "id",
        dataIndex: "id",
        render: (text, record, index) => (
          <Form.Item key={index}>
            {getFieldDecorator(`methodBody[${index}].id`, {
              initialValue: index,
            })(<Input disabled />)}
          </Form.Item>
        ),
      },
      {
        title: "name",
        dataIndex: "name",
        render: (text, record, index) => (
          <Form.Item key={index}>
            {getFieldDecorator(`methodBody[${index}].name`, {
              initialValue: "",
              rules: [{ required: true, message: "name cannot be empty" }],
            })(<Input placeholder="plase send name" />)}
          </Form.Item>
        ),
      },
      {
        title: "desc",
        dataIndex: "desc",
        render: (text, record, index) => (
          <Form.Item key={index}>
            {getFieldDecorator(`methodBody[${index}].desc`, {
              initialValue: "",
              rules: [{ required: false }],
            })(<Input placeholder="send desc" />)}
          </Form.Item>
        ),
      },
      {
        title: "do",
        dataIndex: "do",
        width: "10%",
        render: (itext, record, index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`methodBody[${index}].do`, {
              initialValue: "",
              rules: [{ required: true, message: "must choice do method" }],
            })(selectOpt)}
          </Form.Item>
        ),
      },
      {
        title: "type",
        dataIndex: "type",
        render: (text, record, index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`methodBody[${index}].type`, {
              initialValue: "",
              rules: [{ required: true, message: "type cannot be empty" }],
            })(<Input placeholder="send type" />)}
          </Form.Item>
        ),
      },
      {
        title: "locator",
        dataIndex: "locator",
        render: (text, record, index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`methodBody[${index}].locator`, {
              initialValue: "",
              rules: [{ required: true, message: "locator cannot be empty" }],
            })(<Input placeholder="send locator" />)}
          </Form.Item>
        ),
      },
      {
        title: "value",
        dataIndex: "value",
        render: (text, record, index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`methodBody[${index}].value`, {
              initialValue: "",
              rules: [{ required: false }],
            })(<Input placeholder="send value" />)}
          </Form.Item>
        ),
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          return this.state.steps.length > 0 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.onDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null;
        },
      },
    ];
    this.state = {
      loading: false,
      steps: [
        {
          key: 1,
          id: "",
          name: "",
          desc: "",
          do: "",
          locator: "",
          value: "",
          type: "",
        },
      ],
      count: 2,
    };
  }

  onDelete = (key) => {
    const arr = this.state.steps.slice();
    this.setState({
      steps: arr.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { steps, count } = this.state;
    const newData = {
      key: count,
      id:"",
      name: "",
      desc: "",
      do: "",
      locator: "",
      value: "",
    };
    this.setState({
      steps: [...steps, newData],
      count: count + 1,
    });
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      let methodData = {
        methodName: this.props.stepFormStore.info.methodName,
        methodDesc: this.props.stepFormStore.info.methodName,
        ProjectId: this.props.stepFormStore.info.ProjectId,
        methodBody: values,
      };

      new Promise(() => {
        http("post", "/methodOpt", methodData).then((res) => {
          console.log(res);
        });
      });

      if (!err) {
        this.setState({
          loading: true,
        });
        setTimeout(() => {
          this.setState({
            loading: false,
          });
          this.props.stepFormStore.setCurrent(1);
        }, 2000);
      }
    });
  };

  render() {
    return (
      <div>
        <hr />
        <p>
          <Button onClick={this.handleAdd}>添加行</Button>
        </p>
        <Form>
          <Form.Item>
            <Table
              style={styles}
              bordered
              dataSource={this.state.steps}
              columns={this.Titles}
            />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          onClick={this.handleSubmit}
          loading={this.state.loading}
        >
          提交
        </Button>
        <Button
          onClick={() => this.props.stepFormStore.setCurrent(0)}
          style={{ marginLeft: 8 }}
        >
          上一步
        </Button>
      </div>
    );
  }
}

@inject("stepFormStore")
@observer
class StepThree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="step3">
        <div>
          <div className="icon-box">
            <Icon type="check-circle" />
          </div>
          <div>
            <h3 className="success">操作成功</h3>
          </div>
          <Form className="result">
            <Form.Item>
              <Form.Item
                {...formItemLayout}
                className="setFormText"
                label="Project"
              >
                {this.props.stepFormStore.info.ProjectId}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                style={{ marginBottom: 18 }}
                label="Name"
              >
                {this.props.stepFormStore.info.methodName}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="setFormText"
                label="Desc"
              >
                {this.props.stepFormStore.info.methodDesc}
              </Form.Item>
            </Form.Item>
          </Form>
          <div>
            <Button
              type="primary"
              onClick={() => this.props.stepFormStore.setCurrent(0)}
            >
              再创建一个
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

@inject("stepFormStore")
@observer
class MethodPost extends React.Component {
  showStep = () => {
    switch (this.props.stepFormStore.current) {
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  };
  render() {
    return (
      <div>
        <Card title="分步表单" bordered={false} style={{ minHeight: 600 }}>
          <Steps style={styles} current={this.props.stepFormStore.current}>
            <Step title="填写基本信息" />
            <Step title="填写详细步骤" />
            <Step title="完成" />
          </Steps>
          <div>{this.showStep()}</div>
        </Card>
      </div>
    );
  }
}

const styles = {
  width: "100%",
};

export default MethodPost;
