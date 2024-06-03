import React, { useState } from 'react';
import { addBeers } from './api';

const AdminCreate = () => {
    const [name, setName] = useState('');
    const [producer, setProducer] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [alcohol, setAlcohol] = useState(0);
    const [price, setPrice] = useState(0);
    const [alert, setAlert] = useState(null);
    const [alertType, setAlertType] = useState('');
    const placeholderImage = 'https://via.placeholder.com/320'; // Placeholder image URL

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(placeholderImage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const beerData = {
            name,
            producer,
            description,
            image: image || placeholderImage,
            alcohol,
            price
        };

        try {
            const response = await addBeers(beerData);
            console.log(response);
            setAlert('Beer successfully created!');
            setAlertType('success');
        } catch (error) {
            console.error('Error adding beer', error);
            setAlert('Error creating beer: ' + error.message);
            setAlertType('error');
        }
    };

    return (
        <form className="max-w-sm mx-auto border-4 rounded-lg p-4 mt-20" onSubmit={handleSubmit}>
            {alert && (
                <div className={`alert alert-${alertType}`}>
                    {alert}
                </div>
            )}
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Producer</label>
                <input type="text" value={producer} onChange={(e) => setProducer(e.target.value)} required
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image</label>
                <input type="file" onChange={handleImageChange}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Alcohol (%)</label>
                <input type="number" value={alcohol} onChange={(e) => setAlcohol(e.target.value)} required min="0"
                       max="96"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <button type="submit" className="btn rounded-b-btn">Add Beer</button>
        </form>
    );
};

export default AdminCreate;