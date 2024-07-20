import { useState, useEffect, useContext } from 'react';
import { Popup } from './Popup';
import { useAxios } from '../customhooks/useAxios';
import { Table } from './Table';
import { UserContext } from '../context/UserContext';
import { getSearch } from '../Search/Search';
import { useForm } from 'react-hook-form';
import Axios from 'axios'; 
import "../styles/All.css";

export const UnArchived = () => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(10); 
    const [totalCount, setTotalCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const axiosInstance = useAxios(); 
    const { token } = useContext(UserContext);
    const { register, handleSubmit } = useForm();

    const fetchData = async (offset, limit) => {
        try {
            const response = await axiosInstance.get(`/calls?offset=${offset}&limit=${limit}`);
            setData(response.data.nodes);
            setTotalCount(response.data.totalCount);
            setHasNextPage(response.data.hasNextPage);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const unarchivedData = data.filter(call => !call.is_archived);
    console.log(unarchivedData);
    const handleSearch = async (formData) => {
        try {
            if (!formData.id || formData.id.length < 3) {
                fetchData(); 
                return;
            }
            const userData = await getSearch(formData.id, token);
    
            if (userData) {
                setData([userData]);
            } else {
                setData([]);
            }
        } catch (error) {
            console.log("Error fetching user: ", error.message);
        }
    };

    const handleArchiveToggle = async (user) => {
        try {
            const response = await Axios.put(
                `https://frontend-test-api.aircall.dev/calls/${user.id}/archive`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Archive/Unarchive Response:', response.data);
            setData(prevData =>
                prevData.map(call => (call.id === response.data.id ? response.data : call))
            );

        } catch (error) {
            console.error('Error archiving/unarchiving call:', error.message);
        }
    };

    useEffect(() => {
        fetchData(offset, limit);
    }, [offset, limit]);

    const handlePageChange = (newOffset) => {
        setOffset(newOffset);
    };

    const handleAddNoteClick = (user) => {
        setSelectedUser(user);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedUser(null);
    };

    const handleNoteAdded = (updatedUser) => {
        setData(prevData =>
            prevData.map(user => (user.id === updatedUser.id ? updatedUser : user))
        );
    };

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 10;
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const getDisplayedRange = () => {
        const start = offset + 1;
        const end = Math.min(offset + limit, totalCount);
        return `${start}-${end} of ${totalCount} results`;
    };

    return (
        <div>
            <form className="search-form" onChange={handleSubmit(handleSearch)}>
                <input className="search-input" placeholder='Search By Id' type="text" {...register("id")} />
            </form>
            <Table
                data={unarchivedData}
                onAddNoteClick={handleAddNoteClick}
                onArchiveToggle={handleArchiveToggle}
            />
            <div className='pagination-container'>
                <button className="pagination-button" onClick={() => handlePageChange(offset - limit)} disabled={offset === 0}>&lt;</button>
                <div className='pagination-numbers'>
                {getPageNumbers().map(page => (
                    <button
                        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                        key={page}
                        onClick={() => handlePageChange((page - 1) * limit)}
                        style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
                    >
                        {page}
                    </button>
                ))}
                </div>
                <button className="pagination-button" onClick={() => handlePageChange(offset + limit)} disabled={!hasNextPage}>&gt;</button>
            </div>
            <div className="pagination-range">
                {getDisplayedRange()}
            </div>
            {showPopup && selectedUser && (
                <Popup user={selectedUser} onClose={closePopup} onNoteAdded={handleNoteAdded} />
            )}
        </div>
    );
};

        