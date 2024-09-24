import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import _map from 'lodash/map'
import _get from 'lodash/get'

const SortOptions = ({ sort, onChange }) => {
  const sortData = [
    { name: 'A-Z', value: 'name-asc' },
    { name: 'Z-A', value: 'name-desc' },
    { name: 'Newest', value: 'createdAt-desc' },
    { name: 'Oldest', value: 'createdAt-asc' },
  ]
  return (
    <FormControl fullWidth sx={{ width: 200 }}>
      <InputLabel>Sort by</InputLabel>
      <Select label="Sort by" value={sort} onChange={onChange}>
        {_map(sortData, (item) => (
          <MenuItem key={_get(item, 'value', '')} value={_get(item, 'value', '')}>
            {_get(item, 'name', '')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SortOptions
