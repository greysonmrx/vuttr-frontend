import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';

import { Container, Button } from './styles';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: LoginFormData) {
    setLoading(true);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Enter a valid email'),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn(data);

      setLoading(false);

      history.push('/tools');
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'An error just happened!',
        description:
          err.response?.data.message ||
          'An error just happened during the request. Please try again.',
      });
    }
  }

  return (
    <Container>
      <h1>VUTTR - Frontend 2</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          required
          label="Email address"
          placeholder="Enter your email"
        />
        <Input
          name="password"
          required
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </Form>
      <Link to="/register">Create new account</Link>
    </Container>
  );
};

export default Login;
