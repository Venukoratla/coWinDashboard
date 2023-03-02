// Write your code here
import {
  Bar,
  ResponsiveContainer,
  BarChart,
  Legend,
  XAxis,
  YAxis,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {coverageList} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()} K`
    }
    return number
  }

  return (
    <div className="coverage-container">
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer height={300} width={1000}>
        <BarChart data={coverageList}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: '#94a3b8', strokeWidth: 0.5}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: '#94a3b8', strokeWidth: 0.5}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="doseOne" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="doseTwo" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
