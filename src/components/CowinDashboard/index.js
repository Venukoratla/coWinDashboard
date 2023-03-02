// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {
    ageList: [],
    coverageList: [],
    genderList: [],
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.getCovidData()
  }

  sevenDaysConvertion = eachObject => ({
    vaccineDate: eachObject.vaccine_date,
    doseOne: eachObject.dose_1,
    doseTwo: eachObject.dose_2,
  })

  ageDetailsConvertion = eachItem => ({
    age: eachItem.age,
    count: eachItem.count,
  })

  gendeDetailsConvertion = eachItem => ({
    count: eachItem.count,
    gender: eachItem.gender,
  })

  getCovidData = async () => {
    this.setState({apiStatus: constants.loading})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const SevenDaysData = data.last_7_days_vaccination.map(eachObject =>
        this.sevenDaysConvertion(eachObject),
      )
      const ageDetails = data.vaccination_by_age.map(eachItem =>
        this.ageDetailsConvertion(eachItem),
      )

      const genderDetails = data.vaccination_by_gender.map(eachItem =>
        this.gendeDetailsConvertion(eachItem),
      )

      this.setState({
        ageList: ageDetails,
        genderList: genderDetails,
        coverageList: SevenDaysData,
        apiStatus: constants.success,
      })
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" width={50} height={50} color="#ffffff" />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.failure:
        return this.renderFailure()
      case constants.success:
        return this.renderSuccess()
      case constants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {ageList, genderList, coverageList} = this.state
    return (
      <div className="first-container">
        <div>
          <VaccinationCoverage coverageList={coverageList} />
          <VaccinationByGender genderList={genderList} />
          <VaccinationByAge ageList={ageList} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="whole-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-image"
          />
          <h1 className="logo-name">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        {this.renderStatus()}
      </div>
    )
  }
}

export default CowinDashboard
