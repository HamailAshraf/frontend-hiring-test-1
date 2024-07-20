/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../styles/Table.css';

export const Table = ({ data, onAddNoteClick, onArchiveToggle }) => {
    const [loadingId, setLoadingId] = useState(null);

    const handleArchiveClick = async (user) => {
        setLoadingId(user.id);
        try {
            await onArchiveToggle(user);
        } catch (error) {
            console.error('Error archiving/unarchiving:', error.message);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th>CALL TYPE</th>
            <th>DIRECTION</th>
            <th>DURATION</th>
            <th>FROM</th>
            <th>TO</th>
            <th>VIA</th>
            <th>CREATED AT</th>
            <th>STATUS</th>
            <th>NOTES</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'odd' : 'even'}>
              <td>{capitalizeWords(user?.call_type)}</td>
              <td>{capitalizeWords(user?.direction)}</td>
              <td>{formatDuration(user?.duration)}</td>
              <td>{user?.from}</td>
              <td>{user?.to}</td>
              <td>{user?.via}</td>
              <td>{new Date(user?.created_at).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
              <td>
                <button
                  onClick={() => handleArchiveClick(user)}
                  disabled={loadingId === user.id}
                >
                  {user?.is_archived ? 'Archived' : 'Unarchived'}
                </button>
              </td>
              <td>
                {user.notes.map(note => (
                  <div key={note.id}>{note.content}</div>
                ))}
              </td>
              <td>
                <button onClick={() => onAddNoteClick(user)}>
                  Add Note
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

const formatDuration = (seconds) => {
    if (typeof seconds !== 'number' || seconds < 0) {
        return 'Invalid duration';
    }

    const minutes = Math.floor(seconds / 60); 
    const remainingSeconds = seconds % 60; 

    return `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''} (${seconds} seconds)`;
};

const capitalizeWords = (text) => {
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
