import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './movieCard';
import tomat from './images/tomat.png';
import imdb from './images/imdb.png';

function App() {
  const API_KEY = "0937126671fbb35c81ded2148f4a4b94";
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;
  const API_SEARCH ="https://api.themoviedb.org/3/search/movie?api_key=0937126671fbb35c81ded2148f4a4b94&query=";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          // Construct the base poster URL
          const basePosterURL = "https://image.tmdb.org/t/p/w500";
          
          // Map movie data to include poster URLs
          const moviesWithPosters = data.results.map((movie) => ({
            title: movie.title,
            vote_average: movie.vote_average,
            overview: movie.overview,
            runtime: movie.runtime,
            release_date: movie.release_date,
            poster_path: basePosterURL + movie.poster_path,
          }));

          setMovies(moviesWithPosters.slice(0, 10)); // Limit to the top 10 movies
        } else {
          console.error('No movie data found.');
        }
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [API_URL]);

  const handleSearch = (e) =>{
    e.preventDefault()

    fetch(API_SEARCH + term)
      .then(res => res.json())
      .then(data => setMovies(data.results))
  }

  return (
    <div className="App">
      
      <div className='banner'>
      <div className="search_nav">
        <div className='title'>
          <h1>Movies App</h1>
        </div>
        <div className="search_box">
          <form onSubmit={handleSearch}>
            <input onChange={(e) => setTerm(e.target.value) } />
            <button>Search</button>
          </form>
        </div>
      </div>
      <div className='banner__content'>
        <h1 className='banner__title'>John Wick 3 : Parabellum</h1>
        <div className="banner__rating">

          <div className="imdb-R"> <img className='imdb' src= {imdb} alt="imdb" /> <p>86.6/100</p></div>
          <div className="rotenTomato"><img src={tomat} alt="rotten tomato" className="tomat" /> <p>94%</p>
          </div>

        </div>
        <h2 className='movie__overview'>
          John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
        </h2>
        <div className='banner__buttons'>

          <button className='playbtn'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM9.5547 7.16795C9.24784 6.96338 8.8533 6.94431 8.52814 7.11833C8.20298 7.29235 8 7.63121 8 8V12C8 12.3688 8.20298 12.7077 8.52814 12.8817C8.8533 13.0557 9.24784 13.0366 9.5547 12.8321L12.5547 10.8321C12.8329 10.6466 13 10.3344 13 10C13 9.66565 12.8329 9.35342 12.5547 9.16795L9.5547 7.16795Z" fill="white" />
            </svg>

            <p>WATCH TRAILER</p>
          </button>
        </div>
      </div>

    </div>
      <div className='movies'>
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              vote_average={movie.vote_average}
              overview={movie.overview}
              runtime={movie.runtime}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
            />
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
