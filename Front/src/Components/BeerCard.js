import React, { useEffect, useState } from 'react';
import {addToFavourites, fetchFavoriteBeers, rateBeer} from "./api";
import {useNavigate} from "react-router-dom";
const BeerCard = ({ beer }) => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false); // Add this line
    const [isRated, setIsRated] = useState(false);


    if (!beer) {
        return <div>Loading...</div>;
    }

    if (beer.length === 0) {
        return <div>No matches found for your search.</div>;
    }
    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleRatingSubmit = async (event) => {
        event.preventDefault();
        try {
            await rateBeer(beer.beerId, rating);
            setMessage('Beer rated successfully');
            setIsRated(true); // Add this line
        } catch (error) {
            console.error('Error rating beer', error);
            setMessage('Error rating beer');
        }
    };

    const handleFavouriteClick = async () => {
        if (isFavourite) {
            console.log('This beer is already a favorite');
            return;
        }

        try {
            await addToFavourites(beer.beerId);
            setIsFavourite(true);
        } catch (error) {
            console.error('Error adding to favourites', error);
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const checkFavouriteStatus = async () => {
            const favouriteBeers = await fetchFavoriteBeers();
            setIsFavourite(favouriteBeers.some(favBeer => favBeer.beerId === beer.beerId));
        };
        checkFavouriteStatus();
    }, [beer.beerId]);
    return (
        <>
            <div key={beer.beerId} className="card w-96 h-160 overflow-hidden bg-base-200 shadow-2xl  rounded-3xl ms-4 mt-8">
                <figure><img className="h-80" src={beer.image} alt={beer.name}/></figure>
                <div className="card-body h-80">
                    <h2 className="card-title">{beer.name}</h2>
                    <p className="card-text">{beer.description}</p>
                    <p className="card-text"><strong>Price: </strong>${beer.price}</p>
                    <p className="card-text"><strong>Alcohol: </strong>%{beer.alcohol}</p>
                    <p className="card-text"><strong>Average
                        Rating: </strong>{beer.averageRating || 'Not rated yet'}</p>
                    <p className="card-text"><strong>Rating Count: </strong>{beer.ratingCount || 0}</p>
                    <div className="card-actions justify-end">
                    </div>
                    <div className="flex justify-between items-center"> {/* Add this line */}

                        <form onSubmit={handleRatingSubmit}>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" value={1}
                                   onClick={handleRatingChange}/>
                            <input type="radio" name="rating-1" className="mask mask-star" value={2}
                                   onClick={handleRatingChange}/>
                            <input type="radio" name="rating-1" className="mask mask-star" value={3}
                                   onClick={handleRatingChange}/>
                            <input type="radio" name="rating-1" className="mask mask-star" value={4}
                                   onClick={handleRatingChange}/>
                            <input type="radio" name="rating-1" className="mask mask-star" value={5}
                                   onClick={handleRatingChange}/>
                        </div>
                        <button type="submit" className="btn btn-ghost">Rate</button>
                    </form>
                        <button className="btn btn-neutral"
                                onClick={() => navigate(`/comments/${beer.beerId}`)}>Comments
                        </button>
                        <div className="card-actions justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                             onClick={() => {
                                 console.log('isFavourite:', isFavourite);
                                 {
                                     isFavourite ? document.getElementById('my_modal_1').showModal()
                                         : document.getElementById('my_modal_2').showModal();
                                 }
                             }}>
                            <path fill={isFavourite ? "currentColor" : "none"} stroke="currentColor"
                                  d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"/>
                        </svg>
                    </div>
                        {isFavourite &&
                            (
                                <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Hello!</h3>
                                        <p className="py-4">This beer is already in your Favorites.</p>

                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            )}

                        {!isFavourite &&
                            (
                                <dialog id="my_modal_2" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Hello!</h3>
                                        <p className="py-4">Are you sure you want to add this beer to Favorites? This
                                            decision is permanent.</p>

                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn mr-1" onClick={handleFavouriteClick}>Add to Favourites
                                                </button>
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            )}
                        {isRated && (
                            <dialog id="my_modal_1" className="modal" open>
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Beer rated successfully</p>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn" onClick={() => setIsRated(false)}>Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BeerCard;