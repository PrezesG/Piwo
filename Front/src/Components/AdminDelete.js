import React, {useEffect, useState} from "react";
import {fetchBeers} from "./api";
import BCardAdmin from "./BCardAdmin";
const AdminDelete = () => {
    const [selectedFilter, setSelectedFilter] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('name');
    const [beers, setBeers] = useState([]); // Add this line
    const [filteredBeers, setFilteredBeers] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [isPriceFilter, setIsPriceFilter] = useState(false);


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
            result = result.filter(beer => beer[filter].toLowerCase().includes(searchTerm.toLowerCase()));
        }

        result = result.filter(beer => beer.price >= minPrice && beer.price <= maxPrice);

        setFilteredBeers(result);
    };

    return (
        <div className="home flex flex-col items-center justify-center  h-256">
            <div className="search-container flex flex-col items-center w-full h-256 ">
                <div className="join mt-8 w-5/6">
                    <div className="w-full">
                        <div>

                            {isPriceFilter && (
                                <div>
                                    <input type="number" className="input input-bordered join-item w-1/2" placeholder="Min Price"
                                           onChange={event => setMinPrice(event.target.value)}/>
                                    <input type="number" className="input input-bordered join-item w-1/2" placeholder="Max Price"
                                           onChange={event => setMaxPrice(event.target.value)}/>
                                </div>
                            )}
                            {!isPriceFilter && (
                                <input className="input input-bordered join-item w-full" placeholder="Search"
                                       onChange={handleSearchChange}/>
                            )}
                        </div>
                    </div>
                    <select className="select select-bordered join-item" value={selectedFilter}
                            onChange={handleFilterChange}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="description">Description</option>
                    </select>
                    <div className="indicator">
                        <button className="btn join-item select-bordered " onClick={handleSearch}>Search
                        </button>
                    </div>
                </div>
                <div className=" w-5/6 flex flex-wrap justify-center  items-start
                    align-stretch  mb-8 p-8 border-4 border-gray-300 rounded-lg overflow-y-auto  ">
                    <BCardAdmin beers={filteredBeers} setBeers={setBeers} theme="dark"/>
                </div>
            </div>
        </div>

    );
}
export default AdminDelete;