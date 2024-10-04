import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSearchParams } from 'react-router-dom'

import _get from 'lodash/get'
import _lowerCase from 'lodash/lowerCase'
import _forEach from 'lodash/forEach'

import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import BootstrapDialog from 'components/common/modals/BootstrapDialog'
import BootstrapInput from 'components/common/inputs/BootstrapInput'
import { useCreateManga, useUpdateManga } from 'hooks/useMangas'
import { useAuthors } from 'hooks/useAuthors'
import { useGenres } from 'hooks/useGenres'

const statusOptions = ['PROCESSING', 'COMPLETED']

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  author: yup.object().required('Author is required'),
})

const UpsertMangaModal = (props) => {
  const { idManga, handleClose, refetchMangas } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const open = idManga !== null

  const { createManga, isLoading: isCreating } = useCreateManga()
  const { updateManga, isLoading: isUpdating } = useUpdateManga()
  const { data: authors, isLoading: isGettingAuthors } = useAuthors()
  const { data: genres, isLoading: isGettingGenres } = useGenres()

  const [useImageUrl, setUseImageUrl] = useState(false)
  const [preview, setPreview] = useState(null)

  const resetFields = () => {
    setPreview(null)
  }

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleToggle = () => {
    setUseImageUrl((prev) => !prev)
    if (useImageUrl) {
      resetField('imageUrl')
      setPreview(null)
    } else {
      resetField('image')
      setPreview(null)
    }
  }

  const handleImageUrlChange = (url) => {
    setPreview(url)
  }

  const handleFileChange = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
    } else {
      setPreview(null)
    }
  }

  const onReset = () => {
    reset({ description: '', name: '', image: null, imageUrl: '', author: null })
    setUseImageUrl(false)
    setPreview(null)
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('name', _get(data, 'name', ''))
    formData.append('description', _get(data, 'description', ''))
    formData.append('status', _lowerCase(data.status))
    formData.append('author', _get(data, 'author._id', ''))
    _forEach(_get(data, 'genres', []), (genre) => formData.append('genres[]', _get(genre, '_id', '')))
    if (useImageUrl) {
      formData.append('imageUrl', _get(data, 'imageUrl'))
    } else {
      formData.append('image', _get(data, 'image'))
    }
    await createManga(formData)
    refetchMangas()
    handleClose()
  }

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  return (
    <BootstrapDialog maxWidth="sm" fullWidth scroll="body" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2, fontSize: '1rem', fontWeight: 500 }} id="customized-dialog-title">
        {idManga ? 'Edit' : 'Add New'}
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
              name="name"
              control={control}
              render={({ field }) => (
                <BootstrapInput
                  {...field}
                  sx={{ '& > input': { width: '100% !important' } }}
                  id="bootstrap-input"
                  placeholder="Enter Name..."
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
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
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
              Author
            </InputLabel>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, data) => field.onChange(data)}
                  sx={{ marginTop: '1.5rem' }}
                  options={_get(authors, 'data') || []}
                  getOptionLabel={(option) => option.author_name}
                  loading={isGettingAuthors}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="author-autocomplete"
                      placeholder="Select Author..."
                      error={!!errors.author}
                      helperText={errors.author ? errors.author.message : ''}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isGettingAuthors ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
              Genres
            </InputLabel>
            <Controller
              name="genres"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, data) => field.onChange(data)}
                  sx={{ marginTop: '1.5rem' }}
                  multiple
                  filterSelectedOptions
                  options={_get(genres, 'data') || []}
                  getOptionLabel={(option) => option.genre_name}
                  loading={isGettingGenres}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="author-autocomplete"
                      placeholder="Select Genres..."
                      error={!!errors.genres}
                      helperText={errors.genres ? errors.genres.message : ''}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isGettingGenres ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
              Status
            </InputLabel>
            <Controller
              name="status"
              control={control}
              defaultValue={statusOptions[0]}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, data) => field.onChange(data)}
                  sx={{ marginTop: '1.5rem' }}
                  options={statusOptions}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField {...params} placeholder="Select status..." error={!!errors.status} helperText={errors.status ? errors.status.message : ''} />}
                />
              )}
            />
          </FormControl>
          <FormControlLabel
            sx={{ width: 'fit-content' }}
            control={<Switch checked={useImageUrl} onChange={handleToggle} name="useImageUrl" color="primary" />}
            label={useImageUrl ? 'Use Image URL' : 'Upload Image'}
          />
          {useImageUrl ? (
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="image-url-input" sx={{ fontSize: '1rem' }}>
                Image URL
              </InputLabel>
              <Controller
                name="imageUrl"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <BootstrapInput
                      {...field}
                      id="image-url-input"
                      placeholder="Enter Image URL..."
                      error={!!errors.imageUrl}
                      helperText={errors.imageUrl ? errors.imageUrl.message : ''}
                      fullWidth
                      onChange={(e) => {
                        field.onChange(e.target.value)
                        handleImageUrlChange(e.target.value)
                      }}
                    />
                    {preview && <img src={preview} alt="Image Preview" style={{ marginTop: '1rem', maxWidth: 250, height: 'auto' }} />}
                  </>
                )}
              />
            </FormControl>
          ) : (
            <FormControl variant="standard" sx={{ width: 'fit-content' }}>
              <InputLabel shrink htmlFor="image-upload" sx={{ fontSize: '1rem' }}>
                Upload Image
              </InputLabel>
              <Controller
                name="image"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        field.onChange(file)
                        handleFileChange(file)
                      }}
                      style={{ marginTop: '1.5rem' }}
                    />
                    {errors.image && <Typography color="error">{errors.image.message}</Typography>}
                    {preview && <img src={preview} alt="Image Preview" style={{ marginTop: '1rem', maxWidth: 250, height: 'auto' }} />}
                  </>
                )}
              />
            </FormControl>
          )}
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
        <LoadingButton loading={isCreating} loadingPosition="start" startIcon={<SaveOutlined />} variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default UpsertMangaModal
