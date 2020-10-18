import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Layout, Row, Col } from "antd";
const { Footer, Content } = Layout;

const { Title } = Typography;

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Layout role="main">
      <Content className="landing">
        <img src="images/inverted_ndso.png"></img>
        <img></img>
        <Title level={3} className="welcome">
          Welcome to the North Dakota Special Olympics bowling app.
        </Title>
        <Button type="primary" size="large" onClick={() => loginWithRedirect()}>
          Login or Register
        </Button>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Login;
