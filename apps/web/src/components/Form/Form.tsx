import classes from './form.module.scss';
import { LoginUserSchema, User, UserSchema } from '../../schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'antd';
import { CustomInput } from '../../components/CustomFields/CustomInput';
import { defaultValues } from '../../constants/form.const';

export interface FormProps {
  variant: 'login' | 'signup';
  onSubmit: (data: User) => void;
}

export const Form = ({ variant, onSubmit }: FormProps) => {
  const methods = useForm<User>({
    resolver:
      variant === 'signup'
        ? zodResolver(UserSchema)
        : zodResolver(LoginUserSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const title = variant === 'login' ? 'Login' : 'Signup';

  return (
    <div className={classes.container}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <header>
            <h2>{title}</h2>
            <h5>{title} to continue</h5>
          </header>
          <main>
            {variant === 'signup' && (
              <CustomInput
                type="text"
                placeholder="Full Name"
                fieldName="fullName"
              />
            )}
            <CustomInput type="email" placeholder="Email" fieldName="email" />
            <CustomInput
              type="password"
              placeholder="Password"
              fieldName="password"
            />
          </main>
          <Button color="primary" variant="solid" htmlType="submit">
            {title}
          </Button>
        </form>
      </FormProvider>
      {variant === 'signup' ? (
        <span>
          Already have an account? <a href="/login">Login</a>
        </span>
      ) : (
        <span>
          Don't have an account? <a href="/signup">Signup</a>
        </span>
      )}
    </div>
  );
};
