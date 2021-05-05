import './App.css';
import React, { Component } from 'react'
import data from './users.json';
import linkedinLogo from './linkedin.png'

export default class App extends Component {
  state = {
    search : '',
    teacher : false,
    student : false,
    campus : 'all'
  }

  ultimateHandler = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name] : value
    })
  }

  render() {

    const filteredUsers = data.filter(user => {
      return `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(this.state.search.toLowerCase())
        && (this.state.student === true ? user.role === 'student' : true)
        && (this.state.teacher === true ? user.role === 'teacher' : true)
        && (this.state.campus === "all" ? true : user.campus.includes(this.state.campus))
        // && (user.campus === this.state.campus)
    })

    return (
      <div className="IronBook">
        <h1> IronBook </h1>

        <div className="search-bar">
            <input 
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={this.ultimateHandler}
            />
            <input
            type="checkbox"
            name="teacher"
            id="teacher"
            value={this.state.teacher}
            onChange={this.ultimateHandler}
            />
            <label htmlFor="teacher">Teacher</label>
            <input
            type="checkbox"
            name="student"
            id="student"
            value={this.state.student}
            onChange={this.ultimateHandler}
            />
            <label htmlFor="student">Student</label>
            <select 
            name="campus" 
            id="campus" 
            value={this.state.campus}
            onChange={this.ultimateHandler}
            >
              <option value="all">All</option>
              <option value="Paris">Paris</option>
              <option value="Berlin">Berlin</option>
              <option value="Lisbon">Lisbon</option>
            </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
          </thead>
            <tbody>
              {filteredUsers.map((user) =>{
                return(
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.campus}</td>
                    <td>{user.role}</td>
                    <td>{user.linkedin ? <a href={user.linkedin}><img src={linkedinLogo} alt="linkedin"/></a> : ''}</td>
                  </tr>
                )
              })}
            </tbody>
        </table>
      </div>
    )
  }
}
