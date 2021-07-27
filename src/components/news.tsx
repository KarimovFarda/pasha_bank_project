import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import './index.scss'
import { getNews } from '../redux/newsAction'

export const NewsSection = () => {
  const params = useParams();
  const id = (Object(params).id)
  const [newsdata, setNewsdata] = useState<any>()
  const state = useSelector((state: any) => state);
  const index = String(window.location.href).slice(27)
  const [userId, setUserId] = React.useState<Number>(1);

  useEffect(() => {
    fetch("https://api.npoint.io/9b85b1a15cfec226886d").then((resp) => resp.json()).then(data => { setNewsdata(data.articles) })
  }, [])
  const history = useHistory()
  const dispatch = useDispatch();
  useEffect(() => {
    getNews(userId)(dispatch);
  }, [getNews, dispatch]);
  const random = Math.round(Math.random() * 15)
  return (
    <div className="news">
      <div className="background">
      </div>
      {Number(index) < 20 ? newsdata && newsdata.map((item: any, index: number) => {
        if (id == index) {
          return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <article className="wrapper" >
                <header>
                  <h1 key={id} className="pageTitle">{newsdata[id].title}</h1>
                  <h3 className="pageSubTitle">By {newsdata[id].author}</h3>
                  <h3 className="">{String(new Date(newsdata[id].publishedAt).toLocaleString())}</h3>
                  <h6 className="mb-4">Source : <a href={`${newsdata[id].url}`} style={{ color: "black", textDecoration: "none" }}>{newsdata[id].url}</a></h6>
                </header>
                <section>
                  <p>{newsdata[id].content}</p>
                </section>
              </article>
              <article className="side-bar">
                <h3 className="suggestion">Suggested Articles</h3>
                <header>
                  <div className="card box side-box" style={{ backgroundImage: `URL(${newsdata[random].urlToImage})`, height: "350px" }}>
                    <div className="content">
                      <h2 className="title">{newsdata[random].author}</h2>
                      <p className="copy" >{newsdata[random].title}</p>
                      <button className="btn" onClick={() => history.push(`/main/${random}`)} style={{ color: "white" }}>Read More</button>
                    </div>
                  </div>
                  <div className="card box side-box " style={{ backgroundImage: `URL(${newsdata[11].urlToImage})`, height: "350px" }}>
                    <div className="content">
                      <h2 className="title">{newsdata[11].author}</h2>
                      <p className="copy" >{newsdata[11].title}</p>
                      <button className="btn" onClick={() => history.push(`/main/${11}`)} style={{ color: "white" }}>Read More</button>
                    </div>
                  </div>
                </header>
              </article>
            </div>
          )
        }
      }) : state && newsdata && state.news.map((item: any, index: number) => {

        if (id == index + 21) {

          return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <article className="wrapper">
                <header>
                  <h1 className="pageTitle">{state.news[id - 21].title}</h1>
                  <h3 className="pageSubTitle">By {state.news[id - 21].author}</h3>
                  <h3 className="">{String(new Date().toLocaleString())}</h3>
                </header>
                <section>
                  <p>{state.news[id - 21].content}</p>
                </section>
              </article>
              <article className="side-bar">
                <h3 className="suggestion">Suggested Articles</h3>
                <header>
                  <div className="card box side-box" style={{ backgroundImage: `URL(${newsdata[random].urlToImage})`, height: "350px" }}>
                    <div className="content">
                      <h2 className="title">{newsdata[random].author}</h2>
                      <p className="copy" >{newsdata[random].title}</p>
                      <button className="btn" onClick={() => history.push(`/main/${random}`)} style={{ color: "white" }}>Read More</button>
                    </div>
                  </div>
                  <div className="card box side-box " style={{ backgroundImage: `URL(${newsdata[random + 1].urlToImage})`, height: "350px" }}>
                    <div className="content">
                      <h2 className="title">{newsdata[random + 1].author}</h2>
                      <p className="copy" >{newsdata[random + 1].title}</p>
                      <button className="btn" onClick={() => history.push(`/main/${random + 1}`)} style={{ color: "white" }}>Read More</button>
                    </div>
                  </div>
                </header>
              </article>
            </div>
          )
        }
      })}
    </div>
  )
}
export default NewsSection
