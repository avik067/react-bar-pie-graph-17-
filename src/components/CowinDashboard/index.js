// import {BarChart, Bar, CartesianGrid, XAxis, YAxis} from 'recharts'
import {useState, useEffect} from 'react'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const CowinDashboard = props => {
  const [data, setData] = useState({byCoverage: [], byGender: [], byAge: []})

  const getData = async () => {
    const dataCame = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const jsonData = await dataCame.json()
    console.log(jsonData)

    setData(pre => ({
      ...pre,
      byCoverage: jsonData.last_7_days_vaccination,
      byAge: jsonData.vaccination_by_age,
      byGender: jsonData.vaccination_by_gender,
    }))
  }

  useEffect(() => {
    console.log('useEffect called')
    getData()
  }, [])

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

export default CowinDashboard
