import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAccountDetails, checkAdminStatus } from "./api";
export const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'retro');
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Add this line

    const handleToggle = (e) => {
        if(e.target.checked){
            setTheme('luxury');
        }
        else {
            setTheme('retro');
        }
    }
    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);
    useEffect(() => {
        if (isLoggedIn) {
            getAccountDetails()
                .then(data => setUsername(data.name))
                .catch(error => console.error(error));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            checkAdminStatus()
                .then(isAdmin => setIsAdmin(isAdmin))
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (selectedOption) {
            navigate(selectedOption);
        }
    }, [selectedOption, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <header className="navbar bg-neutral text-neutral-content w-full sticky top-0 ">
            <div className="flex-1">

                <a href="/" className="btn btn-ghost rounded-3xl text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512">
                        <path fill="currentColor"
                              d="M392 208h-24v-5.74A63.93 63.93 0 0 0 321.65 96a111 111 0 0 0-27.59-47.29A108.62 108.62 0 0 0 216 16c-29.91 0-57.78 12.28-79 34.68a56 56 0 0 0-67.51 77.54A63.91 63.91 0 0 0 80 231.39V440a56.06 56.06 0 0 0 56 56h176a56.06 56.06 0 0 0 56-56v-8h24a72.08 72.08 0 0 0 72-72v-80a72.08 72.08 0 0 0-72-72M176 416a16 16 0 0 1-32 0V256a16 16 0 0 1 32 0Zm64 0a16 16 0 0 1-32 0V256a16 16 0 0 1 32 0Zm64 0a16 16 0 0 1-32 0V256a16 16 0 0 1 32 0Zm16-224c-8.33 0-20.55-5.18-26.69-11.31A16 16 0 0 0 282 176H160a16 16 0 0 0-15 10.53c-6.83 18.68-23.6 21.47-33 21.47a32 32 0 0 1 0-64c.09 0 9.12.34 16.4 5.8a16 16 0 1 0 19.2-25.6A63.7 63.7 0 0 0 112 112a63.6 63.6 0 0 0-14 1.57A24 24 0 0 1 120 80a23.78 23.78 0 0 1 19.38 9.84a51.4 51.4 0 0 1 4.71 7.9A16 16 0 0 0 176 96c0-6.77-3.61-15.17-10.76-25c-.46-.63-1-1.25-1.45-1.86C178.39 55.44 196.64 48 216 48a76.86 76.86 0 0 1 55.23 23.18A80.2 80.2 0 0 1 292.61 142a16 16 0 0 0 12.73 18.71a16.3 16.3 0 0 0 3 .28a16 16 0 0 0 15.7-13a112 112 0 0 0 1.96-19.42a32 32 0 0 1-6 63.43m112 168a40 40 0 0 1-40 40h-24V240h24a40 40 0 0 1 40 40Z"/>
                    </svg>
                    Piwo
                </a>
                <label className="swap swap-rotate pr-2">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" onChange={handleToggle} checked={theme === 'luxury'}/>

                    {/* moon icon */}
                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                    </svg>
                    {/* sun icon */}
                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                    </svg>
                </label>
            </div>
            <div className="flex-none">


            {isLoggedIn && (
                    <>
                        <p className="text p-2">Welcome {username}</p>
                        <button onClick={handleLogout} className="btn rounded-2xl btn-default">Logout</button>
                        {isAdmin && (
                            <button onClick={() => navigate('/admin')} className="btn rounded-2xl btn-default">
                                Admin Panel
                            </button>
                        )}
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 className="inline-block w-5 h-5 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                            </svg>
                        </label>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <button className="btn rounded-2xl btn-default" onClick={() => navigate('/login')}>Login
                        </button>
                        <button className="btn rounded-2xl btn-default" onClick={() => navigate('/register')}>Register
                        </button>
                    </>
                )}


            </div>
        </header>
    )
}
