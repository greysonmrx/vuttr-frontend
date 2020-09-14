import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';

interface EditProfileFormData {
  name: string;
  email: string;
  current_password?: string;
  password?: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser, signOut } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleEditProfile = useCallback(
    async (data: EditProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Enter a valid email'),
          current_password: Yup.string(),
          password: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        const userData = data;

        if (!data.current_password || !data.password) {
          delete userData.current_password;
          delete userData.password;
        }

        const response = await api.put('/users', userData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'This was a complete success!',
          description: 'Congratulations! User successfully updated.',
        });
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
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <div>
        <header>
          <Link to="/tools">
            <MdKeyboardArrowLeft size={30} />
          </Link>
          <h2>Profile settings</h2>
        </header>
        <Form ref={formRef} onSubmit={handleEditProfile} initialData={user}>
          <Input
            name="name"
            placeholder="Enter your name"
            label="Full name"
            required
          />
          <Input
            name="email"
            placeholder="Enter your email"
            label="Email address"
            required
          />
          <hr />
          <Input
            name="current_password"
            placeholder="Enter the current password"
            label="Current password"
            type="password"
          />
          <Input
            name="password"
            placeholder="Enter the new password"
            label="New password"
            type="password"
          />
          <Button type="submit">Edit profile</Button>
          <Button buttonType="secondary" onClick={signOut}>
            Sign out
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Profile;
