import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSearchParams } from 'react-router-dom'

import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'

import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import { useCreateGenre, useUpdateGenre, useGenre, useGenres } from 'hooks/genres/useGenres'
import BootstrapDialog from 'components/common/modals/BootstrapDialog'
import BootstrapInput from 'components/common/inputs/BootstrapInput'

const schema = yup.object({
  genre_name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  description: yup.string(),
})

const UpsertGenreModal = (props) => {
  const { open, handleClose, refetchGenres } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const id = typeof open === 'string' && open

  const sort = searchParams.get('sort') || 'createdAt-desc'
  const sortBy = sort ? sort.split('-')[0] : null
  const sortOrder = sort ? sort.split('-')[1] : null
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const keyword = searchParams.get('q') || ''

  const { createGenre, isLoading: isCreating } = useCreateGenre()
  const { updateGenre, isLoading: isUpdating } = useUpdateGenre()
  const { data: genre } = useGenre(id)

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
    const switchApi = id ? updateGenre(id, data) : createGenre(data)
    await switchApi
    refetchGenres()
    handleClose()
    onReset()
  }

  useEffect(() => {
    if (!_isEmpty(genre)) {
      reset({ genre_name: _get(genre, 'genre_name', ''), description: _get(genre, 'description', '') })
    }
  }, [genre])

  return (
    <BootstrapDialog maxWidth="sm" fullWidth scroll="body" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2, fontSize: '1rem', fontWeight: 500 }} id="customized-dialog-title">
        {id ? 'Edit' : 'Create'}
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
        <LoadingButton loading={isCreating || isUpdating} loadingPosition="start" startIcon={<SaveOutlined />} variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default UpsertGenreModal
