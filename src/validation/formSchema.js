import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string()
    .required('Title is a required field')
    .min(3, 'Title must be 3 characters or longer'),
    description: yup.string()
    .required('Description is required field'),
    curriculum: yup.string()
    .oneOf(['Lambda Launch', 'Web Applications I', 
    'Web Applications II', 'Web API: Node',
    'Web API: Jave', 'Computer Science', 'Lambda Labs', 'Lambda X'], 
    'Curriculum is required'),
    status: yup.string()
    .oneOf(['student', 'helper'], 'Status status is required field'),
  // we are done with checkboxes
  google: yup.boolean(),
  stackoverflow: yup.boolean(),
  other: yup.boolean(),
})
