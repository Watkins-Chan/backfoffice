import React, { useState, useCallback, memo, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import _get from 'lodash/get'

import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

import GenreTable from 'components/genres/GenreTable'
import UpsertGenreModal from 'components/genres/UpsertGenreModal'
import SearchBar from 'components/common/inputs/SearchBar'
import SortOptions from 'components/common/dropdowns/SortOptions'
import UploadButton from 'components/common/buttons/UploadButton'
import PaginationControl from 'components/common/navigation/PaginationControl'
import RemoveAllButton from 'components/common/buttons/RemoveAllButton'
import RowPerPageSelector from 'components/common/dropdowns/RowPerPageSelector '
import DeleteAllGenresModal from 'components/genres/DeleteAllGenresModal'
import AddNewButton from 'components/common/buttons/AddNewButton'
import { useGenres, useUploadGenres } from 'hooks/genres/useGenres'

const Genres = () => {
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

  const [row, setRow] = useState(Number(searchParams.get('pageSize')) || 10)
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('currentPage')) || 1)
  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt-desc')
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q'))
  const [inputValue, setInputValue] = useState(searchKeyword)

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteAllModal, setOpenDeleteAllModal] = useState(false)

  const sortBy = useMemo(() => sort.split('-')[0], [sort])
  const sortOrder = useMemo(() => sort.split('-')[1], [sort])

  const { data: genres, error, isLoading: isGettingGenres, mutate: refetchGenres } = useGenres(row, currentPage, searchKeyword, sortBy, sortOrder)
  const { uploadGenres, isLoading: isUploading } = useUploadGenres()

  const handleClickOpenModal = useCallback(() => setOpenModal(true), [])
  const handleCloseModal = useCallback(() => setOpenModal(false), [])
  const handleClickOpenDeleteAllModal = useCallback(() => setOpenDeleteAllModal(true), [])
  const handleCloseDeleteAllModal = useCallback(() => setOpenDeleteAllModal(false), [])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      await uploadGenres(file)
      refetchGenres()
    }
  }

  const updateParams = useCallback(
    (newParams) => {
      const urlParams = new URLSearchParams(searchParams)
      Object.entries(newParams).forEach(([key, value]) => urlParams.set(key, value))
      setSearchParams(urlParams)
    },
    [searchParams, setSearchParams],
  )

  const handleChangeSort = useCallback(
    (event) => {
      const value = event.target.value
      setSort(value)
      setCurrentPage(1)
      updateParams({ sort: value, currentPage: 1 })
    },
    [updateParams],
  )

  const handleChangeRow = useCallback(
    (event) => {
      const newPageSize = event.target.value
      setRow(newPageSize)
      setCurrentPage(1)
      updateParams({ pageSize: newPageSize, currentPage: 1 })
    },
    [updateParams],
  )

  const handleChangePage = useCallback(
    (event, value) => {
      setCurrentPage(value)
      updateParams({ currentPage: value })
    },
    [updateParams],
  )

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    setSearchKeyword(inputValue.trim())
    setCurrentPage(1)
    updateParams({ q: inputValue.trim(), currentPage: 1 })
  }, [inputValue, searchParams, updateParams])

  return (
    <React.Fragment>
      <Card variant="outlined">
        <Box p={2}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md="auto">
              <SearchBar inputValue={inputValue} onChange={handleInputChange} onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SortOptions sort={sort} onChange={handleChangeSort} />
                <AddNewButton onClick={handleClickOpenModal} />
                <UploadButton onFileUpload={handleFileUpload} isLoading={isUploading} />
                <RemoveAllButton onOpenDeleteAllModal={handleClickOpenDeleteAllModal} disabled={_get(genres, 'data', []).length === 0} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <GenreTable loading={isGettingGenres} genres={_get(genres, 'data', [])} refetchGenres={refetchGenres} />
        <Box p={2}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <RowPerPageSelector row={row} onChange={handleChangeRow} />
            </Grid>
            <Grid item>
              <PaginationControl count={_get(genres, 'page._totalPages', 0)} page={currentPage} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Box>
      </Card>
      {openModal && <UpsertGenreModal open={openModal} handleClose={handleCloseModal} refetchGenres={refetchGenres} />}
      {openDeleteAllModal && <DeleteAllGenresModal open={openDeleteAllModal} handleClose={handleCloseDeleteAllModal} refetchGenres={refetchGenres} />}
    </React.Fragment>
  )
}

export default memo(Genres)
