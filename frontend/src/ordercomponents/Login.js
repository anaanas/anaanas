import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'admin',
      password: 'admin',
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    var url = 'https://us-central1-anaanas-dev.cloudfunctions.net/login'
    if (process.env.CLOUDFUNCTIONS == 'local') {
      url = 'http://localhost:8010/anaanas-dev/us-central1/login'
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.username,
        pass: this.state.password
      })
    }).then((resp) => {
      return resp.text();
    }).then((body) => {
      alert(body)
      if (body === 'login succeeded') {
        this.props.history.push("/ordertable");
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  render() {
    return (
      <div className="Login"  style={{ margin: 100 }} >
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
