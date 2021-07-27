import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router'
import {useSelector} from 'react-redux'

export const NewsContent = () => {
    const history = useHistory()
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
        <div className='article-content' style={{ opacity: "1" }}>
          {id <= 8 ? headData && headData.slice(0.8).map((item: any, index: any) => {
            if (Number(id) === Number(index)) { return (<p onClick={() => { headData[index - 1].content.slice(0, 700) }} style={localStorage.getItem("subscribed") === null ? { filter: 'blur(2px)', fontWeight: 500, userSelect: "none" } : { opacity: "1", fontWeight: 500 }}>{`${headData[index - 1].content.slice(0, 700)}...`}</p>) }
          }) : id < 29 ? headData && newsdata && newsdata.map((item: any, index: any) => {
            if (Number(id) === Number(index) + 9) { return (<p style={localStorage.getItem("subscribed") == null ? { filter: 'blur(2px)', userSelect: "none", fontWeight: 500 } : { opacity: "1", fontWeight: 500 }}> {`${newsdata[index].content.slice(0, 700)}...`}</p>) }
          }) : id < 31 ? state && headData && newsdata && state.news.map((item: any, index: any) => {
            if (Number(id) === Number(index + 29)) {
              return (<p style={localStorage.getItem("subscribed") === null ? { filter: 'blur(2px)', userSelect: "none", wordBreak: "break-all" } : { opacity: "1", fontWeight: 500, wordBreak: "break-all" }}>{`${item.content.slice(0, 700)}...`}</p>)
            }
          }) : info && state && headData && newsdata && info.articles.map((item: any, index: any) => {
            if (Number(id) === Number(index + 31)) {
              return (<p style={localStorage.getItem("subscribed") === null ? { filter: 'blur(2px)', userSelect: "none", wordBreak: "break-all" } : { opacity: "1", fontWeight: 500, wordBreak: "break-all" }}>{`${info.articles[index + 1].content.slice(0, 700)}...`}</p>)
            }
          })}
          <div className="card text-center" style={(localStorage.getItem("subscribed") != null) ? { display: 'none' } : { backgroundColor: "#fcfcfc", marginBottom: "2rem" }}>
            <div className="card-header">
              <h4>Do you want to continue reading this article?
              </h4>
              <a href="/payment" className="remained-text" style={{ color: "#EA5A41" }}>Subscribe at once </a>
            </div>
            <div className="card-body">
              <h3 className="card-title mb-5" >Enjoy 50% off digital subscription
              </h3>
              <a href="#" className="btn-primary subscription-details" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("id", id); history.push("/payment") }}>View Subscription Options</a>
              <h6 className="card-text mt-5" >Cancelation at any time</h6>
            </div>
          </div>
          {id <= 8 ? headData && headData.slice(0.8).map((item: any, index: any) => {
            if (Number(id) === Number(index)) { return (localStorage.getItem("subscribed") === null ? <div></div> : <div><p className="remained-text">{headData[index].content.slice(700, headData[index].content.length)}</p>    </div>) }
          }) : id < 29 ? headData && newsdata && newsdata.map((item: any, index: any) => {
            if (Number(id) === Number(index) + 9) { return (localStorage.getItem("subscribed") === null ? <div></div> : <div><p className="remained-text">{newsdata[index].content.slice(700, newsdata[index].content.length)}</p>    </div>) }
          }) : id < 31 ? state && headData && newsdata && state.news.map((item: any, index: any) => {
            if (Number(id) === Number(index + 29)) {
              return (localStorage.getItem("subscribed") === null ? <div></div> : <div><p className="remained-text">{item.content.slice(700, item.content.length)}</p>    </div>)
            }
          }) : info && state && headData && newsdata && info.articles.map((item: any, index: any) => {
            if (Number(id) === Number(index + 31)) {
              return (localStorage.getItem("subscribed") === null ? <div></div> : <div><p className="remained-text">{info.articles[index + 1].content.slice(700, item.content.length)}</p>    </div>)
            }
          })}
         
        </div>
    )
}

export default NewsContent