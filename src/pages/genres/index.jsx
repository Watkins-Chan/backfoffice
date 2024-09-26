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
import { useGenres, useUploadGenres } from 'hooks/useGenres'
import { PAGE_SIZE, CURRENT_PAGE } from 'constants'

const Genres = () => {
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

  const pageSize = Number(searchParams.get('pageSize')) || PAGE_SIZE
  const currentPage = Number(searchParams.get('currentPage')) || CURRENT_PAGE
  const sort = searchParams.get('sort') || 'createdAt-desc'
  const searchKeyword = searchParams.get('q')

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteAllModal, setOpenDeleteAllModal] = useState(false)

  const sortBy = useMemo(() => sort.split('-')[0], [sort])
  const sortOrder = useMemo(() => sort.split('-')[1], [sort])

  const { data: genres, error, isLoading: isGettingGenres, mutate: refetchGenres } = useGenres(pageSize, currentPage, searchKeyword, sortBy, sortOrder)
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

  return (
    <React.Fragment>
      <Card variant="outlined">
        <Box p={2}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md="auto">
              <SearchBar />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SortOptions />
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
              <RowPerPageSelector />
            </Grid>
            <Grid item>
              <PaginationControl count={_get(genres, 'page._totalPages', 0)} />
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
