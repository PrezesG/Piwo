import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchBeers } from './api';
import BeerCard from "./BeerCard";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const loginSuccess = location.state?.loginSuccess;
    const [selectedFilter, setSelectedFilter] = useState('name');
    const [isModalOpen, setIsModalOpen] = useState(false); // Add this line

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('name');
    const [beers, setBeers] = useState([]); // Add this line
    const [filteredbeers, setFilteredBeers] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [isPriceFilter, setIsPriceFilter] = useState(false);
    const [minAlcohol, setMinAlcohol] = useState(0);
    const [maxAlcohol, setMaxAlcohol] = useState(Infinity);

    useEffect(() => {
        if (loginSuccess && sessionStorage.getItem('alertShown') === 'false') {
            setIsModalOpen(true); // Open the modal when the user logs in
            sessionStorage.setItem('alertShown', 'true');

            // Close the modal after 3 seconds
            setTimeout(() => {
                setIsModalOpen(false);
            }, 3000);
        }
    }, [loginSuccess]);
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };
    useEffect(() => {
        fetchBeers()
            .then(beers => {
                setBeers(beers);
                setFilteredBeers(beers);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        setFilter(event.target.value);
        setIsPriceFilter(event.target.value === 'price');
    };


    const handleSearch = () => {
        let result = beers;

        if (searchTerm !== '') {
            if (filter === 'alcohol') {
                result = result.filter(beer => beer[filter] >= minAlcohol && beer[filter] <= maxAlcohol);
            } else {
                result = result.filter(beer => beer[filter].toString().toLowerCase().includes(searchTerm.toLowerCase()));
            }
        }

        if (isPriceFilter) {
            result = result.filter(beer => beer.price >= minPrice && beer.price <= maxPrice);
        }

        setFilteredBeers(result);
    };

    return (
        <>
            {!isLoggedIn && (
                <div className="hero h-256 bg-base-200">
                    <div className="hero-content text-center rounded-lg bg-white p-10 border-2 border-gray-300">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Hello there</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn rounded-2xl btn-default" onClick={() => navigate('/login')}>Login
                            </button>
                            <button className="btn rounded-2xl btn-default" onClick={() => navigate('/register')}>Register
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isLoggedIn && (
                <div className="home flex flex-col items-center justify-center  h-256">
                    <div className="search-container flex flex-col items-center w-full h-256 ">
                        {isModalOpen && (
                            <dialog id="my_modal_1" className="modal" open>
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Login successful. Welcome!</p>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn" onClick={closeModal}>Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        )}
                            <form className="join mt-8 w-5/6" onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}>
                                <div className="w-full">
                                    <div>
                                        {isPriceFilter && (
                                            <div>
                                                <input type="number" className="input input-bordered join-item w-1/2"
                                                       placeholder="Min Price"
                                                       onChange={event => setMinPrice(event.target.value)}/>
                                                <input type="number" className="input input-bordered join-item w-1/2"
                                                       placeholder="Max Price"
                                                       onChange={event => setMaxPrice(event.target.value)}/>
                                            </div>
                                        )}
                                        {filter === 'alcohol' && (
                                            <div>
                                                <input type="number" className="input input-bordered join-item w-1/2"
                                                       placeholder="Min %"
                                                       onChange={event => setMinAlcohol(event.target.value)}/>
                                                <input type="number" className="input input-bordered join-item w-1/2"
                                                       placeholder="Max %"
                                                       onChange={event => setMaxAlcohol(event.target.value)}/>
                                            </div>
                                        )}
                                        {!isPriceFilter && filter !== 'alcohol' && (
                                            <input className="input input-bordered join-item w-full"
                                                   placeholder="Search"
                                                   onChange={handleSearchChange}/>
                                        )}
                                    </div>
                                </div>
                                <select className="select select-bordered join-item" value={selectedFilter}
                                        onChange={handleFilterChange}>
                                    <option value="name">Name</option>
                                    <option value="price">Price</option>
                                    <option value="description">Description</option>
                                    <option value="alcohol">Alcohol</option>
                                </select>
                                <div className="indicator">
                                    <button className="btn join-item select-bordered " onClick={handleSearch}>Search
                                    </button>
                                </div>
                            </form>
                        <div className="container-with-beer-cards w-full flex flex-wrap justify-start items-center
                align-stretch  mb-8 p-8  overflow-y-auto  ">
                                {filteredbeers.map((beer) => (
                                    <BeerCard key={beer.beerId} beer={beer}/>))}
                            </div>
                    </div>
                </div>
                )}

        </>
    );
};
export default Home;
