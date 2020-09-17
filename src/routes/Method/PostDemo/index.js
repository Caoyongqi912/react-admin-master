import React from "react";
import axios from "axios";
import {
  Card,
  Alert,
  Divider,
  Select,
  Steps,
  Input,
  Button,
  Form,
  Icon,
  BackTop,
} from "antd";
import { inject, observer } from "mobx-react";
import ".././css/formDeni2.css";
import { digitUppercase } from "../../../utils/utils";
import TypingCard from "../../../components/TypingCard";

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

  componentWillMount = () => {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="stepForm" hideRequiredMark>
          <Form.Item {...formItemLayout} label="Project">
            {/* <Input.Group compact> */}
            <Select style={{ width: "100%" }} onChange={console.log('err')}>
            </Select>
            {getFieldDecorator("Project", {
              initialValue: "",
              rules: [{ required: true, message: "选择项目" }],
            })}
            {/* </Input.Group> */}
          </Form.Item>

          <Form.Item {...formItemLayout} label="methName">
            {getFieldDecorator("methName", {
              initialValue: "",
              rules: [{ required: true, message: "请输如方法名姓名" }],
            })(<Input placeholder="请输入收款人姓名" />)}
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
  state = {
    loading: false,
  };
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        setTimeout(() => {
          this.setState({
            loading: false,
          });
          this.props.stepFormStore.setCurrent(2);
        }, 2000);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="stepForm" hideRequiredMark>
          <Form.Item {...formItemLayout} label="Project">
            <Input.Group compact>
              <Select
                defaultValue="alipay"
                style={{ width: "calc(100% - 100px)" }}
              >
                <Option value="alipay">1</Option>
                <Option value="bank">11</Option>
              </Select>
              {getFieldDecorator("Project", {
                initialValue: "",
                rules: [{ required: true, message: "选择项目" }],
              })}
            </Input.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label="methName">
            {getFieldDecorator("methName", {
              initialValue: "",
              rules: [{ required: true, message: "请输如方法名姓名" }],
            })(<Input placeholder="请输入收款人姓名" />)}
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
@observer
class MethodPost extends React.Component {
  showStep = () => {
    switch (this.props.stepFormStore.current) {
      case 1:
        return <StepTwo />;
      default:
        return <StepOne />;
    }
  };
  render() {
    return (
      <div>
        <Card title="分步表单" bordered={false} style={{ minHeight: 600 }}>
          <Steps
            style={styles.steps}
            current={this.props.stepFormStore.current}
          >
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
  steps: {
    maxWidth: 750,
    margin: "16px auto",
  },
  desc: {
    padding: "0 56px",
  },
};

export default MethodPost;
