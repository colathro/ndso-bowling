import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Layout } from "antd";
const { Header, Footer, Content } = Layout;

const { Title } = Typography;

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Layout role="main">
      <Layout id="login">
        <Content>
          <Title level={2}>
            welcome to the North Dakota Special Olympics bowling app.
          </Title>
          <Title level={3}>login to get started.</Title>
          <Button
            type="primary"
            size="large"
            onClick={() => loginWithRedirect()}
          >
            Login or Register
          </Button>
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default Login;
