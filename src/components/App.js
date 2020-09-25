import React, { useState, useEffect } from 'react'
import Friend from './Ticket'
import FriendForm from './CreateTicket'
import schema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'
const initialFormValues = {
  title: '',
  description: '',
  curriculum: '',
  status: '',
  google: false,
  stackoverflow: false,
  other: false,
}
const initialFormErrors = {
  title: '',
  description: '',
  curriculum: '',
  status: '',
}
const initialFriends = []
const initialDisabled = true

export default function App() {
  const [friends, setFriends] = useState(initialFriends)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  const getFriends = () => {
   
    axios.get('http://localhost:4000/friends')
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger 
        console.log(err)
      })
  }

  const postNewFriend = newFriend => {
    
    axios.post("http://localhost:4000/friends", newFriend)
      .then(res => {
        setFriends([...friends, res.data]) // do not do this on auto
        setFormValues(initialFormValues)
      })
      .catch(err => {
        debugger 
        console.log(err)
      })
      .finally(() => {
       
      })
  }

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => { 
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
     
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }

  const inputChange = (name, value) => {

    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newFriend = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      curriculum: formValues.curriculum.trim(),
      status: formValues.status.trim(),
      
      wit: ['google', 'stackoverflow', 'other'].filter(hob => formValues[hob]),
    }
    postNewFriend(newFriend)
  }
  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>DevdeskQue</h1></header>

      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
