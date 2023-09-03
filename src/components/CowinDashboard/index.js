// import {BarChart, Bar, CartesianGrid, XAxis, YAxis} from 'recharts'
import {useState, useEffect} from 'react'
import Audio from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const CowinDashboard = () => {
  const [data, setData] = useState({
    byCoverage: [],
    byGender: [],
    byAge: [],
    status: 'loading',
  })

  const getData = async () => {
    const dataCame = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const jsonData = await dataCame.json()
    console.log(jsonData)

    if (dataCame.status === 200) {
      setData(pre => ({
        ...pre,
        byCoverage: jsonData.last_7_days_vaccination,
        byAge: jsonData.vaccination_by_age,
        byGender: jsonData.vaccination_by_gender,
        status: 'success',
      }))
    } else {
      setData(pre => ({
        ...pre,
        byCoverage: jsonData.last_7_days_vaccination,
        byAge: jsonData.vaccination_by_age,
        byGender: jsonData.vaccination_by_gender,
        status: 'failure',
      }))
    }
  }

  useEffect(() => {
    console.log('useEffect called')
    getData()
  }, [])

  const failureView = () => {
    console.log('loading')
    return (
      <div className="main-back">
        <ul>
          <li className="row align-center">
            <img
              className="web-logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="heading-first">Co-WIN</h1>
          </li>
          <li>
            <h1 className="second-head">coWin Vaccination in India</h1>
          </li>
          <li>
            <img
              className="failure-img"
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <h1 className="falure-head">Something went wrong</h1>
          </li>
        </ul>
      </div>
    )
  }

  const successView = () => {
    console.log('success view')
    return (
      <div className="main-back">
        <ul>
          <li className="row align-center">
            <img
              className="web-logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="heading-first">Co-WIN</h1>
          </li>
          <li>
            <h1 className="second-head">coWin Vaccination in India</h1>
          </li>
          <li className="common-list">
            <h1 className="heading-sub">Vaccination Coverage</h1>
            <VaccinationCoverage>{data.byCoverage}</VaccinationCoverage>
          </li>

          <li className="common-list">
            <h1 className="heading-sub">Vaccination by gender</h1>
            <VaccinationByGender>{data.byGender}</VaccinationByGender>
          </li>
          <li className="common-list">
            <h1 className="heading-sub">Vaccination by Age</h1>
            <VaccinationByAge>{data.byAge}</VaccinationByAge>
          </li>
        </ul>
      </div>
    )
  }

  const loadingView = () => {
    console.log('loading loading loading ')

    return (
      <div className="main-back" data-testid="loader">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    )
  }

  const finalRender = () => {
    const expression = data.status
    console.log('This is final render ')

    if (expression === 'loading') {
      return loadingView()
    }
    if (expression === 'success') {
      return successView()
    }
    return failureView()
  }

  return finalRender()
}

export default CowinDashboard
