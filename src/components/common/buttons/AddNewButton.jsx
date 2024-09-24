import React from 'react'
import Button from '@mui/material/Button'
import { PlusOutlined } from '@ant-design/icons'

const AddNewButton = (props) => {
  return (
    <Button variant="contained" startIcon={<PlusOutlined />} {...props}>
      Add new
    </Button>
  )
}

export default AddNewButton
