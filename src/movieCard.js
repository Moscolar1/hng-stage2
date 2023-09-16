import React from 'react';
import './movieCard.css';
import tomat from './images/tomat.png';


const MovieCard = (props) => {
  const { title, vote_average, poster_path, overview, runtime, release_date } = props; // Destructure the props
  const basePosterURL = "https://image.tmdb.org/t/p/w500"; // Base URL for movie posters

  return (
    <div className='card' data-testid='movie-card'>
      <div className='poster' data-testid='movie-poster'>
        {poster_path ? ( // Check if poster_path is available
          <img src={`${basePosterURL}${poster_path}`} alt={title} />
        ) : 
           <img src= "https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"/>
        }
      </div>

      <div className='info'>
        <p className='title' data-testid='movie-title'>{title}</p>
        <p className='vote' data-testid='movie-vote'>{vote_average}/100 <img src={tomat} alt="rotten tomato" className="tomat" /></p> 
        <p className='runtime' data-testid='movie-runtime'>{runtime} minutes</p>
        <p className='release_date' data-testid='movie-release-date'>{release_date}</p>
        
      </div>

      <div className='overview'>
        <h2 className='title_overview'data-testid='movie-overview'>Overview:</h2>
        <h3 className='overview_info'>{overview}</h3>
       
      </div>
    </div>
  );
  
}

export default MovieCard;
