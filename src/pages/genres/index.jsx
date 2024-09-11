import React, { useState, useEffect, useCallback, memo } from 'react'
import _get from 'lodash/get'
import { Card, Grid, Box, Stack, Button, Select, MenuItem, FormControl, Typography, Divider, Pagination, TextField, Tooltip, IconButton } from '@mui/material'
import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import GenreTable from 'components/tables/GenreTable'
import GenreModal from 'components/modals/GenreModal'
import { GENRES_API } from 'api/constants'
import { useURLParams } from 'hooks/useURLParams'
import { useApiContext } from 'contexts/ApiContext'

function Genres() {
  const { getParam, setParam } = useURLParams()
  const { data, loading, error, fetchData, page } = useApiContext()

  const [sort, setSort] = useState('')
  const [row, setRow] = useState(() => getParam('pageSize', 10))
  const [currentPage, setCurrentPage] = useState(() => getParam('currentPage', 1))
  const [openModal, setOpenModal] = useState(false)

  const handleClickOpenModal = useCallback(() => setOpenModal(true), [])
  const handleCloseModal = useCallback(() => setOpenModal(false), [])

  const handleChangeSort = useCallback((event) => setSort(event.target.value), [])

  const handleChangeRow = useCallback(
    (event) => {
      const newPageSize = event.target.value
      setRow(newPageSize)
      setParam('pageSize', newPageSize)
    },
    [setParam],
  )

  const handleChangePage = useCallback(
    (event, value) => {
      setCurrentPage(value)
      setParam('currentPage', value)
    },
    [setParam],
  )

  useEffect(() => {
    fetchData(`${GENRES_API}?pageSize=${row}&currentPage=${currentPage}`)
  }, [row, currentPage])

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
                  <Select label="Sort by" value={sort} onChange={handleChangeSort}>
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
              <Pagination count={_get(page, '_totalPages', 0)} showFirstButton showLastButton page={currentPage} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Box>
      </Card>
      <GenreModal open={openModal} handleClose={handleCloseModal} />
    </React.Fragment>
  )
}

export default memo(Genres)
