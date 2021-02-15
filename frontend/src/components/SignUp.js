import React, { useEffect, useState } from 'react'
// components
import { useDispatch } from 'react-redux'
import {
  resetNotification,
  setNotification,
} from '../reducers/notificationReducer'

// backend
import signupService from '../services/signup'

// style
import { Button, Form, Modal } from 'react-bootstrap'
import { Formik, useField } from 'formik'
import * as yup from 'yup'
import '../css/HomePage.css'

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} {...field} isInvalid={!!meta.error} />

      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  )
}
const SignupForm = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetNotification())
  }, [])

  const handleSignup = async (values) => {
    event.preventDefault()
    try {
      await signupService.signUp({
        username: values.username,
        name: values.nickname,
        password: values.password,
      })
      dispatch(resetNotification())
      props.onHide()
    } catch (e) {
      props.onHide()
      dispatch(setNotification('username exists', 'danger', 5))
    }
  }
  const schema = yup.object({
    username: yup.string().required().min(3),
    nickname: yup.string().required().min(3),
    password: yup.string().required().min(3),
  })
  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSignup}
        initialValues={{
          username: '',
          nickname: '',
          password: '',
        }}
      >
        {({ handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <TextInput label="Username" name="username" type="text" />
            <TextInput label="Nickname" name="nickname" type="text" />
            <TextInput label="Password" name="password" type="text" />
            <Button className="btn-block btn-white" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
const ModalSignUpForm = (props) => {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up 😊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignupForm onHide={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-white" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
const ModalSignUpFormButton = () => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Button
        className="btn-block btn-white"
        onClick={() => setModalShow(true)}
      >
        Sign Up
      </Button>
      <ModalSignUpForm show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}
export { SignupForm, ModalSignUpFormButton, ModalSignUpForm }
