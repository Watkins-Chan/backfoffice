import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const SortOptions = ({ sort, onChange }) => (
  <FormControl fullWidth sx={{ width: 200 }}>
    <InputLabel>Sort by</InputLabel>
    <Select label="Sort by" value={sort} onChange={onChange}>
      <MenuItem value="name-asc">A-Z</MenuItem>
      <MenuItem value="name-desc">Z-A</MenuItem>
      <MenuItem value="createdAt-desc">Newest</MenuItem>
      <MenuItem value="createdAt-asc">Oldest</MenuItem>
    </Select>
  </FormControl>
)

export default SortOptions
