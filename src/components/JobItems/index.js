import './index.css'
import {BsFillBriefcaseFill, BsCaretDown, BsFillStarFill} from 'react-icons/bs'

const JobItems = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = eachItem
  return (
    <li className="job-item-list">
      <div className="job-item-card-container">
        <div className="comapny-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-title-card-container">
            <p className="company-title-para">{title}</p>
            <div className="rating-card">
              <BsFillStarFill className="star-size" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-card-container">
          <div className="location-employment-container">
            <div className="location-card">
              <BsCaretDown className="location-icon" />
              <p className="location-para">{location}</p>
            </div>
            <div className="employment-card">
              <BsFillBriefcaseFill className="employ-bag-icon" />
              <p className="employment-para">{employmentType}</p>
            </div>
          </div>
          <p className="salary-para">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line-job-item" />
        <h1 className="description-heading">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobItems
