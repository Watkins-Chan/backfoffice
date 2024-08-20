import * as React from 'react'
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
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DeleteModal from 'components/modals/DeleteModal'

function createData(name, description) {
  return {
    name,
    description,
  }
}

const rows = [
  createData('Cupcake', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
  createData('Donut', 'What is Lorem Ipsum?'),
  createData('Eclair', 'Why do we use it?'),
  createData('Frozen yoghurt', 'Where can I get some?'),
  createData('Gingerbread', 'Where does it come from?'),
  createData('Honeycomb', 'Contrary to popular belief, Lorem Ipsum is not simply random text.'),
  createData('Ice cream sandwich', 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.'),
  createData(
    'Jelly Bean',
    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.',
  ),
  createData('KitKat', 'If you use this site regularly and would like to help keep the site on the Internet'),
  createData('Lollipop', 'Thank you for your support'),
  createData('Marshmallow', 'Can you help translate this site into a foreign language ?'),
  createData('Nougat', 'Please email us with details if you can help.'),
  createData('Oreo', 'The standard Lorem Ipsum passage, used since the 1500s'),
]

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

export default function GenreTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [openDelModal, setDelModal] = React.useState(null)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleOpenDelModal = (id) => {
    setDelModal(id)
  }
  const handleCloseDelModal = (id) => {
    setDelModal(null)
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <GenreTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `genre-table-checkbox-${index}`
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                  <TableCell component="th" id={labelId} scope="row" padding="none" width={300}>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center" width={250}>
                    <Stack spacing={1} direction="row" justifyContent="center">
                      <IconButton color="inherit">
                        <EyeOutlined />
                      </IconButton>
                      <IconButton color="primary">
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
    </>
  )
}
