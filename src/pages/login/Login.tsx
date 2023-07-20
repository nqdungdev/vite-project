import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { FieldErrors, useForm, Controller } from "react-hook-form";

import { object, string } from "yup";

export const schemaLogin = object({
  username: string().required("username is required!"),
  password: string().required("password is required!"),
});

const Login = () => {
  const { register, handleSubmit, control, formState, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaLogin),
  });

  const onSuccess = (values: any) => {
    console.log(values);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <Layout
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onFinish={handleSubmit(onSuccess, onError)}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input {...field} className="my-2" placeholder="Username *" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className="my-2"
                placeholder="Password *"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Login;
