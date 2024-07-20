import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import Axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { setToken } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post('https://frontend-test-api.aircall.dev/auth/login', data);
      setToken(response.data.access_token);
      localStorage.setItem('token', JSON.stringify(response.data.access_token));
      navigate('/home');
    } catch (error) {
      setErrorMessage('Wrong User Name or Password');
      console.error('Error Logging in: ', error);
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="../design-files/TT Logo.png" alt="Turing Technologies Logo" />
      </div>
      <div>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <label className='label'>User Name</label>
          <input className='input' placeholder="Email" type="text" {...register("username", { required: true })} />
          <label className='label'>Password</label>
          <input className='input' placeholder="Password" type="password" {...register("password", { required: true })} />
          <button className='button' type="submit">Log in</button>
        </form>
        {errorMessage && <h1 className="error-message">{errorMessage}</h1>}
      </div>
    </div>
  );
};

export default Login;
