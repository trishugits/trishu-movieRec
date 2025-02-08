// import {useEffect, useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// const Card = ({title}) => {
//     const [hasLiked, setHasLiked] = useState(false);
//     const [count, setCount] = useState(0);
//
//     useEffect(() => {
//         console.log(`${title} has been liked: ${hasLiked}`)
//     }, [hasLiked])
//     return(
//         <div className="card" onClick={() => setCount(count+1)}>
//             <h2>{title} <br/> {count || null}</h2>
//             <button onClick={() => setHasLiked(!hasLiked)}>{hasLiked ? '❤️' : '🤍'}</button>
//         </div>
//     )
// }
// const App = () => {
//     return (
//         <div className="card-container">
//             <Card title="Star Wars" rating={5} isCool={true}/>
//             <Card title="Avatar"/>
//             <Card title="The Lion King"/>
//         </div>
//
//     )
// }
//
// export default App

import React, {useEffect, useState} from 'react'
import {useDebounce} from "react-use";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}


const App = () => {



    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [moviesList, setMoviesList] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query='') => {
        try{
            setIsLoading(true);
            const endpoint = query ?
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`Could not find movies for ${API_BASE_URL}`);
            }
            const data = await response.json();
            console.log(data);
            if (data.Response === false) {
                setError(data.Error || 'Failed to fetch movies');
                setMoviesList([]);
                return;
            }
            setMoviesList(data.results || []);
            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error) {
            console.error(error);
            setError("Error Fetching Movies. PLease Try Again Later");
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    useEffect(() => {
        loadTrendingMovies();
    }, []);
    return (
        <main>
            <div className='pattern'/>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title}/>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? <Spinner /> : error ? <p className="text-red-500">{error}</p> :
                        <ul>
                            {moviesList.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie}/>
                                ))}
                        </ul>
                    }
                </section>
            </div>
        </main>
    )
}
export default App
