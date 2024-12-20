import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

// https://tympanus.net/codrops/2024/11/18/how-to-create-a-gooey-search-interaction-with-framer-motion-and-react/

export const Form = styled.form``;

export const Button = styled.button``;

const Input = styled.input``;

export default function SearchForm() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate(`/search/${data.query}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('query')} />
      {errors.exampleRequired && <p>This field is required</p>}
      <Button type='submit'>Submit</Button>
    </Form>
  );
}
