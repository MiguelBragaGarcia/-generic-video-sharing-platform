import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Container } from './styles';
import Input from '../../components/Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('password/forgot', {
        email: data.email,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Recuperar senha</h1>
        <Input
          name="email"
          icon={FiMail}
          placeholder="Digite seu e-mail"
          type="text"
        />

        <button type="submit">Recuperar</button>
      </Form>

      <Link to="signin">
        <FiChevronLeft size={24} />
        Voltar para login
      </Link>
    </Container>
  );
};

export default ForgotPassword;
