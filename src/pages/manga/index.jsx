import { useMemo, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

import _get from 'lodash/get'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'

import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import RowPerPageSelector from 'components/common/dropdowns/RowPerPageSelector '
import PaginationControl from 'components/common/navigation/PaginationControl'
import { MoreOutlined } from '@ant-design/icons'
import { useMangas, useUploadMangas } from 'hooks/useMangas'

import SearchBar from 'components/common/inputs/SearchBar'
import SortOptions from 'components/common/dropdowns/SortOptions'
import AddNewButton from 'components/common/buttons/AddNewButton'
import UploadButton from 'components/common/buttons/UploadButton'
import EmptyData from 'components/common/skeletons/EmptyData'
import { MANGA_PAGE_SIZE, CURRENT_PAGE } from 'constants'

export default function Manga() {
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

  const [row, setRow] = useState(Number(searchParams.get('pageSize')) || MANGA_PAGE_SIZE)
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('currentPage')) || CURRENT_PAGE)
  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt-desc')
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q'))
  const [inputValue, setInputValue] = useState(searchKeyword)

  const sortBy = useMemo(() => sort.split('-')[0], [sort])
  const sortOrder = useMemo(() => sort.split('-')[1], [sort])

  const { data: mangas, isLoading: isGettingMangas, mutate: refetchMangas } = useMangas(row, currentPage, searchKeyword, sortBy, sortOrder)
  const { uploadMangas, isLoading: isUploading } = useUploadMangas()

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      await uploadMangas(file)
      refetchMangas()
    }
  }

  return (
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
              <AddNewButton />
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
              <Card variant="outlined" sx={{ height: '100%', '&:hover': { cursor: 'pointer', boxShadow: theme.shadows[10] } }}>
                <CardHeader
                  title={_get(manga, 'name', '')}
                  subheader={format(parseISO(_get(manga, 'createdAt')), 'MMMM dd, yyyy')}
                  action={
                    <IconButton aria-label="settings">
                      <MoreOutlined />
                    </IconButton>
                  }
                />
                <CardMedia component="img" height="194" image={_get(manga, 'image.url', '')} alt="Paella dish" />
                <CardContent>
                  <Typography textTransform="uppercase" color={theme.palette.grey[500]}>
                    {_get(manga, 'author.name', '')}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={400}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {_get(manga, 'description', '')}
                  </Typography>
                </CardContent>
              </Card>
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
            <RowPerPageSelector row={row} onChange={handleChangeRow} />
          </Grid>
          <Grid item>
            <PaginationControl count={_get(mangas, 'page._totalPages', 0)} page={currentPage} onChange={handleChangePage} />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}
