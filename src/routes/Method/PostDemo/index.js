import React from "react";
import axios from "axios";
import {
  Card,
  Table,
  Divider,
  Select,
  Steps,
  Button,
  Form,
  BackTop,
  Popconfirm,
  Input,
} from "antd";
import { inject, observer } from "mobx-react";
import ".././css/formDeni2.css";

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
    let url = "http://127.0.0.1:5000/api/projectOpt";
    axios
      .get(url)
      .then((response) => {
        const result = response.data.data;
        this.setState({ projectData: result });
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  nextStep = () => {
    this.props.form.validateFields((err, values) => {
      console.log(err);
      console.log(values);
      if (!err) {
        this.props.stepFormStore.setInfo(values);
        this.props.stepFormStore.setCurrent(1);
      }
    });
  };
  handleProjectChange = (value) => {
    console.log(value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="stepForm" hideRequiredMark>
          <Form.Item {...formItemLayout} label="Project">
            {getFieldDecorator("projectId", {
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
            {getFieldDecorator("methName", {
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

@inject("stepFormStore")
@Form.create()
@observer
class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    const { getFieldDecorator } = this.props.form;

    this.Titles = [
      {
        title: "name",
        dataIndex: "name",
        render: (text, record, index) => (
          <Form.Item key={index}>
            {getFieldDecorator(`method[${index}].name`, {
              initialValue: "",
              rules: [{ required: true, message: "name cannot be empty" }],
            })(<Input placeholder="plase send name" />)}
          </Form.Item>
        ),
      },
      {
        title: "desc",
        dataIndex: "desc",
        render: (text, record,index) => (
          <Form.Item key={index}>
            {getFieldDecorator(`method[${index}].desc`, {
              initialValue: "",
              rules: [{ required: false }],
            })(<Input placeholder="send desc" />)}
          </Form.Item>
        ),
      },
      {
        title: "method",
        dataIndex: "method",
        width: "8%",
        render: (text, record,index) => (
          <Form.Item key={index}>
            {getFieldDecorator(`method[${index}].method`, {
              initialValue: "",
              rules: [{ required: false }],
            })(
              <Select placeholder="Please select" allowClear bordered>
                {this.state.methods.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        ),
      },
      {
        title: "do",
        dataIndex: "do",
        width: "10%",

        render: (itext, record,index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`method[${index}].do`, {
              initialValue: "",
              rules: [{ required: true, message: "choice method" }],
            })(selectOpt)}
          </Form.Item>
        ),
      },
      {
        title: "type",
        dataIndex: "type",
        render: (text, record,index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`method[${index}].type`, {
              initialValue: "",
              rules: [{ required: true, message: "type cannot be empty" }],
            })(<Input placeholder="send type" />)}
          </Form.Item>
        ),
      },
      {
        title: "locator",
        dataIndex: "locator",
        render: (text, record,index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`method[${index}].locator`, {
              initialValue: "",
              rules: [{ required: true, message: "locator cannot be empty" }],
            })(<Input placeholder="send locator" />)}
          </Form.Item>
        ),
      },
      {
        title: "value",
        dataIndex: "value",
        render: (text, record,index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`method[${index}].value`, {
              initialValue: "",
              rules: [{ required: false }],
            })(<Input placeholder="send value" />)}
          </Form.Item>
        ),
      },
      {
        title: "data",
        dataIndex: "data",
        render: (text, record,index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`method[${index}].data`, {
              initialValue: "",
              rules: [{ required: false }],
            })(<Input placeholder="send data" />)}
          </Form.Item>
        ),
      },
      {
        title: "variable",
        dataIndex: "variable",
        render: (text, record,index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`method[${index}].variable`, {
              initialValue: "",
              rules: [{ required: false }],
            })(<Input placeholder="send variable" />)}
          </Form.Item>
        ),
      },
      {
        title: "validate",
        dataIndex: "validate",
        render: (text, record,index) => (
          <Form.Item {...formItemLayout} key={index}>
            {getFieldDecorator(`method[${index}].validate`, {
              initialValue: "",
              rules: [{ required: false }],
            })(<Input placeholder="send validate" />)}
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
      methods: [],
      steps: [
        {
          key: 1,
          name: "",
          desc: "",
          method: "",
          do: "",
          locator: "",
          value: "",
          type: "",
          data: "",
          variable: "",
          validate: "",
        },
      ],
      count: 2,
    };
  }

  componentWillMount = async () => {
    let res = await axios.get("http://127.0.0.1:5000/api/methodOpt");
    let data = res.data.data;
    this.setState({ methods: data });
  };

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
      name: "",
      desc: "",
      method: "",
      do: "",
      locator: "",
      value: "",
      type: "",
      data: "",
      variable: "",
      validate: "",
    };
    this.setState({
      steps: [...steps, newData],
      count: count + 1,
    });
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values);
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
    const {
      form: { getFieldDecorator },
      steps,
    } = this.props;
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
        return <StepTwo />;
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
