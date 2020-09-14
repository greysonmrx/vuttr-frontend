import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';

import { Container, Button } from './styles';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: RegisterFormData) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Enter a valid emails'),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      addToast({
        type: 'success',
        title: 'This was a complete success!',
        description:
          'Congratulations! User successfully created. You can now login to VUTTR.',
      });

      history.push('/');
    } catch (err) {
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
      <h1>VUTTR</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          required
          label="Full name"
          placeholder="Enter your name"
        />
        <Input
          name="email"
          required
          label="Email address"
          placeholder="Entre your email"
        />
        <Input
          name="password"
          required
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <Button type="submit">Register</Button>
      </Form>
      <Link to="/">Back to login</Link>
    </Container>
  );
};

export default Register;
