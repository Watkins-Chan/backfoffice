import React, { useState, useCallback, memo, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import _get from 'lodash/get'

import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'

import { useTheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

import GenreTable from 'components/tables/GenreTable'
import GenreModal from 'components/modals/GenreModal'
import { useURLParams } from 'customHooks/useURLParams'
import { useGenres, useUploadGenres } from 'apiHooks/useGenres'

function Genres() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [row, setRow] = useState(() => Number(searchParams.get('pageSize')) || 10)
  const [currentPage, setCurrentPage] = useState(() => Number(searchParams.get('currentPage')) || 1)
  const [sort, setSort] = useState(() => searchParams.get('sort') || 'createdAt-desc')
  const [searchKeyword, setSearchKeyword] = useState(() => searchParams.get('q') || '')
  const [inputValue, setInputValue] = useState(searchKeyword)

  const [openModal, setOpenModal] = useState(false)

  const sortBy = sort ? sort.split('-')[0] : null
  const sortOrder = sort ? sort.split('-')[1] : null

  const { data: genres, error, isLoading: isGettingGenres, mutate } = useGenres(row, currentPage, searchKeyword, sortBy, sortOrder)
  const { uploadGenres, isLoading } = useUploadGenres()

  const handleClickOpenModal = useCallback(() => setOpenModal(true), [])
  const handleCloseModal = useCallback(() => setOpenModal(false), [])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      await uploadGenres(file)
      mutate()
    }
  }

  const handleChangeSort = useCallback(
    (event) => {
      const value = event.target.value
      setSort(value)
      setCurrentPage(1)
      setSearchParams({ ...Object.fromEntries(searchParams), sort: value, currentPage: 1 })
    },
    [searchParams, setSearchParams],
  )

  const handleChangeRow = useCallback(
    (event) => {
      const newPageSize = event.target.value
      setRow(newPageSize)
      setCurrentPage(1)
      setSearchParams({ ...Object.fromEntries(searchParams), pageSize: newPageSize, currentPage: 1 })
    },
    [searchParams, setSearchParams],
  )

  const handleChangePage = useCallback(
    (event, value) => {
      setCurrentPage(value)
      setSearchParams({ ...Object.fromEntries(searchParams), currentPage: value })
    },
    [searchParams, setSearchParams],
  )

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSearch = useCallback(() => {
    setSearchKeyword(inputValue.trim())
    setCurrentPage(1)
    setSearchParams({ ...Object.fromEntries(searchParams), q: inputValue.trim(), currentPage: 1 })
  }, [inputValue, searchParams, setSearchParams])

  return (
    <React.Fragment>
      <Card variant="outlined">
        <Box p={2}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md="auto">
              <Box display="flex" alignItems="center">
                <TextField
                  placeholder="Search..."
                  variant="outlined"
                  fullWidth
                  value={inputValue}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <SearchOutlined />,
                  }}
                />
                <Button sx={{ marginLeft: 2 }} variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center">
                <FormControl fullWidth sx={{ width: 200 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select label="Sort by" value={sort} onChange={handleChangeSort}>
                    <MenuItem value="name-asc">A-Z</MenuItem>
                    <MenuItem value="name-desc">Z-A</MenuItem>
                    <MenuItem value="createdAt-desc">Newest</MenuItem>
                    <MenuItem value="createdAt-asc">Oldest</MenuItem>
                  </Select>
                </FormControl>
                <Button sx={{ marginX: 2 }} variant="contained" startIcon={<PlusOutlined />} onClick={handleClickOpenModal}>
                  Add
                </Button>
                <Tooltip title="Upload file">
                  <IconButton component="label">
                    <input type="file" hidden onChange={handleFileUpload} accept=".xlsx" />
                    <UploadOutlined />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <GenreTable loading={isGettingGenres} genres={_get(genres, 'data', [])} />
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
              <Pagination count={_get(genres, 'page._totalPages', 0)} showFirstButton showLastButton page={currentPage} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Box>
      </Card>
      <GenreModal open={openModal} handleClose={handleCloseModal} />
    </React.Fragment>
  )
}

export default memo(Genres)
