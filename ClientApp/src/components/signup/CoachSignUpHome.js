import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import DataAccess from "../../utils/DataAccess";
import {
  Steps,
  Button,
  message,
  Row,
  Col,
  Typography,
  Form,
  Input,
  DatePicker,
  Checkbox,
} from "antd";
import FooterBar from "../ui/FooterBar";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
import moment from "moment";

const { Step } = Steps;
const { Text, Title } = Typography;

const steps = [
  {
    title: "First",
    content: (
      <div>
        <div className="herocontainer">
          <img
            className="heroimage"
            src="images/svg/undraw_positive_attitude_xaae.svg"
          ></img>
        </div>
        <Title>Welcome Coach!</Title>
        <Title level={4}>
          You are now signed in as a coach; but we have to tell you some things
          first!
        </Title>
      </div>
    ),
  },
  {
    title: "Second",
    content: (
      <div>
        <div className="herocontainer">
          <img
            className="heroimage"
            src="images/svg/undraw_web_devices_ad58.svg"
          ></img>
        </div>
        <Title level={4}>
          Register and manage as many athletes as you'd like!
        </Title>
        <div className="herocontainer">
          <img
            className="heroimage"
            src="images/svg/undraw_progress_overview_2dik.svg"
          ></img>
        </div>
        <Title level={4}>
          Log scores for your athletes, and see their progress over time!
        </Title>
      </div>
    ),
  },
  {
    title: "Last",
    content: <div></div>,
  },
];

class CoachSignUpHome extends Component {
  constructor(props) {
    super(props);

    let formRef = React.createRef();

    this.state = {
      current: 0,
      ref: formRef,
    };
    this.form = this.getForm();
  }

  handleSubmit = (e) => {
    console.log(e);
    DataAccess.putData(
      "api/coach/register",
      {
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        phoneNumber: e.phoneNumber,
        city: e.city,
        birthday: e.birthday?._d.toDateString(),
      },
      () => {
        DataAccess.RefetchPlayer();
      }
    );
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div id="signup">
        <Row justify="center">
          <Col>
            <Row align="middle" justify="center">
              {current < 2 && <Col>{steps[current].content}</Col>}
              {current === 2 && <Col>{this.form}</Col>}
            </Row>
            <Row justify="end" gutter={[16, 24]}>
              <Col>
                {current > 0 && !(current === steps.length - 1) && (
                  <Button
                    style={{ margin: "0 8px" }}
                    onClick={() => this.prev()}
                  >
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    Next
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="footer" justify="center">
          <Col>
            <Steps progressDot size="small" current={current}>
              {steps.map((item) => (
                <Step key={item.title} />
              ))}
            </Steps>
          </Col>
        </Row>
        <FooterBar />
      </div>
    );
  }

  getForm() {
    return (
      <div>
        <div className="herocontainer">
          <img
            className="heroimage"
            src="images/svg/undraw_finish_line_katerina_limpitsouni_xy20.svg"
          ></img>
          <Title level={4}>Lets setup your profile!</Title>
        </div>
        <Form size="middle" ref={this.state.ref} onFinish={this.handleSubmit}>
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="city">
            <Input prefix={<HomeOutlined />} placeholder="City" />
          </Form.Item>
          <Form.Item name="phoneNumber">
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item name="birthday">
            <DatePicker placeholder="Birthday" />
          </Form.Item>
          <Form.Item>
            <Row>
              <Col>
                <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                  Previous
                </Button>
              </Col>
              <Col offset={1}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CoachSignUpHome;
