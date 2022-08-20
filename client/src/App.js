import './App.css'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [position, setPosition] = useState('')
  const [country, setCountry] = useState('')
  const [wage, setWage] = useState(0)
  const [employees, setEmployees] = useState([])

  const addEmployee = () => {
    axios.post(
      'http://localhost:3001/create', 
      { name, age, position, country, wage }
    )
    .then((res) => {
      setEmployees((prevEmployees) => {
        return [...prevEmployees, { id: res.data.insertId, name, age, position, country, wage }]
      })
    })
    .catch((err) => console.log(err))
  }

  const getEmployees = () => {
    axios.get('http://localhost:3001/employees')
    .then((res) => setEmployees(res.data))
    .catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <div className='information'>
        <label>Name</label>
        <input type='text' onChange={(e) => setName(e.target.value)}/>
        <label>Age</label>
        <input type='number' onChange={(e) => setAge(e.target.value)}/>
        <label>Position</label>
        <input type='text' onChange={(e) => setPosition(e.target.value)}/>
        <label>Country</label>
        <input type='text' onChange={(e) => setCountry(e.target.value)}/>
        <label>Wage (year)</label>
        <input type='number' onChange={(e) => setWage(e.target.value)}/>
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className='employees'>
        <button onClick={getEmployees}>Show Employees</button>
        <table className='employees-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Position</th>
              <th>Country</th>
              <th>Wage</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? 
              employees.map((employee, idx) => {
                return <tr key={idx}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>{employee.position}</td>
                  <td>{employee.country}</td>
                  <td>{employee.wage}</td>
                </tr>
              }) :
              <tr>
                <td colSpan={6}>No employees found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App
