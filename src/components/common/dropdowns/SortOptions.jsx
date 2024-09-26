import { useCallback, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import _map from 'lodash/map'
import _get from 'lodash/get'
import { useSearchParams } from 'react-router-dom'
import { useUpdateParams } from 'utils/updateParams'

const SortOptions = () => {
  const sortData = [
    { name: 'A-Z', value: 'name-asc' },
    { name: 'Z-A', value: 'name-desc' },
    { name: 'Newest', value: 'createdAt-desc' },
    { name: 'Oldest', value: 'createdAt-asc' },
  ]
  const [searchParams] = useSearchParams()
  const updateParams = useUpdateParams()

  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt-desc')

  const handleChangeSort = useCallback(
    (event) => {
      const value = event.target.value
      setSort(value)
      updateParams({ sort: value, currentPage: 1 })
    },
    [updateParams],
  )

  return (
    <FormControl fullWidth sx={{ width: 200 }}>
      <InputLabel>Sort by</InputLabel>
      <Select label="Sort by" value={sort} onChange={handleChangeSort}>
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
