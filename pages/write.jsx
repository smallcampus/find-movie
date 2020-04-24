import React,{useState, useEffect} from 'react';
import MainPage from '../components/MainPage';
import fetch from 'isomorphic-unfetch';
import path from '../src/path';

const WritePage = ({path_name, api_url, img_url}) => {
  const [movies, setMovies]=useState([]);
  const [page, setPage]=useState(1);
  const [imgSrc, setImgSrc]=useState("");

  // useEffect(() => {
  //   if (!path_name) {
  //     Router.replace(
  //       `/404`
  //     )
  //   }
  // }, [path_name])
  
  function fetchMovies() {
    return new Promise((resolve, reject)=> {
      if (movies.length>0 && movies.length<10) {
        resolve(movies);
        setMovies([]);
      } else {
        fetch(api_url+page)
        .then(res=>res.json())
        .then(data=>{
          setPage(page+1);
          let movies = data.results;
          if (movies.length>10) {
            setMovies(movies.splice(10));
            resolve(movies);
          }else resolve(movies)
        })
        .catch(err=>reject(err))
      }
    })
  }

  useEffect(()=>{
    setImgSrc(img_url.original);
  },[])

  return (
    <MainPage 
      fetchMovies={fetchMovies}
      path={path_name}
      imgSrc={imgSrc}
      imgSrc_blur={img_url.blur}
    />
  )
};

export async function getStaticProps({params}) {
  let query = 'write';
  let obj={
    path_name: path[write].name,
    api_url: path[write].url,
    img_url: path[write].img_url,
  };
  return {
    props: {...obj}, // will be passed to the page component as props
  }
}

export default WritePage;
