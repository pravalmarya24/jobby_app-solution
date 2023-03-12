import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill, BsArrowBarRight} from 'react-icons/bs'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="navbar-bg-container">
      <div className="navbar-mobile-view">
        <nav className="navbar-mobile-section">
          <ul className="unordered-list-header">
            <Link to="/">
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="website logo"
                  className="mobile-view-logo"
                />
              </li>
            </Link>
            <div className="link-section-container">
              <Link to="/">
                <li>
                  <AiFillHome className="home-icon" />
                </li>
              </Link>
              <Link to="/jobs">
                <li>
                  <BsFillBriefcaseFill className="bag-icon" />
                </li>
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="logout-icon-btn"
              >
                <BsArrowBarRight className="logout-icon" />
              </button>
            </div>
          </ul>
        </nav>
      </div>
      <div className="navbar-desktop-view">
        <nav className="navbar-desktop-section">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="desktop-view-logo"
            />
          </Link>
          <ul className="unordered-list">
            <Link to="/">
              <li className="home">Home</li>
            </Link>
            <Link to="/jobs">
              <li className="job">Jobs</li>
            </Link>
          </ul>
          <button
            className="logout-desktop-btn"
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}

export default withRouter(Header)
