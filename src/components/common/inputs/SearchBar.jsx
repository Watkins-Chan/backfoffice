import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { SearchOutlined } from '@ant-design/icons'
import { useUpdateParams } from 'utils/updateParams'

const SearchBar = () => {
  const [searchParams] = useSearchParams()
  const updateParams = useUpdateParams()

  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q'))
  const [inputValue, setInputValue] = useState(searchKeyword)

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    setSearchKeyword(inputValue.trim())
    updateParams({ q: inputValue.trim(), currentPage: 1 })
  }, [inputValue, searchParams, updateParams])

  return (
    <Box display="flex" alignItems="center">
      <TextField
        placeholder="Search..."
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: <SearchOutlined />,
        }}
      />
      <Button sx={{ marginLeft: 1 }} variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  )
}

export default SearchBar
