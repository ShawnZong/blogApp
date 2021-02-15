import React, { useEffect, useState } from 'react'
import { Notification } from '../components/Notification'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'
import { userLogin, userLogout } from '../reducers/loginReducer'

import { Button, Form } from 'react-bootstrap'
import '../css/HomePage.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetNotification())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({ username: username, password: password }))
  }

  return (
    <div>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            required
            id="loginUsername"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            required
            id="loginPwd"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            className="btn-block btn-color"
            id="loginButton"
            type="submit"
          >
            Log In
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const LogOutButton = ({ username }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetNotification())
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }
  return (
    <div>
      <span className="text-white">{username} logged in </span>
      <Button className="btn-muted" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  )
}

LogOutButton.propTypes = {
  username: PropTypes.string.isRequired,
}
export { LoginForm, LogOutButton }
