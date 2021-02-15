import React, { useEffect, useRef } from 'react'
// components
import { Blog, BlogDetail, NewBlogForm } from './components/Blog'
import { LoginForm } from './components/LoginOut'
import { ModalSignUpFormButton } from './components/SignUp'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import { UserList, IndiUserView } from './components/User'
import { Menu } from './components/Menu'
import { ReturnButton } from './components/ReturnButton'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, insertBlog } from './reducers/blogsReducer'
import { initUser } from './reducers/loginReducer'

// react router
import { Switch, Route, useRouteMatch } from 'react-router-dom'

// style
import { ListGroup } from 'react-bootstrap'
import './css/HomePage.css'

const App = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [])

  // const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const userMatch = useRouteMatch('/users/:id')
  const userToBeViewd = userMatch
    ? userList.find((tmp) => tmp.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToBeViewd = blogMatch
    ? blogs.find((tmp) => tmp.id === blogMatch.params.id)
    : null

  const addBlog = async (newBlog) => {
    try {
      dispatch(insertBlog(newBlog))
      dispatch(
        setNotification(`a new blog ${newBlog.title} added`, 'success', 5),
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (user === null) {
    return (
      <div className="container">
        <div className="container px-4 py-5 mx-auto">
          <div className="card card0">
            <div className="d-flex flex-lg-row flex-column-reverse">
              <div className="card card1">
                <div className="row justify-content-center my-auto">
                  <div className="col-md-8 col-10 my-5">
                    <div className="row justify-content-center px-3 mb-3">
                      {' '}
                      <h1>😄</h1>
                    </div>
                    <h3 className="mb-5 text-center heading">Blog App</h3>
                    <LoginForm />
                    <ModalSignUpFormButton />
                  </div>
                </div>
                <div className="bottom text-center mb-5"></div>
              </div>
              <div className="card card2">
                <div className="my-auto mx-md-5 px-md-5 right">
                  <h3 className="text-white">By Junsheng Tan👋 </h3>{' '}
                  <small className="text-white">
                    Aalto University Master student
                  </small>
                  <br />
                  <small className="text-white">
                    Security and Cloud Computing (SECCLO)
                  </small>
                  <br />
                  <small className="text-white">
                    Erasmus Mundus Joint Master Degree
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container ">
      <div className="wholebody"></div>
      <div className="center">
        <Menu />
        <h2>Blog App</h2>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <ReturnButton />
            <BlogDetail blog={blogToBeViewd} user={user} />
          </Route>
          <Route path="/users/:id">
            <IndiUserView user={userToBeViewd} />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <div>
              <Togglable
                showLabel="create new blog"
                hideLabel="cancel"
                ref={blogFormRef}
              >
                <NewBlogForm addBlog={addBlog} />
              </Togglable>
              <ListGroup as="ul">
                <ListGroup.Item as="li" variant="info">
                  Blogs
                </ListGroup.Item>
                {blogs.map((tmpblog) => (
                  <div key={tmpblog.id}>
                    <ListGroup.Item as="li" key={tmpblog.id}>
                      {' '}
                      <Blog key={tmpblog.id} blog={tmpblog} />
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
