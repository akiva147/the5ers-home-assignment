import { userService } from '../../services/user.service';
import { Form } from '../../components/Form';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { User } from '../../schemas/user.schema';
import { defaultRoute } from '../../constants/routes.const';

export interface LoginPageProps {}

export const LoginPage = (props: LoginPageProps) => {
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const response = await userService.login(data.email, data.password);

      localStorage.setItem('token', response);
      navigate(defaultRoute);
    } catch (error) {
      message.error({
        content:
          "Please check your credentials. If you don't hane an account, please signup.",
        key: 'login-error',
      });
      console.error('Login failed', error);
    }
  };

  return <Form onSubmit={onSubmit} variant="login" />;
};
