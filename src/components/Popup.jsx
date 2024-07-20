/* eslint-disable react/prop-types */

import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/PopUp.css';

export const Popup = ({ user, onClose, onNoteAdded }) => {
    const { register, handleSubmit } = useForm();
    const { token } = useContext(UserContext);

    const onSubmit = async (formData) => {
        try {
            const response = await Axios.post(
                `https://frontend-test-api.aircall.dev/calls/${user.id}/note`,
                { content: formData.note },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Response: ', response.data);
            console.log('Note Submitted');
            onNoteAdded(response.data); 
            onClose();
        } catch (error) {
            console.error("Error submitting note:", error.message);
            throw error;
        }
    };

    return (
        <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">Add Notes</h2>
        <button className="popup-close-button" onClick={onClose}>x</button>
        <h2 className="popup-text">Call ID {user.id}</h2>
        <p className="popup-text"><strong>Call Type:</strong> {user.call_type}</p>
        <p className="popup-text"><strong>Duration:</strong> {user.duration}</p>
        <p className="popup-text"><strong>From:</strong> {user.from}</p>
        <p className="popup-text"><strong>To:</strong> {user.to}</p>
        <p className="popup-text"><strong>Via:</strong> {user.via}</p>
        <h2 className="popup-subtitle">Notes</h2>
        <form className="popup-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="popup-input"
            placeholder="Add Notes"
            type="text"
            {...register("note")}
          />
          <button className="popup-submit-button" type="submit">Save</button>
        </form>
      </div>
    </div>
    );
};
