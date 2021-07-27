import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router'
import { useSelector } from "react-redux";


export const NewsHeader = () => {
    const params = useParams();
    const id = (Object(params).id)
    console.log("news",id)
    const [info, setInfo] = useState<any>()
    const [newsdata, setNewsdata] = useState<any>()
    const [headData, setHeadData] = useState<any>()
    const state = useSelector((state: any) => state);

    useEffect(() => {
      /* https://newsapi.org/v2/everything?q=Apple&from=2021-06-28&sortBy=popularity&apiKey=fc951feaf1ed4dc6ba4edba127305bde */
      fetch("https://api.npoint.io/dcc23450af36f09da393").then((resp) => resp.json()).then(data => { setNewsdata(data.articles) })
      fetch("https://api.npoint.io/a05e4d423619db61e3d9").then((resp) => resp.json()).then(data => { setHeadData(data.articles) })
      fetch("https://api.npoint.io/b29bcd11b992df4ab8fa").then((resp) => resp.json()).then(data => { setInfo(data) })
      /* https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fc951feaf1ed4dc6ba4edba127305bde*/
    }, [])
    return (
        <div>
        {id <= 8 ? headData && headData.slice(0.8).map((item: any, index: any) => {
            if (Number(id) === Number(index)) {
              return (
                <div className="header-banner" style={{ backgroundImage: `url(${headData[id - 1].urlToImage})` }}>
                  <h2>{headData[id - 1].title}</h2 >
                </div>
              )
            }
          }) : id < 29 ? headData && newsdata && newsdata.map((item: any, index: any) => {
            if (Number(id) === Number(index) + 9) {
              return (
                <div className="header-banner" style={{ backgroundImage: `url(${newsdata[index].urlToImage})` }}>
                  <h2 >{newsdata[index].title}</h2 >
                </div>
              )
            }
          }) : id < 31 ? headData && newsdata && state && state.news.map((item: any, index: any) => {
            if (Number(id) === Number(index + 29)) {
              return (
                <div className="header-banner" style={{ backgroundImage: `url(${state.news[index].url})` }}>
                  <h2 >{state.news[index].title}</h2 >
                </div>
              )
            }
          }) : info && headData && newsdata && state && info.articles.map((item: any, index: any) => {
            if (Number(id) === Number(index + 31)) {
              return (
                <div className="header-banner" style={{ backgroundImage: `url(${info.articles[index + 1].urlToImage})` }}>
                  <h2 >{info.articles[index + 1].title}</h2 >
                </div>
              )
            }
          })}
</div>
    )
} 
 export default NewsHeader