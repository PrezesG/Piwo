import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from './api';
const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Add this line

    useEffect(() => {
        const getUsersAndCheckAdminStatus = async () => {
            const fetchedUsers = await fetchUsers();
            const nonAdminUsers = fetchedUsers.filter(user => user.name !== 'admin');
            setUsers(nonAdminUsers);
        };

        getUsersAndCheckAdminStatus();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            setShowDialog(true); // Add this line
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const closeDialog = () => {
        setShowDialog(false); // Add this line
    };

    return (
        <div>
            <div className="container-with-beer-cards w-full flex flex-wrap justify-start items-center
                align-stretch  mb-8 p-8  overflow-y-auto  ">
                <div className="grid grid-cols-3 gap-4">
                    {users.map(user => (
                        <div key={user.id} className="card bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-96">
                            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                            <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
                            <button onClick={() => handleDelete(user.id)} className="mt-4 btn btn-red">Delete</button>
                        </div>
                    ))}
                </div>

            </div>

            {showDialog && (
                <dialog id="my_modal_1" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">User deleted successfully.</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={closeDialog}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}

        </div>
    );
};

export default AdminUsers;