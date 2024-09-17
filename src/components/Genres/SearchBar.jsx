import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { SearchOutlined } from '@ant-design/icons'

const SearchBar = ({ inputValue, onChange, onSearch }) => (
  <Box display="flex" alignItems="center">
    <TextField
      placeholder="Search..."
      variant="outlined"
      fullWidth
      value={inputValue}
      onChange={onChange}
      InputProps={{
        startAdornment: <SearchOutlined />,
      }}
    />
    <Button sx={{ marginLeft: 2 }} variant="contained" onClick={onSearch}>
      Search
    </Button>
  </Box>
)

export default SearchBar
