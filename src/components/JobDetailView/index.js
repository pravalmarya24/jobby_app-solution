import {Component} from 'react'
import './index.css'
import {BsFillBriefcaseFill, BsCaretDown, BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusUpdates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class JobDetailView extends Component {
  state = {
    jobsDetailList: [],
    skillsList: [],
    similarJobList: [],
    lifeAtCompanyList: [],
  }

  componentDidMount = () => {
    this.getJobDetailView()
  }

  onJobFailureRetryBtn = () => this.getJobDetailView()

  renderJobItemDetailFailureView = () => (
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

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobDetailView = async () => {
    this.setState({apiStatus: apiStatusUpdates.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // this.setState({apiStatus: apiStatusUpdates.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const skillsData = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      console.log(skillsData)
      console.log(updatedData)
      const similarJobsData = data.similar_jobs.map(each => ({
        idSimilar: each.id,
        companyLogoUrlSimilar: each.company_logo_url,
        employmentTypeSimilar: each.employment_type,
        jobDescriptionSimilar: each.job_description,
        locationSimilar: each.location,
        ratingSimilar: each.rating,
        titleSimilar: each.title,
      }))

      console.log(similarJobsData)
      const lifeAtCompanyData = {
        descriptionsLife: data.job_details.life_at_company.description,
        imageUrlLife: data.job_details.life_at_company.image_url,
      }

      console.log(lifeAtCompanyData)
      this.setState({
        jobsDetailList: updatedData,
        skillsList: skillsData,
        similarJobList: similarJobsData,
        lifeAtCompanyList: lifeAtCompanyData,
        apiStatus: apiStatusUpdates.success,
      })
    } else {
      this.setState({apiStatus: apiStatusUpdates.failure})
    }
  }

  renderSuccesView = () => {
    const {
      jobsDetailList,
      skillsList,
      similarJobList,
      lifeAtCompanyList,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobsDetailList
    const {descriptionsLife, imageUrlLife} = lifeAtCompanyList
    return (
      <div className="job-detail-bg-container">
        <div className="job-detail-item-card-container">
          <div className="company-detail-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="detail-company-logo"
            />
            <div className="company-detail-title-card-container">
              <h1 className="company-detail-title-para">{title}</h1>
              <div className="detail-rating-card">
                <BsFillStarFill className="detail-star-size" />
                <p className="detail-rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="detail-location-card-container">
            <div className="detail-location-employment-container">
              <div className="detail-location-card">
                <BsCaretDown className="detail-location-icon" />
                <p className="detail-location-para">{location}</p>
              </div>
              <div className="detail-employment-card">
                <BsFillBriefcaseFill className="detail-employ-bag-icon" />
                <p className="detail-employment-para">{employmentType}</p>
              </div>
            </div>
            <p className="detail-salary-para">{packagePerAnnum}</p>
          </div>
          <hr className="detail-horizontal-line-job-item" />
          <h1 className="detail-description-heading">Description</h1>
          <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
            Visit
          </a>
          <p className="detail-description-para">{jobDescription}</p>
          <h1 className="skill-para">Skills</h1>
          <div className="skill-container">
            <ul className="skill-unordered-list">
              {skillsList.map(each => (
                <div className="skill-img-container">
                  <li key={uuidv4()}>
                    <img
                      src={each.imageUrl}
                      alt={each.name}
                      className="skill-img-size"
                    />
                    <p className="skill-img-para">{each.name}</p>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <h1 className="life-at-com-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description-para">
              {descriptionsLife}
            </p>
            <img
              src={imageUrlLife}
              alt=" life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>

        <ul className="similar-unordered-list">
          {similarJobList.map(each => (
            <li key={each.idSimilar} className="similar-list">
              <div className="similar-job-item-card-container">
                <div className="similar-company-logo-container">
                  <img
                    src={each.companyLogoUrlSimilar}
                    alt="similar job company logo"
                    className="similar-company-logo"
                  />
                  <div className="similar-company-title-card-container">
                    <h1 className="similar-company-title-para">
                      {each.titleSimilar}
                    </h1>
                    <div className="similar-rating-card">
                      <BsFillStarFill className="similar-star-size" />
                      <p className="similar-rating-para">
                        {each.ratingSimilar}
                      </p>
                    </div>
                  </div>
                </div>
                <h1 className="similar-description-heading">Description</h1>
                <p className="similar-description-para">
                  {each.jobDescriptionSimilar}
                </p>
                <div className="similar-location-card-container">
                  <div className="similar-location-employment-container">
                    <div className="similar-location-card">
                      <BsCaretDown className="similar-location-icon" />
                      <p className="similar-location-para">
                        {each.locationSimilar}
                      </p>
                    </div>
                    <div className="similar-employment-card">
                      <BsFillBriefcaseFill className="similar-employ-bag-icon" />
                      <p className="similar-employment-para">
                        {each.employmentTypeSimilar}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusUpdates.success:
        return this.renderSuccesView()
      case apiStatusUpdates.progress:
        return this.renderLoader()
      case apiStatusUpdates.failure:
        return this.renderJobItemDetailFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderViews()}
      </>
    )
  }
}

export default JobDetailView
