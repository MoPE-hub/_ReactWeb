import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PPMain from '../assets/images/pp-main.png'

class Portfolio extends Component {

  render() {
    return(
      <React.Fragment>
        <div className="portfolio">
          <div className="portfolio-box">

            <div className="portfolio-box-inner">
              <ul className="flex-sb">
                <li><img src={PPMain} alt="kt-paperless" className="portfolio-img"/></li>
                <li>
                  <ul>
                    <li className="portfolio-text">프로젝트명 : KT Paperless 사이트 리뉴얼</li>
                    <li className="portfolio-text">설명 : KT Paperless 사이트 리뉴얼을 위한 퍼블리싱</li>
                    <li className="portfolio-text">사용 언어 : HTML, CSS, JavaScript</li>
                    <li className="portfolio-text">참여도 : 80%</li>
                    <li className="portfolio-text"><a href="https://paperless.kt.com/main/welcome_new.htm" target="_blank" className="text-white text-underline-white">페이지 이동</a></li>
                  </ul>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Portfolio
