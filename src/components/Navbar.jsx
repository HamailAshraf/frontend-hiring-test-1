import {Logout} from '../components/LogOut';
import '../styles/Navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar">
      <img className='img' src="../design-files/TT Logo.png" alt="Turing Technologies Logo" />
      <Logout />
    </div>
  );
};
