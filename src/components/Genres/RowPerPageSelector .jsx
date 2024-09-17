import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const RowPerPageSelector = ({ row, onChange }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="caption" color="textSecondary" mr={1}>
        Row per page
      </Typography>
      <FormControl sx={{ '& > div': { fontSize: '0.75rem', maxWidth: 64 } }}>
        <Select size="small" value={row} onChange={onChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}

export default RowPerPageSelector
