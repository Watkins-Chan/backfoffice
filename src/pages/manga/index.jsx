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
import { useMangas, useUploadMangas, useDeleteManga } from 'hooks/useMangas'

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
import DeleteModal from 'components/common/modals/DeleteModal'
import { useHandleDeleteModal } from 'contexts/DeleteModalContext'

export default function Manga() {
  const [searchParams] = useSearchParams()
  const { openDeleteModal, handleOpenDeleteModal } = useHandleDeleteModal()

  const { openPopover, closePopover } = useMenuActions()
  const [idManga, setIdManga] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const pageSize = Number(searchParams.get('pageSize')) || MANGA_PAGE_SIZE
  const currentPage = Number(searchParams.get('currentPage')) || CURRENT_PAGE
  const sort = searchParams.get('sort') || 'createdAt-desc'
  const searchKeyword = searchParams.get('q')

  const sortBy = useMemo(() => sort.split('-')[0], [sort])
  const sortOrder = useMemo(() => sort.split('-')[1], [sort])

  const { data: mangas, isLoading: isGettingMangas, mutate: refetchMangas } = useMangas(pageSize, currentPage, searchKeyword, sortBy, sortOrder)
  const { uploadMangas, isLoading: isUploading } = useUploadMangas()
  const { deleteManga, isLoading: isDeleting } = useDeleteManga()

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      await uploadMangas(file)
      refetchMangas()
    }
  }

  const handleOpenInsertModal = useCallback((_, id) => {
    setIdManga(id ?? false)
  }, [])

  const handleOpenUpdateModal = useCallback((id) => {
    setIdManga(id)
  }, [])

  const handleCloseUpsertModal = useCallback(() => {
    setIdManga(null)
    setSelectedId(null)
  }, [])

  const actions = [
    {
      name: 'Edit',
      func: () => {
        closePopover()
        handleOpenUpdateModal(selectedId)
      },
    },
    {
      name: 'Delete',
      func: () => {
        handleOpenDeleteModal(selectedId)
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
              <SearchBar />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SortOptions />
                <UploadButton onFileUpload={handleFileUpload} isLoading={isUploading} />
                <AddNewButton onClick={handleOpenInsertModal} />
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
            {_map(_get(mangas, 'data', []), (manga, index) => {
              return (
                <Grid key={index} item xs={12} sm={4} md={3}>
                  <MangaCard
                    manga={manga}
                    onActions={(event) => {
                      openPopover(event, _get(manga, '_id', '')), setSelectedId(_get(manga, '_id', ''))
                    }}
                  />
                </Grid>
              )
            })}
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
              <PaginationControl count={_get(mangas, 'page._totalPages', 0)} />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <MenuActions actions={actions} />
      {idManga !== null && <UpsertMangaModal idManga={idManga} handleClose={handleCloseUpsertModal} refetchMangas={refetchMangas} />}
      {openDeleteModal && <DeleteModal isDeleting={isDeleting} handleDelete={() => deleteManga(selectedId)} refetchGenres={refetchMangas} />}
    </React.Fragment>
  )
}
