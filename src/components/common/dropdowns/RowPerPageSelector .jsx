import _map from 'lodash/map'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const RowPerPageSelector = ({ data, row, onChange }) => {
  const defaultValue = [10, 25, 50, 100]
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="caption" color="textSecondary" mr={1}>
        Row per page
      </Typography>
      <FormControl sx={{ '& > div': { fontSize: '0.75rem', maxWidth: 64 } }}>
        <Select size="small" value={row} onChange={onChange}>
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
