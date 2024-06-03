import React, { useEffect, useState } from 'react';
import {fetchFavoriteBeers} from './api';
import FavoriteCard from "./FavoriteCard";

const UserFavorites = () => {
    const [beers, setBeers] = useState([]);

    useEffect(() => {
        fetchFavoriteBeers()
            .then(beers => {
                setBeers(beers);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="home flex flex-col h-256">
            <div className="container-with-beer-cards w-full flex flex-wrap justify-start items-center
                align-stretch mb-8 p-8 overflow-y-auto">
                {beers.map((beer) => (
                    <FavoriteCard key={beer.beerId} beer={beer} />
                ))}
            </div>
        </div>
    );
};

export default UserFavorites;