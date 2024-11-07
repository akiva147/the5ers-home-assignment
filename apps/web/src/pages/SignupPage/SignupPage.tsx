import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form';
import { User } from '@the5ers-home-assignment/schemas';
import { message } from 'antd';
import { userService } from '../../services/user.service';

export interface SignupPageProps {}

export const SignupPage = (props: SignupPageProps) => {
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      await userService.signup(data);
      navigate('/login');
    } catch (error) {
      message.error({
        content: 'Singup failed. Please check if the user already exist.',
        key: 'signup-error',
      });
      console.error('Signup failed', error);
    }
  };

  return <Form onSubmit={onSubmit} variant="signup" />;
};
