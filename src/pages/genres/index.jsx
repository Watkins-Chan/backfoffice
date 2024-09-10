import React, { useCallback, useEffect, useState, memo } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import GenreModal from 'components/modals/GenreModal'
import GenreTable from 'components/tables/GenreTable'
import { useApiContext } from 'contexts/ApiContext'

function Genres() {
  const { data, loading, error, fetchData } = useApiContext()
  const [sort, setSort] = useState('')
  const [row, setRow] = useState(10)
  const [openModal, setOpenModal] = useState(false)

  const handleClickOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  const handleChangeSort = (event) => {
    setSort(event.target.value)
  }

  const handleChangeRow = (event) => {
    setRow(event.target.value)
  }

  useEffect(() => {
    fetchData('http://localhost:3001/genres')
  }, [])

  return (
    <React.Fragment>
      <Card variant="outlined">
        <Box p={2}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md="auto">
              <TextField
                placeholder="Search..."
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <SearchOutlined />,
                }}
              />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center">
                <FormControl fullWidth sx={{ width: 200 }}>
                  <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sort} label="Sort by" onChange={handleChangeSort}>
                    <MenuItem value={10}>A-Z</MenuItem>
                    <MenuItem value={20}>Z-A</MenuItem>
                  </Select>
                </FormControl>
                <Button sx={{ marginX: 2 }} variant="contained" startIcon={<PlusOutlined />} onClick={handleClickOpenModal}>
                  Add
                </Button>
                <Tooltip title="Upload file">
                  <IconButton>
                    <UploadOutlined />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <GenreTable genres={data} />
        <Box p={2}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <Stack direction="row" alignItems="center">
                <Typography variant="caption" color="textSecondary" mr={1}>
                  Row per page
                </Typography>
                <FormControl sx={{ '& > div': { fontSize: '0.75rem', maxWidth: 64 } }}>
                  <Select size="small" value={row} onChange={handleChangeRow}>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item>
              <Pagination count={10} showFirstButton showLastButton />
            </Grid>
          </Grid>
        </Box>
      </Card>
      <GenreModal open={openModal} handleClose={handleCloseModal} />
    </React.Fragment>
  )
}

export default memo(Genres)
