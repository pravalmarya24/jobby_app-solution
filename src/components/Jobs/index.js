import {Component} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItems from '../JobItems'
import Header from '../Header'

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
  state = {
    profileList: [],
    apiStatus: apiStatusUpdates.initial,
    jobsList: [],
    searchInput: '',
  }

  componentDidMount = () => {
    this.getProfileDetails()
    this.getJobItems()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onTakingSearchInput = event => {
    console.log(event.target.value)
    this.setState({searchInput: event.target.value})
  }

  onRetry = () => this.getProfileDetails()

  renderProfileFailureView = () => (
    <div className="retry-btn-container">
      <button className="retry-btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusUpdates.progress})
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
  }

  renderProfileCard = () => {
    const {profileList} = this.state
    return (
      <div className="profile-card-container">
        <img
          src={profileList.profileImageUrl}
          alt="profile"
          className="profile-img-size"
        />
        <h1 className="profile-name-heading">{profileList.name}</h1>
        <p className="profile-shortbio-para">{profileList.shortBio}</p>
      </div>
    )
  }

  renderProfileViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusUpdates.success:
        return this.renderProfileCard()
      case apiStatusUpdates.progress:
        return this.renderLoader()
      case apiStatusUpdates.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderProfileView = () => {
    const {searchInput} = this.state
    return (
      <div className="profile-view-container">
        <div className="search-input-container">
          <input
            type="search"
            className="search-input-elem"
            placeholder="Search"
            value={searchInput}
            onChange={this.onTakingSearchInput}
          />
          <div className="search-icon-container">
            <BsSearch className="search-icon" />
          </div>
        </div>
        <div className="profile-details-container">
          {this.renderProfileViews()}
        </div>
        <hr className="horizontal-line" />
        <h1 className="employment-para">Type of Employment</h1>
        <ul className="unordered-list">
          {employmentTypesList.map(each => (
            <li className="list" key={each.employmentTypeId}>
              <input
                type="checkbox"
                className="checkbox"
                id={each.employmentTypeId}
              />
              <label className="label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="horizontal-line" />
        <h1 className="employment-para">Salary Range</h1>
        <ul className="unordered-list">
          {salaryRangesList.map(each => (
            <li className="list" key={each.salaryRangeId}>
              <input
                type="radio"
                className="radio"
                id={each.salaryRangeId}
                name="salaryRange"
              />
              <label className="label" htmlFor={each.salaryRangeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getJobItems = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusUpdates.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusUpdates.success,
      })
    } else {
      this.setState({apiStatus: apiStatusUpdates.failure})
    }
    console.log(data)
    console.log(response)
  }

  onClickingSearchIcon = () => this.getJobItems()

  noJobSearchInputFound = () => (
    <div className="no-job-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-found-img"
      />
      <p className="no-jobs-para">No Jobs Found</p>
      <p className="try-other-filter-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobItems = () => {
    const {jobsList, searchInput} = this.state
    return (
      <div className="joblist-bg-container">
        <div className="job-search-input-container">
          <input
            type="search"
            className="job-search-input-elem"
            placeholder="Search"
            value={searchInput}
            onChange={this.onTakingSearchInput}
          />
          <div className="job-search-icon-container">
            <button
              className="search-icon-btn"
              type="button"
              onClick={this.onClickingSearchIcon}
              data-testid="searchButton"
            >
              <BsSearch className="job-search-icon" />
            </button>
          </div>
        </div>
        {jobsList.length === 0 ? (
          this.noJobSearchInputFound()
        ) : (
          <ul className="jobs-unordered-list">
            {jobsList.map(each => (
              <JobItems eachItem={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  onJobFailureRetryBtn = () => this.getJobItems()

  renderJobItemFailureView = () => (
    <div className="job-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-view-size"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onJobFailureRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusUpdates.success:
        return this.renderJobItems()
      case apiStatusUpdates.progress:
        return this.renderLoader()
      case apiStatusUpdates.failure:
        return this.renderJobItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          {this.renderProfileView()}
          {this.renderJobItemViews()}
        </div>
      </>
    )
  }
}

export default Jobs
