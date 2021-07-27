import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router'
import { useSelector } from 'react-redux';
export  const SuggestedNews = () => {
    const params = useParams();
    const id = (Object(params).id)
    console.log("news",id)
    const [info, setInfo] = useState<any>()
    const [newsdata, setNewsdata] = useState<any>()
    const [headData, setHeadData] = useState<any>()
    const state = useSelector((state: any) => state);
    const history = useHistory()

    useEffect(() => {
      /* https://newsapi.org/v2/everything?q=Apple&from=2021-06-28&sortBy=popularity&apiKey=fc951feaf1ed4dc6ba4edba127305bde */
      fetch("https://api.npoint.io/dcc23450af36f09da393").then((resp) => resp.json()).then(data => { setNewsdata(data.articles) })
      fetch("https://api.npoint.io/a05e4d423619db61e3d9").then((resp) => resp.json()).then(data => { setHeadData(data.articles) })
      fetch("https://api.npoint.io/b29bcd11b992df4ab8fa").then((resp) => resp.json()).then(data => { setInfo(data) })
      /* https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fc951feaf1ed4dc6ba4edba127305bde*/
    }, [])
    const randomGenerator = 13
    return (
        <aside style={{ marginTop: 0 }}>
          <h4 className="mb-3 color-orange">Suggested News</h4>
          <div onClick={() => history.push(`/main/${randomGenerator}`)}>
            <img style={{ width: "100%", marginBottom: "1rem" }} src={newsdata && newsdata[randomGenerator - 9].urlToImage}></img>
            <h6>{newsdata && newsdata[randomGenerator - 9].title}
            </h6>
            <div className="small" style={{ marginBottom: "2rem" }}>Author: {newsdata && newsdata[randomGenerator - 9].author}
            </div>
          </div>
          <div onClick={() => history.push(`/main/${randomGenerator - 1}`)}>
            <img style={{ width: "100%", marginBottom: "1rem" }} src={newsdata && newsdata[randomGenerator - 10].urlToImage}></img>
            <h5>{newsdata && newsdata[randomGenerator - 10].title}
            </h5>
            <div className="small" style={{ marginBottom: "2rem" }}>Author: {newsdata && newsdata[randomGenerator - 10].author}
            </div>
          </div>
          <div onClick={() => history.push(`/main/${randomGenerator + 1}`)}>
            <img style={{ width: "100%", marginBottom: "1rem" }} src={newsdata && newsdata[randomGenerator - 8].urlToImage}></img>
            <h5>{newsdata && newsdata[randomGenerator - 8].title}
            </h5>
            <div className="small" style={{ marginBottom: "2rem" }}>Author: {newsdata && newsdata[randomGenerator - 8].author}
            </div>
          </div>
          <div onClick={() => history.push(`/main/${randomGenerator + 2}`)}>
            <img style={{ width: "100%", marginBottom: "1rem" }} src={newsdata && newsdata[(randomGenerator - 7) > 20 ? randomGenerator - 2 : randomGenerator - 7].urlToImage}></img>
            <h5>{newsdata && newsdata[(randomGenerator + 2) > 20 ? randomGenerator - 2 : randomGenerator - 7].title}
            </h5>
            <div className="small" style={{ marginBottom: "2rem" }}>Author: {newsdata && newsdata[(randomGenerator - 7) > 20 ? randomGenerator - 2 : randomGenerator - 7].author}
            </div>
          </div>
        </aside>
    )
}


export default SuggestedNews