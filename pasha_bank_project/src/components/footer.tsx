import React from 'react'
import './index.scss'
export const Footer = () => {
    return (        
      <footer className="footer-section">
      <div className="container">
        <div className="footer-content pb-5">
          <div className="row">
            <div className="col-xl-6 col-lg-6 mb-50" style={{ paddingTop: "3rem" }}>
              <div className="footer-widget">
                <div className="footer-logo">
                  <h3 style={{color:"white"}}>Farda Karimov</h3>
                </div>
                <div className="footer-text">
                  <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                    elit,Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow Me</span>
                  <a href="https://www.facebook.com/ferda.kerimov.9/"><i style={{ cursor: "pointer", margin: "0 5px",backgroundColor:"#16246F" }} className="fab fa-facebook-f facebook-bg"></i></a>
                  <a href="https://www.linkedin.com/in/farda-karimov-8a00a9183/"> <i style={{ cursor: "pointer", margin: "0 5px" }} className="fab fa-linkedin linkedin-bg"></i></a>
                  <a href="https://github.com/Karimov-Farda"><i style={{ cursor: "pointer", margin: "0 5px",backgroundColor:"#E74C3C" }} className="fab fa-google-plus-g google-bg" ></i></a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3> Links</h3>
                </div>
                <ul>
                  <li><a href="/covid">Covid data</a></li>
                  <li><a href="/map">Covid Map</a></li>
                  <li><a href="/weather">Weather Page</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 text-center text-lg-left">
              <div className="copyright-text">
                <p>Copyright &copy; 2021, All Right Reserved <a href="https://github.com/Karimov-Farda">Farda Karimov</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
}

export default Footer