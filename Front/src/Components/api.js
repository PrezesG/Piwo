const API_URL = 'https://localhost:44374'; // Replace with your server's URL

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error logging in');
            } else {
                throw new Error(await response.text());
            }
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};

export const register = async (Name, Email, Password, ConfirmPassword) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, Email, Password, ConfirmPassword })
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                const errorMessage = errorData.errors?.ConfirmPassword[0] || errorData[0]?.description||'Error registering';
                throw new Error(errorMessage);
            } else if (contentType && contentType.indexOf('application/json')) {
                // Handle the case where the content-type is 'application/json' for password
                const errorData = await response.json();
                const errorMessage = errorData.errors?.ConfirmPassword[0] || 'Error registering';
                throw new Error(errorMessage);
            } else {
                throw new Error(await response.text());
            }
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering', error);
        throw error;
    }
};
export const getAccountDetails = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/my-account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching account details');
        }

        const responseText = await response.text();
        return JSON.parse(responseText);
    } catch (error) {
        console.error('Error fetching account details', error);
        throw error;
    }
};
export const checkAdminStatus = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/admin/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status !== 403) {
                throw new Error('Error checking admin status');
            }
            return false;
        }

        return true;
    } catch (error) {
        // Do nothing with the error
    }
};
export const addBeers = async (beerData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/admin/beers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(beerData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error adding beer');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding beer', error);
        throw error;
    }
};
export async function fetchBeers() {
    const response = await fetch(`${API_URL}/api/Beer`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const beers = await response.json();
    return beers;
}
export const fetchBeer = async (beerId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/Beer/${beerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const beer = await response.json();
        return beer;
    } catch (error) {
        console.error('Error fetching beer', error);
        throw error;
    }
};
export const updateAccountDetails = async (name, email) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/my-account/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating account details');
        }

        const responseText = await response.text();
        return responseText.includes("Member info updated") ? { message: "Member info updated" } : JSON.parse(responseText);
    } catch (error) {
        console.error('Error updating account details', error);
        throw error;
    }
};
export const deleteBeer = async (id) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/admin/beers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error deleting beer');
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error('Error deleting beer', error);
        throw error;
    }
};
export const  fetchUsers = async () =>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/admin/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;
}
export async function deleteUser(userId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
export const addToFavourites = async (beerId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/UserBeer/favourites/${beerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error adding to favourites');
            } else {
                throw new Error('Error adding to favourites');
            }
        }

        const beer = await response.json();
        return beer;
    } catch (error) {
        console.error('Error adding to favourites', error);
        throw error;
    }
};
export const fetchFavoriteBeers = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/Beer/favourites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching favorite beers');
        }

        const beers = await response.json();
        return beers;
    } catch (error) {
        console.error('Error fetching favourite beers', error);
        throw error;
    }
};
export const rateBeer = async (beerId, rating) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/UserBeer/rate/${beerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: rating
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error rating beer');
        }

        const beer = await response.json();
        return beer;
    } catch (error) {
        console.error('Error rating beer', error);
        throw error;
    }
};
export const getBeerComment = async (beerId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/beer/${beerId}/BeerComment`, { // Replace with your actual API URL
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
export const postBeerComment = async (beerId, comment) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/beer/${beerId}/BeerComment?comment=${comment}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting comment', error);
        throw error;
    }
};
export const deleteBeerComment = async (beerId, commentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/beer/${beerId}/BeerComment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const responseBody = await response.json();
            console.log('Response body:', responseBody);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
    } catch (error) {
        console.error('Error deleting comment', error);
        throw error;
    }
};
export const updateBeerComment = async (beerId, commentId, newComment) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/beer/${beerId}/BeerComment/${commentId}?newComment=${newComment}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
    } catch (error) {
        console.error('Error updating comment', error);
        throw error;
    }
};
