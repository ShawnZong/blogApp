import React, { useEffect } from 'react'
// components
import { useDispatch } from 'react-redux'
import {
  resetNotification,
  setNotification,
} from '../reducers/notificationReducer'

// backend
import signupService from '../services/signup'

// style
import { Button, Form } from 'react-bootstrap'
import { Formik, useField } from 'formik'
import * as yup from 'yup'

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
const SignupForm = () => {
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
    } catch (e) {
      dispatch(setNotification('username exists', 'danger', 5))
    }
  }
  const schema = yup.object({
    username: yup.string().required().min(3),
    nickname: yup.string().required().min(3),
    password: yup.string().required().min(3),
  })
  return (
    <div>
      <h2>Sign Up</h2>
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
            <TextInput
              label="Username"
              name="username"
              type="text"
              placeholder="username"
            />
            <TextInput
              label="Nickname"
              name="nickname"
              type="text"
              placeholder="nickname"
            />
            <TextInput
              label="Password"
              name="password"
              type="text"
              placeholder="password"
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export { SignupForm }

// import React from 'react'
// import { Formik, Form, useField } from 'formik'
// import * as Yup from 'yup'

// const MyTextInput = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input>. We can use field meta to show an error
//   // message if the field is invalid and it has been touched (i.e. visited)
//   const [field, meta] = useField(props)
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className="text-input" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   )
// }

// const MyCheckbox = ({ children, ...props }) => {
//   // React treats radios and checkbox inputs differently other input types, select, and textarea.
//   // Formik does this too! When you specify `type` to useField(), it will
//   // return the correct bag of props for you -- a `checked` prop will be included
//   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
//   const [field, meta] = useField({ ...props, type: 'checkbox' })
//   return (
//     <div>
//       <label className="checkbox-input">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   )
// }

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props)
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   )
// }

// // And now we can use these
// const SignupForm = () => {
//   return (
//     <>
//       <h1>Subscribe!</h1>
//       <Formik
//         initialValues={{
//           firstName: '',
//           lastName: '',
//           email: '',
//           acceptedTerms: false, // added for our checkbox
//           jobType: '', // added for our select
//         }}
//         validationSchema={Yup.object({
//           firstName: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('Required'),
//           lastName: Yup.string()
//             .max(20, 'Must be 20 characters or less')
//             .required('Required'),
//           email: Yup.string()
//             .email('Invalid email address')
//             .required('Required'),
//           acceptedTerms: Yup.boolean()
//             .required('Required')
//             .oneOf([true], 'You must accept the terms and conditions.'),
//           jobType: Yup.string()
//             .oneOf(
//               ['designer', 'development', 'product', 'other'],
//               'Invalid Job Type',
//             )
//             .required('Required'),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2))
//             setSubmitting(false)
//           }, 400)
//         }}
//       >
//         <Form>
//           <MyTextInput
//             label="First Name"
//             name="firstName"
//             type="text"
//             placeholder="Jane"
//           />

//           <MyTextInput
//             label="Last Name"
//             name="lastName"
//             type="text"
//             placeholder="Doe"
//           />

//           <MyTextInput
//             label="Email Address"
//             name="email"
//             type="email"
//             placeholder="jane@formik.com"
//           />

//           <MySelect label="Job Type" name="jobType">
//             <option value="">Select a job type</option>
//             <option value="designer">Designer</option>
//             <option value="development">Developer</option>
//             <option value="product">Product Manager</option>
//             <option value="other">Other</option>
//           </MySelect>

//           <MyCheckbox name="acceptedTerms">
//             I accept the terms and conditions
//           </MyCheckbox>

//           <button type="submit">Submit</button>
//         </Form>
//       </Formik>
//     </>
//   )
// }

// export { SignupForm }
