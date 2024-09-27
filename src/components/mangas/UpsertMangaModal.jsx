import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSearchParams } from 'react-router-dom'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
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
import { useCreateManga } from 'hooks/useMangas'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  // status: yup.string().required('Status is required'),
  // author: yup.string().required('Author is required'),
  // genres: yup.array().min(1, 'At least one genre is required'),
  // image: yup.mixed(),
  // .test('fileSize', 'File size is too large (max 5MB)', (value) => {
  //   if (!value) return true
  //   return value.size <= FILE_SIZE
  // })
  // .test('fileFormat', 'Unsupported Format (jpg, jpeg, png)', (value) => {
  //   if (!value) return true
  //   return SUPPORTED_FORMATS.includes(value.type)
  // }),
  // imageUrl: yup.string().url('Must be a valid URL'),
})
// .test('oneOf', 'Either image or image URL is required', function (value) {
//   return (value.image && value.imageUrl) || (!value.image && !value.imageUrl)
// })

const UpsertMangaModal = (props) => {
  const { idManga, handleClose, refetchMangas } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const open = idManga !== null

  const { createManga, isLoading: isCreating } = useCreateManga()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset = () => {
    reset({ description: '', name: '', file: null })
  }

  const onSubmit = async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('status', 'processing')
    formData.append('author', 'Eiichiro Oda')
    // data.genres.forEach((genre) => formData.append('genres[]', genre))
    // if (data.image) {
    formData.append('image', data.image)
    // } else if (data.imageUrl) {
    formData.append('imageUrl', data.imageUrl)
    // }
    try {
      await createManga(formData)
      refetchMangas()
      handleClose()
      onReset()
    } catch (error) {
      if (data.image) {
        formData.append('image', data.image)
      }
    }
  }

  const imageOption = watch('image') ? 'file' : 'url'

  //   useEffect(() => {
  //     if (!_isEmpty(genre)) {
  //       reset({ genre_name: _get(genre, 'genre_name', ''), description: _get(genre, 'description', '') })
  //     }
  //   }, [genre])

  return (
    <BootstrapDialog maxWidth="sm" fullWidth scroll="body" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2, fontSize: '1rem', fontWeight: 500 }} id="customized-dialog-title">
        {idManga ? 'Edit' : 'Create'}
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
          <FormControlLabel
            control={<Controller name="useImageUrl" control={control} defaultValue={false} render={({ field }) => <Checkbox {...field} checked={field.value} />} />}
            label="Use Image URL instead of uploading a file"
          />
          {watch('useImageUrl') ? (
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="image-url-input" sx={{ fontSize: '1rem' }}>
                Image URL
              </InputLabel>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="image-url-input"
                    placeholder="Enter Image URL..."
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl ? errors.imageUrl.message : ''}
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          ) : (
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="image-upload" sx={{ fontSize: '1rem' }}>
                Upload Image
              </InputLabel>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        field.onChange(file)
                      }}
                      style={{ marginTop: '10px' }}
                    />
                    {errors.image && <Typography color="error">{errors.image.message}</Typography>}
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
