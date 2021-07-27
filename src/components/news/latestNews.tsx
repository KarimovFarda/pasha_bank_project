import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router'
export const LatestNews = () => {
    const history =useHistory()
    const [headData, setHeadData] = useState<any>()
    useEffect(() => {
   fetch("https://api.npoint.io/a05e4d423619db61e3d9").then((resp) => resp.json()).then(data => { setHeadData(data.articles) })
}, [])
    return (
        <section className="news">
        {headData && headData.slice(0, 8).map((item: any, index: any) => {
          return (
            <article className="post" key={index}>
              <div className="media" onClick={() => history.push(`/main/${index + 1}`)} style={{ cursor: "pointer", backgroundImage: `url(${item.urlToImage})` }}></div>
              <div className="caption">
                <h1 className="title" style={{ color: "white" }}>{item.title}</h1>
                <div className="author" style={{ color: "white" }}> by {item.author}</div>
              </div>
            </article>
          )
        })}
      </section>
    )
}

export default LatestNews