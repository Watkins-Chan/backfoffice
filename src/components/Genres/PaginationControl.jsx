import Pagination from '@mui/material/Pagination'

const PaginationControl = ({ count, page, onChange }) => <Pagination count={count} showFirstButton showLastButton page={page} onChange={onChange} />

export default PaginationControl
