import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  renderLoginForm = () => {
    const {username, password, errorMsg, showErrorMsg} = this.state
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-size"
            />
          </div>
          <label className="label-username" htmlFor="usernameId">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            id="usernameId"
            placeholder="Username"
            className="username-input-elem"
            value={username}
            onChange={this.getUsername}
          />
          <br />
          <label className="label-password" htmlFor="passwordId">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            id="passwordId"
            placeholder="Password"
            className="password-input-elem"
            value={password}
            onChange={this.getPassword}
          />
          <button className="login-btn" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-bg-container">{this.renderLoginForm()}</div>
    )
  }
}

export default LoginForm
