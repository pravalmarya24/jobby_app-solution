import {Component} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusUpdates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {profileList: [], apiStatus: apiStatusUpdates.initial}

  componentDidMount = () => {
    this.getProfileDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="retry-btn-container">
      <button className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: updatedData,
        apiStatus: apiStatusUpdates.success,
      })
    } else {
      this.setState({apiStatus: apiStatusUpdates.failure})
    }
    console.log(response)
    console.log(data)
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusUpdates.progress:
        return this.renderLoader()
      case apiStatusUpdates.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderProfileView = () => {
    const {apiStatus, profileList} = this.state
    return (
      <div className="profile-view-container">
        <div className="search-input-container">
          <input
            type="search"
            className="search-input-elem"
            placeholder="Search"
          />
          <div className="search-icon-container">
            <BsSearch className="search-icon" />
          </div>
        </div>
        <div className="profile-details-container">
          {apiStatus === apiStatusUpdates.success ? (
            <div className="profile-card-container">
              <img
                src={profileList.profileImageUrl}
                alt="profile"
                className="profile-img-size"
              />
              <h1>{profileList.name}</h1>
              <p>{profileList.shortBio}</p>
            </div>
          ) : (
            this.renderViews()
          )}
        </div>
      </div>
    )
  }

  render() {
    const {profileList} = this.state
    console.log(profileList)
    return <div className="jobs-bg-container">{this.renderProfileView()}</div>
  }
}

export default Jobs
