import React from 'react'
import { useMemo, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import _get from 'lodash/get'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import RowPerPageSelector from 'components/common/dropdowns/RowPerPageSelector '
import PaginationControl from 'components/common/navigation/PaginationControl'
import { useMangas, useUploadMangas } from 'hooks/useMangas'

import SearchBar from 'components/common/inputs/SearchBar'
import SortOptions from 'components/common/dropdowns/SortOptions'
import AddNewButton from 'components/common/buttons/AddNewButton'
import UploadButton from 'components/common/buttons/UploadButton'
import EmptyData from 'components/common/skeletons/EmptyData'
import { MANGA_PAGE_SIZE, CURRENT_PAGE } from 'constants'
import UpsertMangaModal from 'components/mangas/UpsertMangaModal'
import MangaCard from 'components/mangas/MangaCard'
import { useMenuActions } from 'contexts/MenuActionsContext'
import MenuActions from 'components/common/dropdowns/MenuActions'
import { useUpdateParams } from 'utils/updateParams'

export default function Manga() {
  const [searchParams, setSearchParams] = useSearchParams()
  const updateParams = useUpdateParams()

  const [idManga, setIdManga] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const { openPopover, closePopover } = useMenuActions()
  const pageSize = Number(searchParams.get('pageSize')) || MANGA_PAGE_SIZE
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('currentPage')) || CURRENT_PAGE)
  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt-desc')
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q'))
  const [inputValue, setInputValue] = useState(searchKeyword)

  const sortBy = useMemo(() => sort.split('-')[0], [sort])
  const sortOrder = useMemo(() => sort.split('-')[1], [sort])

  const { data: mangas, isLoading: isGettingMangas, mutate: refetchMangas } = useMangas(pageSize, currentPage, searchKeyword, sortBy, sortOrder)
  const { uploadMangas, isLoading: isUploading } = useUploadMangas()

  const handleChangeSort = useCallback(
    (event) => {
      const value = event.target.value
      setSort(value)
      setCurrentPage(1)
      updateParams({ sort: value, currentPage: 1 })
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      await uploadMangas(file)
      refetchMangas()
    }
  }

  const handleOpenUpsertModal = useCallback((_, id) => {
    setIdManga(id ?? false)
  }, [])

  const handleCloseUpsertModal = useCallback(() => {
    setIdManga(null)
  }, [])

  const actions = [
    {
      name: 'Edit',
      func: () => {
        console.log('Edit'), closePopover()
      },
    },
    {
      name: 'Delete',
      func: () => {
        closePopover()
      },
    },
  ]

  return (
    <React.Fragment>
      <Stack spacing={3}>
        <Box>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md="auto">
              <SearchBar inputValue={inputValue} onChange={handleInputChange} onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SortOptions sort={sort} onChange={handleChangeSort} />
                <UploadButton onFileUpload={handleFileUpload} isLoading={isUploading} />
                <AddNewButton onClick={handleOpenUpsertModal} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {isGettingMangas && (
              <Grid item xs={12}>
                <Typography>Loading...</Typography>
              </Grid>
            )}
            {_map(_get(mangas, 'data', []), (manga, index) => (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <MangaCard
                  manga={manga}
                  onActions={(event) => {
                    openPopover(event, index + 1), setSelectedId(index + 1)
                  }}
                />
              </Grid>
            ))}
            {!isGettingMangas && _isEmpty(_get(mangas, 'data', [])) && (
              <Grid item xs={12}>
                <EmptyData />
              </Grid>
            )}
          </Grid>
        </Box>
        <Box py={2}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <RowPerPageSelector data={[12, 24, 48, 100]} />
            </Grid>
            <Grid item>
              <PaginationControl count={_get(mangas, 'page._totalPages', 0)} page={currentPage} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <MenuActions actions={actions} />
      {idManga !== null && <UpsertMangaModal idManga={idManga} handleClose={handleCloseUpsertModal} />}
    </React.Fragment>
  )
}
