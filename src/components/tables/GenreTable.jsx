import * as React from 'react'
import _map from 'lodash/map'
import _get from 'lodash/get'

import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { visuallyHidden } from '@mui/utils'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DeleteModal from 'components/modals/DeleteModal'
import GenreModal from 'components/modals/GenreModal'

function createData(name, description) {
  return {
    name,
    description,
  }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'name',
    actions: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'description',
    actions: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'actions',
    actions: true,
    disablePadding: false,
    label: 'Actions',
  },
]

function GenreTableHead(props) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.actions ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

GenreTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
}

function GenreTable(props) {
  const { genres } = props
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [openDelModal, setDelModal] = React.useState(null)
  const [openEditModal, setEditModal] = React.useState(false)

  const handleRequestSort = React.useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }, [])

  const handleOpenDelModal = (id) => {
    setDelModal(id)
  }
  const handleCloseDelModal = () => {
    setDelModal(null)
  }

  const handleOpenEditModal = (id) => {
    setEditModal(id ?? true)
  }

  const handleCloseEditModal = () => {
    setEditModal(false)
  }

  const rows = _map(genres, (genre) => createData(_get(genre, 'genre_name', ''), _get(genre, 'description', '')))

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <GenreTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `genre-table-checkbox-${index}`
              return (
                <TableRow hover tabIndex={-1} key={labelId} sx={{ cursor: 'pointer' }}>
                  <TableCell component="th" id={labelId} scope="row" padding="none" width={300}>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center" width={250}>
                    <Stack spacing={1} direction="row" justifyContent="center">
                      <IconButton color="primary" onClick={() => handleOpenEditModal(index + 1)}>
                        <EditOutlined />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleOpenDelModal(index + 1)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {openDelModal && <DeleteModal handleClose={handleCloseDelModal} open={openDelModal} />}
      {openEditModal && <GenreModal open={openEditModal} handleClose={handleCloseEditModal} />}
    </>
  )
}

export default React.memo(GenreTable)
