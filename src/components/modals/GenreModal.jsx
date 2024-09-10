import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { alpha, styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import InputBase from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import { useApiContext } from 'contexts/ApiContext'
import { GENRES_API } from 'api/constants'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapInput = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}))

const schema = yup.object({
  genre_name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  description: yup.string(),
})

const GenreModal = (props) => {
  const { open, handleClose } = props
  const { fetchData, data, loading, error } = useApiContext()
  const id = typeof open === 'string' && open
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset = () => {
    reset({ description: '', genre_name: '' })
  }

  const onSubmit = async (data) => {
    await createData(GENRES_API, data)
    handleClose()
    onReset()
  }

  useEffect(() => {
    if (id) {
      fetchData(`${GENRES_API}/${id}`)
    }
  }, [id])

  return (
    <BootstrapDialog maxWidth="sm" fullWidth scroll="body" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2, fontSize: '1rem', fontWeight: 500 }} id="customized-dialog-title">
        Create genre
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseOutlined />
      </IconButton>
      <DialogContent dividers sx={{ overflow: 'hidden' }}>
        <Stack spacing={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
              Name
            </InputLabel>
            <Controller
              name="genre_name"
              control={control}
              render={({ field }) => (
                <BootstrapInput
                  {...field}
                  sx={{ '& > input': { width: '100% !important' } }}
                  id="bootstrap-input"
                  placeholder="Enter Name..."
                  error={!!errors.genre_name}
                  helperText={errors.genre_name ? errors.genre_name.message : ''}
                />
              )}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
              Description
            </InputLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <BootstrapInput {...field} sx={{ '& > textarea': { width: '100% !important' } }} multiline rows={4} />}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: '1.5rem !important' }}>
        <Button
          color="error"
          onClick={() => {
            onReset()
            handleClose()
          }}
        >
          Cancel
        </Button>
        <LoadingButton loading={loading} loadingPosition="start" startIcon={<SaveOutlined />} variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default GenreModal
