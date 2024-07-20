import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/Navbar.css'; 

export const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <div className="logout">
      <button className='button' onClick={handleLogout}>Log Out</button>
    </div>
  );
};
