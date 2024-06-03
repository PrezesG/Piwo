import React, { useEffect, useState } from 'react';
import { deleteBeer } from './api';

const BCardAdmin = ({ beers, setBeers }) => {

    const handleDelete = async (id) => {
        try {
            await deleteBeer(id);
            const updatedBeers = beers.filter(beer => beer.beerId !== id);
            setBeers(updatedBeers);
        } catch (error) {
            console.error('Error deleting beer', error);
        }
    };

    if (!beers) {
        return <div>Loading...</div>;
    }

    if (beers.length === 0) {
        return <div>No matches found for your search.</div>;
    }

    return (
        <>
            {beers.map((beer) => (
                <div key={beer.beerId}
                     className="card w-96 h-160 overflow-hidden bg-base-200 shadow-2xl  rounded-3xl ms-4 mt-8">
                    <figure><img className="h-80" src={beer.image} alt={beer.name}/></figure>
                    <div className="card-body h-80">
                        <h2 className="card-title">{beer.name}</h2>
                        <p className="card-text">{beer.description}</p>
                        <p className="card-text"><strong>Price: </strong>${beer.price}</p>
                        <p className="card-text"><strong>Alcohol: </strong>%{beer.Alcohol}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleDelete(beer.beerId)} className="btn btn-primary">Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default BCardAdmin;