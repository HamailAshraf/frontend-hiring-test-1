import { All } from '../components/All';
import { Archived } from '../components/Archived';
import { UnArchived } from '../components/UnArchived';
import { useState } from 'react';
import '../styles/DropDown.css';  // Import the CSS file

export const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('All');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case 'All':
        return <All />;
      case 'Archived':
        return <Archived />;
      case 'Unarchived':
        return <UnArchived />;
      default:
        return null;
    }
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedItem}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => handleSelect('All')}>All</div>
          <div className="dropdown-item" onClick={() => handleSelect('Archived')}>Archived</div>
          <div className="dropdown-item" onClick={() => handleSelect('Unarchived')}>Unarchived</div>
        </div>
      )}
      <div className="selected-item-content">
        {renderSelectedItem()}
      </div>
    </div>
  );
};
