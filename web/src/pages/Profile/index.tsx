import React, { useCallback, useRef, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  FiLock,
  FiUser,
  FiCamera,
  FiChevronLeft,
  FiPower,
  FiMail,
} from 'react-icons/fi';

import { FaUserCircle } from 'react-icons/fa';

import { useAuth } from '../../hooks/Auth';
import Input from '../../components/Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Header, Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { signOut, updateUser, user } = useAuth();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/user/avatar', data).then((response) => {
          updateUser(response.data);
        });
      }
    },
    [updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [updateUser, history],
  );

  return (
    <>
      <Container>
        <Header>
          <Link to="/">
            <FiChevronLeft size={30} />
          </Link>

          <button type="button" onClick={signOut}>
            <FiPower size={30} />
          </button>
        </Header>

        <Content>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >
            <AvatarInput>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <FaUserCircle />
              )}
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>
            <h1>Meu perfil</h1>

            <Input placeholder="Nome" name="name" icon={FiUser} type="text" />
            <Input
              placeholder="E-mail"
              name="email"
              icon={FiMail}
              type="text"
            />

            <Input
              placeholder="Sua senha atual"
              containerStyle={{ marginTop: 50 }}
              name="old_password"
              icon={FiLock}
              type="password"
            />
            <Input
              placeholder="Nova senha"
              name="password"
              icon={FiLock}
              type="password"
            />
            <Input
              placeholder="Confirmar senha"
              name="password_confirmation"
              icon={FiLock}
              type="password"
            />

            <button type="submit">Confirmar mudanças</button>
          </Form>
        </Content>
      </Container>
    </>
  );
};
export default Profile;
