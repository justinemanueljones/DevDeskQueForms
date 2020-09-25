import React from 'react'

export default function FriendForm(props) {
  const {
    values,
    submit,
    change,
    disabled,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onChange = evt => {
    const { name, value, type, checked } = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
  }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div >
    
        <div className='errors'>
        
          <div>{errors.title}</div>
          <div>{errors.description}</div>
          <div>{errors.curriculum}</div>
          <div>{errors.status}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>Have A Question We Got Awnsers</h4>

        <label>Title&nbsp;
          <input
            value={values.title}
            onChange={onChange}
            name='title'
            type='text'
          />
        </label>

        <label>Description
          <input
            value={values.description}
            onChange={onChange}
            name='description'
            type='text'
          />
        </label>

        <label>Curriculum
          <select
            onChange={onChange}
            value={values.curriculum}
            name='curriculum'
          >
            <option value=''>- Select an option -</option>
            <option value='Lambda Launch'>Lambda Launch</option>
            <option value='Web Fundamentals'>Web Fundamentals</option>
            <option value='Web Applications II'>Web Applications II</option>
            <option value='Web API: Node'>Web API: Node</option>
            <option value='Web API: Java'>Web API: Java</option>
            <option value='Computer Science'>Computer Science</option>
            <option value='Lambda Labs'>Lambda Labs</option>
            <option value='Lambda X'>Lambda X</option>
          </select>
        </label>

        <label>Student
          <input
            type="radio"
            name="status"
            value="student"
            checked={values.status === 'student'}
            onChange={onChange}
          />
        </label>

        <label>Helper
          <input
            type='radio'
            name='status'
            value='helper'
            checked={values.status === 'helper'}
            onChange={onChange}
          />
        </label>
      </div>

      <div className='form-group checkboxes'>
        <h4>What I Tried?</h4>

        <label>Google
          <input
            type="checkbox"
            name='google'
            checked={values.google}
            onChange={onChange}
          />
        </label>

        <label>StackOverFlow
          <input
            type="checkbox"
            name="stackoverflow"
            checked={values.reading}
            onChange={onChange}
          />
        </label>
        <label>Other
          <input
            type="checkbox"
            name="other"
            checked={values.other}
            onChange={onChange}
          />
        </label>
        <h2>Submit Your Question</h2>
        <button disabled={disabled}>submit</button>
      </div>
    </form>
  )
}
