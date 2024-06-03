import React from 'react';
import { useNavigate } from 'react-router-dom';
const FavoriteCard = ({  beer }) => {
    const navigate = useNavigate();

    return (
        <div key={beer.beerId} className="card w-96 h-160 overflow-hidden bg-base-200 shadow-2xl  rounded-3xl ms-4 mt-8">
            <figure><img className="h-80" src={beer.image} alt={beer.name}/></figure>
            <div className="card-body h-80">
                <h2 className="card-title">{beer.name}</h2>
                <p className="card-text">{beer.description}</p>
                <p className="card-text"><strong>Alcohol: </strong>%{beer.alcohol}</p>
                <p className="card-text"><strong>Average
                    Rating: </strong>{beer.averageRating || 'Not rated yet'}</p>
            </div>
        </div>
    );
};

export default FavoriteCard;