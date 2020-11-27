import React, {Component} from 'react';


class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="header_box">
                    <div className="logo">난 로고</div>
                    <div className="navi">난 네비</div>
                    <div className="login">난 로그인</div>
                </div>
            </div>
        );
    }
}


export default Header;