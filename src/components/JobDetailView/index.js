import {Component} from 'react'
import './index.css'
import {BsFillBriefcaseFill, BsCaretDown, BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'

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

  getJobDetailView = async () => {
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

      const similarJobsData = data.job_details.similar_jobs.map(each => ({
        companyLogoUrlSimilar: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      const lifeAtCompanyData = {
        descriptionsLife: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      this.setState({
        jobsDetailList: updatedData,
        skillsList: skillsData,
        similarJobList: similarJobsData,
        lifeAtCompanyList: lifeAtCompanyData,
      })
    }
  }

  render() {
    const {jobsDetailList, skillsList, similarJobList} = this.state
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
    const {imageUrl, name} = skillsList
    const {
      companyLogoUrlSimilar,
      employmentTypeSimilar,
      jobDescriptionSimilar,
      locationSimilar,
      ratingSimilar,
      titleSimilar,
    } = similarJobList
    return (
      <li className="job-detail-item-list">
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
          <p className="detail-description-para">{jobDescription}</p>
          <h1 className="skill-para">Skills</h1>
          <div className="skill-container">
            <div className="skill-img-container">
              <img src={imageUrl} alt={name} className="skill-img-size" />
              <p className="skill-para">{name}</p>
            </div>
          </div>
          <h1>Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description-para">{jobDescription}</p>
            <img
              src={imageUrl}
              alt=" life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div className="similar-job-item-card-container">
          <div className="similar-company-logo-container">
            <img
              src={companyLogoUrlSimilar}
              alt="similar job company logo"
              className="similar-company-logo"
            />
            <div className="similar-company-title-card-container">
              <h1 className="similar-company-title-para">{titleSimilar}</h1>
              <div className="similar-rating-card">
                <BsFillStarFill className="similar-star-size" />
                <p className="similar-rating-para">{ratingSimilar}</p>
              </div>
            </div>
          </div>
          <h1 className="similar-description-heading">Description</h1>
          <p className="similar-description-para">{jobDescriptionSimilar}</p>
          <div className="similar-location-card-container">
            <div className="similar-location-employment-container">
              <div className="similar-location-card">
                <BsCaretDown className="similar-location-icon" />
                <p className="similar-location-para">{locationSimilar}</p>
              </div>
              <div className="similar-employment-card">
                <BsFillBriefcaseFill className="similar-employ-bag-icon" />
                <p className="similar-employment-para">
                  {employmentTypeSimilar}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default JobDetailView
