import { Navbar } from '../components/Navbar';
import { DropDown } from '../components/DropDown';
import '../styles/Home.css';  // Import the CSS file

export const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div>
        <h1 className="home-title">Turing Technologies Frontend Test</h1>
      </div>
      <div className="filter-container">
        {/* <p className="filter-text">Filter by:</p> */}
        <DropDown />
      </div>
    </div>
  );
};
