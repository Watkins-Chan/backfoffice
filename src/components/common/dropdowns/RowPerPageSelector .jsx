import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import _map from 'lodash/map'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useUpdateParams } from 'utils/updateParams'
import { MANGA_PAGE_SIZE } from 'constants'

const defaultValue = [10, 25, 50, 100]

const RowPerPageSelector = ({ data }) => {
  const updateParams = useUpdateParams()
  const [searchParams] = useSearchParams()
  const [row, setRow] = useState(Number(searchParams.get('pageSize')) || MANGA_PAGE_SIZE)

  const handleChangeRow = useCallback(
    (event) => {
      const newPageSize = event.target.value
      setRow(newPageSize)
      updateParams({ pageSize: newPageSize, currentPage: 1 })
    },
    [useUpdateParams],
  )

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="caption" color="textSecondary" mr={1}>
        Row per page
      </Typography>
      <FormControl sx={{ '& > div': { fontSize: '0.75rem', maxWidth: 64 } }}>
        <Select size="small" value={row} onChange={handleChangeRow}>
          {_map(data || defaultValue, (item) => (
            <MenuItem key={`row-${item}`} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default RowPerPageSelector
