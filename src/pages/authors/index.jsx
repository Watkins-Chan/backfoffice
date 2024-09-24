import React, { useMemo, memo, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import _map from 'lodash/map'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'

import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import SearchBar from 'components/common/inputs/SearchBar'
import SortOptions from 'components/common/dropdowns/SortOptions'
import AddNewButton from 'components/common/buttons/AddNewButton'
import PaginationControl from 'components/common/navigation/PaginationControl'
import RowPerPageSelector from 'components/common/dropdowns/RowPerPageSelector '
import MenuActions from 'components/common/dropdowns/MenuActions'
import DeleteModal from 'components/common/modals/DeleteModal'
import CardInfo from 'components/authors/CardInfo'
import { useMenuActions } from 'contexts/MenuActionsContext'
import { useHandleDeleteModal } from 'contexts/DeleteModalContext'
import UpsertAuthorModal from 'components/authors/UpsertAuthorModal'
import { useAuthors } from 'hooks/useAuthors'

const Authors = () => {
  const { openPopover, closePopover } = useMenuActions()
  const { openDeleteModal, handleOpenDeleteModal } = useHandleDeleteModal()
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedId, setSelectedId] = useState(null)
  const [openUpsertModal, setOpenUpsertModal] = useState(false)

  const [row, setRow] = useState(Number(searchParams.get('pageSize')) || 10)
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('currentPage')) || 1)
  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt-desc')
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q'))
  const [inputValue, setInputValue] = useState(searchKeyword)

  const sortBy = useMemo(() => sort.split('-')[0], [sort])
  const sortOrder = useMemo(() => sort.split('-')[1], [sort])

  const { data: authors, isLoading: isGettingAuthors, mutate: refetchAuthors } = useAuthors(row, currentPage, searchKeyword, sortBy, sortOrder)

  const handleOpenUpsertModal = useCallback(() => setOpenUpsertModal(true), [])
  const handleCloseUpsertModal = useCallback(() => setOpenUpsertModal(false), [])

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

  const actions = [
    {
      name: 'Export PDF',
      func: () => {
        console.log('Export PDF'), closePopover()
      },
    },
    {
      name: 'Edit',
      func: () => {
        console.log('Edit'), closePopover()
      },
    },
    {
      name: 'Delete',
      func: () => {
        handleOpenDeleteModal(selectedId), closePopover()
      },
    },
  ]

  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Box>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md="auto">
              <SearchBar inputValue={inputValue} onChange={handleInputChange} onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SortOptions sort={sort} onChange={handleChangeSort} />
                <AddNewButton onClick={handleOpenUpsertModal} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {isGettingAuthors && (
              <Grid item xs={12}>
                <Typography>Loading...</Typography>
              </Grid>
            )}
            {_map(_get(authors, 'data', []), (author, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <CardInfo
                  data={author}
                  onOpenMenu={(event) => {
                    openPopover(event, index + 1), setSelectedId(index + 1)
                  }}
                />
              </Grid>
            ))}
            {!isGettingAuthors && _isEmpty(_get(authors, 'data', [])) && (
              <Grid item xs={12}>
                <Box p={6}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Box>
                        <Box position="relative">
                          <Card
                            sx={{
                              borderRadius: 2,
                              boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                              '&:hover': { boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px' },
                            }}
                          >
                            <CardContent>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Stack direction="row" alignItems="center">
                                    <Avatar />
                                    <Stack pl={2.5} width="100%">
                                      <Skeleton width="80%" height="20px" />
                                      <Skeleton width="40%" height="20px" />
                                    </Stack>
                                  </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                  <Skeleton width="45px" height="20px" />
                                  <Skeleton height="20px" />
                                  <Stack direction="row" spacing={1}>
                                    <Skeleton width="90px" height="20px" />
                                    <Skeleton width="38px" height="20px" />
                                  </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid container spacing={1}>
                                      <Grid item>
                                        <Skeleton width="40px" height="20px" />
                                      </Grid>
                                      <Grid item>
                                        <Skeleton width="20px" height="20px" />
                                      </Grid>
                                    </Grid>
                                    <Skeleton width="47px" height="32px" />
                                  </Stack>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Box>
                        <Box position="relative" top={-120} left={72}>
                          <Card
                            sx={{
                              borderRadius: 2,
                              boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                              '&:hover': { boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px' },
                            }}
                          >
                            <CardContent>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Stack direction="row" alignItems="center">
                                    <Avatar />
                                    <Stack pl={2.5} width="100%">
                                      <Skeleton width="80%" height="20px" />
                                      <Skeleton width="40%" height="20px" />
                                    </Stack>
                                  </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                  <Skeleton width="45px" height="20px" />
                                  <Skeleton height="20px" />
                                  <Stack direction="row" spacing={1}>
                                    <Skeleton width="90px" height="20px" />
                                    <Skeleton width="38px" height="20px" />
                                  </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid container spacing={1}>
                                      <Grid item>
                                        <Skeleton width="40px" height="20px" />
                                      </Grid>
                                      <Grid item>
                                        <Skeleton width="20px" height="20px" />
                                      </Grid>
                                    </Grid>
                                    <Skeleton width="47px" height="32px" />
                                  </Stack>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4" mt={-8}>
                        You have not created any data yet.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box py={2}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <RowPerPageSelector row={row} onChange={handleChangeRow} />
            </Grid>
            <Grid item>
              <PaginationControl count={_get(authors, 'page._totalPages', 0)} page={currentPage} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <MenuActions actions={actions} />
      {openDeleteModal && <DeleteModal isDeleting={false} handleDelete={() => {}} refetchGenres={() => {}} />}
      {handleCloseUpsertModal && <UpsertAuthorModal open={openUpsertModal} handleClose={handleCloseUpsertModal} />}
    </React.Fragment>
  )
}

export default memo(Authors)
