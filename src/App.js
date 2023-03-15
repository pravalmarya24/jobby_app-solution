import './App.css'
import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import JobDetailView from './components/JobDetailView'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetailView} />
      <NotFound />
    </Switch>
  </>
)

export default App

//   render() {
//     const {jobsDetailList, skillsList, similarJobList} = this.state
//     const {
//       companyLogoUrl,
//       companyWebsiteUrl,
//       employmentType,
//       jobDescription,
//       location,
//       packagePerAnnum,
//       rating,
//       title,
//     } = jobsDetailList
//     const {imageUrl, name} = skillsList
//     const {companyLogoUrlSimilar,employmentTypeSimilar,jobDescriptionSimilar,locationSimilar,ratingSimilar,titleSimilar} = similarJobList
//     return (
//       <li className="job-detail-item-list">
//         <div className="job-detail-item-card-container">
//           <div className="company-detail-logo-container">
//             <img
//               src={companyLogoUrl}
//               alt="job details company logo"
//               className="detail-company-logo"
//             />
//             <div className="company-detail-title-card-container">
//               <h1 className="company-detail-title-para">{title}</h1>
//               <div className="detail-rating-card">
//                 <BsFillStarFill className="detail-star-size" />
//                 <p className="detail-rating-para">{rating}</p>
//               </div>
//             </div>
//           </div>
//           <div className="detail-location-card-container">
//             <div className="detail-location-employment-container">
//               <div className="detail-location-card">
//                 <BsCaretDown className="detail-location-icon" />
//                 <p className="detail-location-para">{location}</p>
//               </div>
//               <div className="detail-employment-card">
//                 <BsFillBriefcaseFill className="detail-employ-bag-icon" />
//                 <p className="detail-employment-para">{employmentType}</p>
//               </div>
//             </div>
//             <p className="detail-salary-para">{packagePerAnnum}</p>
//           </div>
//           <hr className="detail-horizontal-line-job-item" />
//           <h1 className="detail-description-heading">Description</h1>
//           <p className="detail-description-para">{jobDescription}</p>
//           <h1 className="skill-para">Skills</h1>
//           <div className="skill-container">
//             <div className="skill-img-container">
//               <img src={imageUrl} alt={name} className="skill-img-size" />
//               <p className="skill-para">{name}</p>
//             </div>
//           </div>
//           <h1>Life at Company</h1>
//           <div className="life-at-company-container">
//             <p className="life-at-company-description-para">{jobDescription}</p>
//             <img
//               src={}
//               alt=" life at company"
//               className="life-at-company-img"
//             />
//           </div>
//         </div>
//         <h1>Similar Jobs</h1>
//         <div className="similar-job-item-card-container">
//           <div className="similar-company-logo-container">
//             <img
//               src={companyLogoUrlSimilar}
//               alt="similar job company logo"
//               className="similar-company-logo"
//             />
//             <div className="similar-company-title-card-container">
//               <h1 className="similar-company-title-para">{titleSimilar}</h1>
//               <div className="similar-rating-card">
//                 <BsFillStarFill className="similar-star-size" />
//                 <p className="similar-rating-para">{ratingSimilar}</p>
//               </div>
//             </div>
//           </div>
//           <h1 className="similar-description-heading">Description</h1>
//           <p className="similar-description-para">{jobDescriptionSimilar}</p>
//           <div className="similar-location-card-container">
//             <div className="similar-location-employment-container">
//               <div className="similar-location-card">
//                 <BsCaretDown className="similar-location-icon" />
//                 <p className="similar-location-para">{locationSimilar}</p>
//               </div>
//               <div className="similar-employment-card">
//                 <BsFillBriefcaseFill className="similar-employ-bag-icon" />
//                 <p className="similar-employment-para">{employmentTypeSimilar}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </li>
//     )
//   }
