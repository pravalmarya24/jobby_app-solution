import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary information company
        reviews. Find the jobs that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-job-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
