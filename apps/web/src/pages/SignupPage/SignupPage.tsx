import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form';
import { User } from '../../schemas/user.schema';
import { message } from 'antd';
import { authService } from '../../services/auth.service';

export interface SignupPageProps {}

export const SignupPage = (props: SignupPageProps) => {
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      await authService.signup(data.email, data.password);
      navigate('/login');
    } catch (error) {
      message.error({
        content: 'Singup failed. Please check if the user already exist.',
      });
      console.error('Signup failed', error);
    }
  };

  return <Form onSubmit={onSubmit} variant="signup" />;
};
