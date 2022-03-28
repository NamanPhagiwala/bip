import React, {useEffect, useRef, useState} from "react";
import 'antd/dist/antd.css';
import {  Card, Col, Row } from "antd";
import './home.scss'
import  movieImg from'./movie.jpg'
import Meta from "antd/lib/card/Meta";
import { useNavigate } from "react-router-dom";
const years = [2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
const rating = [9,8,7,6,5,4]
let key= '';
function Home(){
    const [movieData, setMovieData]= useState()
    const [load, setLoad]= useState()
    const [filter, setFilter]= useState(false)
    const [sortedData, setSortedData]= useState()
    const [searchTerm, setSearchTerm]= useState('')
    const [showSearchResult, setSearchResult]= useState(false)
    const movie = useRef() 
    const navigate= useNavigate()
    const fetchData=async()=>{
        const response = await fetch('https://movie-task.vercel.app/api/popular?page=1');
        const json = await response.json();
        movie.current= json.data.results
        setMovieData(movie.current)
    }
    useEffect(()=>{
        fetchData()
    },[load])

    const updateField=(e)=>{
        setSearchTerm(e.target.value)
    }
    const filterData=(type, value)=>{
        setFilter(true)
        if(type=== 'year'){
        let data= movieData.filter((item, key)=> item.release_date.includes(value))
        setSortedData(data)
        }
        else if(type==='rating'){
        let data= movieData.filter((item)=> item.vote_average >= value)
        setSortedData(data)
        }
    }
    const noFilteredData=()=>{
        setFilter(false)
    }
    const searchResults=async()=>{
        setSearchResult(true)
        setFilter(false)
        const response= await fetch('https://movie-task.vercel.app/api/search?page=1&query='+searchTerm)
        const data= await response.json();
        movie.current= data.data.results
        setMovieData(movie.current)
        key = searchTerm;
        setSearchTerm('')
        console.log(movie.current)

    }

    const redirectToMov=(id)=>{
        navigate('/movie?id='+id)
    }
    return(
        <div className="home">
            <header>
                <div className="icon">BipSo </div>
                <div className="navbar">
                    <a href='/'>Home</a>
                     <div class="year-dropdown">
                        <button class="dropbtn">Year 
                            <i class="fa fa-caret-down"></i>
                        </button>
                           <div class="dropdown-content">
                              {years.map((year,key)=>
                                <a onClick={()=>filterData('year',year)}> {year} </a>
                              )}
                            </div>
                        </div> 
                        <div className="rating-drop">
                        <button class="dropbtn"> Rating 
                            <i class="fa fa-caret-down"></i>
                        </button>
                           <div class="dropdown-content">
                              {rating.map((rating)=>
                                <a onClick={()=>filterData('rating', rating)}> > {rating} rating </a>
                              )}
                            </div>    

                        </div>
                <h1 className="navBar" style={{ display:'inline-block', float: 'none'}}> Assignment By Naman</h1>
                <div className="navBar-search"> 
                    <input type='text' placeholder="Movies" onChange={(e)=>updateField(e)} value={searchTerm}/> 
                    <button onClick={()=>searchResults()} className='primarybtn'> Search </button>
                </div>
                </div>
            </header>
            <main>
            {showSearchResult &&
             <div style={{fontSize: '20px', fontWeight: '600'}}> {movieData.length!==0 ? 'Showing Results for "'+key+'"' :'No Results found for "'+key+'"'}</div>}
            { !filter ?  
           <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32 }} style={{margin: '2% 4%', color: '#ddd'}}>
            {movieData!== undefined && movieData.map((x, key)=>
            <Col className="gutter-row" xs={24} sm={8} md={6} lg={4}>
                <Card hoverable onClick={()=>redirectToMov(x.id)} style={{ width: 240 }} cover={<img alt="example" src={x.poster_path!== null ? 'https://image.tmdb.org/t/p/original/'+x.poster_path : movieImg} style={{height: '360px'}}/>}>
                <Meta title={x.original_title} description={'Rating: '+x.vote_average+ ' | Year: '+x.release_date} />
            </Card>
            </Col>
            )}
            </Row>
            :
            <div>
            {sortedData.length !== 0 ?            
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32 }} style={{margin: '2% 4%', color: '#ddd'}}>
            {sortedData.map((x, key)=>
            <Col className="gutter-row" xs={24} sm={8} md={6} lg={4}>
                <Card hoverable onClick={()=>redirectToMov(x.id)} style={{ width: 240 }} cover={<img alt="example" src={'https://image.tmdb.org/t/p/original/'+x.poster_path} />}>
                <Meta title={x.original_title} description={'Rating: '+x.vote_average+ ' | Year: '+x.release_date} />
            </Card>
            </Col>
            )}
            </Row> :
            <div>No Data Found, Please select different year or <a onClick={()=>noFilteredData()}>Reset Filter</a></div>
            }
            </div>
            }
            </main>
        </div>
    )
}

export default Home;