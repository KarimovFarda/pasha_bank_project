import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
export const Articles = () => {
    const history = useHistory()
    const [info, setInfo] = useState<any>()
    const state = useSelector((state: any) => state);
    useEffect(() => {
      fetch("https://api.npoint.io/b29bcd11b992df4ab8fa").then((resp) => resp.json()).then(data => {  setInfo(data) })
      }, [])
    return (
        <div className="articles-container articles" style={{ margin: "0 auto" }}>
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12 quote-primary">
            <div>
              <p>
                Opinion
              </p>
              <p>“If you can’t annoy somebody with what you write, there’s little point in writing.”
              </p>
              <p>
                Kinglsley Amis
                <span className="right-arrow"></span>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 article2">
            <div className="article-thumb culture-thumb" style={{ backgroundImage: `url(${info && info.articles[0].urlToImage})` }}>
            </div>
            <div className="category-tag ">
              <span className=" tag culture-tag">
                Culture
              </span>
            </div>
            <div className="article-text">
              <p>
                {info && info.articles[0].title}
              </p>
              <p>
                {info && info.articles[0].description}
              </p>
            </div>
          </div>
          {info && info.articles.slice(1, 15).map((item: any, index: number) => {
            return (
              <div key={index} className="col-md-3 col-sm-6 col-xs-12 article1" onClick={() => history.push(`/main/${index + 30 + state.news.length}`)}>
                <div className="article-thumb technology-thumb" style={{ backgroundSize: "cover", backgroundImage: `url(${item.urlToImage})` }}>
                </div>
                <div className="category-tag ">
                  <span className=" tag technology-tag">
                    Articles
                  </span>
                </div>
                <div className="article-text">
                  <p>
                    {item.title}
                  </p>
                  <p>
                    {item.author}
                  </p>
                  <p>
                    {new Date(item.publishedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )
          })}
          <div className="col-md-3 col-sm-6 col-xs-12 quote-primary">
            <div>
              <p>
                Opinion
              </p>
              <p>““I would sum up my fear about the future in one word: boring.”
              </p>
              <p>
                J.G. Ballard
                <span className="right-arrow"></span>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 article2">
            <div className="article-thumb news-thumb" style={{ backgroundImage: `url(${info && info.articles[16].urlToImage})` }}>
            </div>
            <div className="category-tag " style={{ backgroundColor: "transparent" }}>
              <span className=" tag news-tag">
                Economy
              </span>
            </div>
            <div className="article-text">
              <p>
                {info && info.articles[16].title}
              </p>
              <p>
                {info && info.articles[16].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    )

} 
export default Articles