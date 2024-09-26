import Pagination from '@mui/material/Pagination'
import { CURRENT_PAGE } from 'constants'
import { useCallback, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUpdateParams } from 'utils/updateParams'

const PaginationControl = ({ count }) => {
  const updateParams = useUpdateParams()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('currentPage')) || CURRENT_PAGE)

  const handleChangePage = useCallback(
    (event, value) => {
      setCurrentPage(value)
      updateParams({ currentPage: value })
    },
    [updateParams],
  )

  useEffect(() => {
    const newPage = Number(searchParams.get('currentPage')) || CURRENT_PAGE
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
    }
  }, [searchParams, currentPage])

  return <Pagination count={count} showFirstButton showLastButton page={currentPage} onChange={handleChangePage} />
}

export default PaginationControl
