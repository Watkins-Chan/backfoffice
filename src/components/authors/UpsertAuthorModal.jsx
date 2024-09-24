import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import useTheme from '@mui/material/styles/useTheme'
import Avatar from '@mui/material/Avatar'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton'
import { CloseOutlined, SaveOutlined, CameraOutlined } from '@ant-design/icons'

import BootstrapDialog from 'components/common/modals/BootstrapDialog'
import BootstrapInput from 'components/common/inputs/BootstrapInput'
import { data } from './fakeData'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  author_name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  description: yup.string(),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phone: yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'),
  works: yup.array(),
})

const UpsertAuthorModal = (props) => {
  const { open, handleClose, refetchGenres } = props
  const theme = useTheme()
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
    reset({ description: '', author_name: '', email: '', phone: '', works: [] })
  }

  const onSubmit = (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  return (
    <BootstrapDialog maxWidth="md" fullWidth scroll="body" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" marginTop={3} position="relative">
              <Box
                sx={{
                  position: 'relative',
                  '&:hover .hover-box': {
                    opacity: 1,
                  },
                }}
              >
                <Avatar
                  alt="Avatar"
                  src="https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg"
                  sx={{ width: 72, height: 72, border: `thin dashed ${theme.palette.primary.main}`, cursor: 'pointer', zIndex: 1 }}
                />
                <Box
                  className="hover-box"
                  sx={{
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                >
                  <Box textAlign="center" color="#fff">
                    <CameraOutlined style={{ fontSize: '2rem' }} />
                    <Typography>Upload</Typography>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
                    Name
                  </InputLabel>
                  <Controller
                    name="author_name"
                    control={control}
                    render={({ field }) => (
                      <BootstrapInput
                        {...field}
                        sx={{ '& > input': { width: '100% !important' } }}
                        id="bootstrap-input"
                        placeholder="Enter Name..."
                        error={!!errors.author_name}
                        helperText={errors.author_name ? errors.author_name.message : ''}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
                    Email
                  </InputLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <BootstrapInput
                        {...field}
                        sx={{ '& > input': { width: '100% !important' } }}
                        id="bootstrap-input"
                        placeholder="....."
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
                    Phone Number
                  </InputLabel>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <BootstrapInput
                        {...field}
                        sx={{ '& > input': { width: '100% !important' } }}
                        id="bootstrap-input"
                        placeholder="....."
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ''}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
                    Summary
                  </InputLabel>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <BootstrapInput {...field} sx={{ '& > textarea': { width: '100% !important' } }} multiline rows={4} />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: '1rem' }}>
                    Works
                  </InputLabel>
                  <Controller
                    name="works"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        multiple
                        sx={{ marginTop: 3 }}
                        options={data}
                        getOptionLabel={(option) => option.title}
                        value={field.value || []}
                        onChange={(_, value) => field.onChange(value)}
                        filterSelectedOptions
                        renderInput={(params) => <BootstrapInput {...params} placeholder="...." />}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
        <LoadingButton
          //   loading={isCreating || isUpdating}
          loadingPosition="start"
          startIcon={<SaveOutlined />}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default UpsertAuthorModal
