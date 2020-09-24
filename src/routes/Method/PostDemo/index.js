import React from "react";
import axios from "axios";
import {
  Card,
  Table,
  Divider,
  Select,
  Steps,
  Input,
  Button,
  Form,
  BackTop,
  Popconfirm,
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
  <Select placeholder="选择方法" style={{ width: "100%" }}>
    <option value="get">get</option>
    <option value="click">click</option>
    <option value="send_keys">send_keys</option>
    <option value="get_text">get_text</option>
    <option value="get_title">get_title</option>
    <option value="get_url">get_url</option>
    <option value="clear">clear</option>
    <option value="action_click">action_click</option>
    <option value="action_send_keys">action_send_keys</option>
    <option value="go_back">go_back</option>
    <option value="switch_window">switch_window</option>
    <option value="screenshot">screenshot</option>
    <option value="js">js</option>
    <option value="sleep">sleep</option>
  </Select>
);

@inject("stepFormStore")
@Form.create()
@observer
class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      loading: false,
      steps: [
        {
          key: 1,
          name: <Input placeholder="步骤名称" />,
          desc: <Input placeholder="步骤详情" />,
          is_method:result,
          do: selectOpt,
          locator: <Input placeholder="步骤元素" />,
          value: <Input placeholder="请求数据" />,
          type: <Input placeholder="元素类型" />,
          data: <Input placeholder="验证数据" />,
          variable: <Input placeholder="变量名称" />,
          validate: <Input placeholder="认证" />,
        },
      ],
      count: 2,
    };
    
  }
  
  componentDidMount = () => {
    let url = "http://127.0.0.1:5000/api/methodOpt";
    axios
      .get(url)
      .then((response) => {
        let result = response.data.data;

        // this.setState({ methodArr: result });
        // console.log(this.state.methodArr)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  Titles = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "desc",
      dataIndex: "desc",
    },
    {
      title: "is_method",
      dataIndex: "is_method",
      width: "5%",
    },
    {
      title: "do",
      dataIndex: "do",
      width: "9%",
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
      title: "data",
      dataIndex: "data",
    },
    {
      title: "variable",
      dataIndex: "variable",
    },

    {
      title: "validate",
      dataIndex: "validate",
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
      name: <Input placeholder="步骤名称" />,
      desc: <Input placeholder="步骤详情" />,
      is_method: <Input placeholder="使用方法" />,
      do: selectOpt,
      locator: <Input placeholder="步骤元素" />,
      value: <Input placeholder="请求数据" />,
      type: <Input placeholder="元素类型" />,
      data: <Input placeholder="验证数据" />,
      variable: <Input placeholder="变量名称" />,
      validate: <Input placeholder="认证" />,
    };
    this.setState({
      steps: [...steps, newData],
      count: count + 1,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <hr />
        <p>
          <Button onClick={this.handleAdd}>添加行</Button>
        </p>

        <Table
          style={styles}
          bordered
          dataSource={this.state.steps}
          columns={this.Titles}
        />

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
class MethodPost extends React.Component {
  showStep = () => {
    switch (this.props.stepFormStore.current) {
      case 1:
        return <StepTwo />;
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
