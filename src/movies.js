import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import './movies.scss'
function Movies(){
    const [movieInfo, setMovieInfo]= useState([])
    const [loader, showLoader]= useState(true)
    const info = useRef()
    
    const fetchData=async()=>{
        let href = window.location.href
        let url = new URL(href);
        let id = url.searchParams.get("id");
        
        const response= await fetch('https://movie-task.vercel.app/api/movie?movieId='+id)
        const data= await response.json();
        info.current= data
        setMovieInfo(info.current.data)
        showLoader(false)        
    }
    useEffect(()=>{
    fetchData()
    })    
    return(
        <div className="movie">
            <Link to='/' className="homebtn">HOME</Link>
            {movieInfo.length !== 0 && 
            <div className="box"> 
            <img src={'https://image.tmdb.org/t/p/original'+movieInfo.backdrop_path} width='60%' height='500px'/>
            <div className="title"> <u>{movieInfo.original_title}</u></div>
            <div className="description">{movieInfo.overview} </div>
            <div><b> Duration: </b>{movieInfo.runtime} minutes</div>
            <div><b>Rating: </b>{movieInfo.vote_average}</div>
            <div><b> Release Status: </b> {movieInfo.status}</div>
            <div> <b>Released on: </b> {movieInfo.release_date}</div>
            <div style={{display: 'inline-block'}}><b> Genre: </b> {movieInfo.genres.map((x)=>
                        <span>{x.name} </span>
                     )}
            </div>
            <div> <b>Adult: </b>{movieInfo.adult ? "Yes" : 'No'} </div>
            </div>}
            { loader &&
              <div className="loader_container">
                <div className="loader"><img src={require('./loader.gif')} /></div>
              </div>
            }
        </div>
    )
}

export default Movies;