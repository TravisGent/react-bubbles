import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../styles.scss";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChanges = event => {
    this.setState({
      credentials: {
          ...this.state.credentials,
          [event.target.name]: event.target.value
      }
    });
  };

  login = event => {
    event.preventDefault();

    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(response => {
        window.localStorage.setItem("token", response.data.payload)
        this.props.history.push("/api/colors")
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h1>Login To See Data</h1>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChanges} 
            className="inputField"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChanges} 
            className="inputField"
            placeholder="Password"
          />
          <button className="loginButton">Log In</button>
        </form>
      </div>
    )
  }
}

export default Login;