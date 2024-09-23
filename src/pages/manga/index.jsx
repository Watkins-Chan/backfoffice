import React from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Chip from '@mui/material/Chip'

import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import AdvanceSearch from 'components/searchs/AdvancedSearch'

export default function Manga() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [row, setRow] = React.useState(10)
  const [sort, setSort] = React.useState('')

  const handleChange = (event) => {
    setSort(event.target.value)
  }

  const handleChangeRow = (event) => {
    setRow(event.target.value)
  }

  return (
    <Stack spacing={3}>
      <Box>
        <AdvanceSearch />
      </Box>
      <Box>
        <Grid container spacing={2}>
          {[...Array(20)].map((_, index) => (
            <Grid key={index} item xs={12} sm={4} md={3}>
              <Card variant="outlined" sx={{ height: '100%', '&:hover': { cursor: 'pointer', boxShadow: theme.shadows[10] } }}>
                <CardHeader
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                  action={
                    <IconButton aria-label="settings">
                      <MoreOutlined />
                    </IconButton>
                  }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://cdn.prod.website-files.com/62e29661f8efaa50d68a5786/642e8593346bbd4898663ffa_NFT%20%26%20ART.png"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography textTransform="uppercase" color={theme.palette.grey[500]}>
                    Author
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={400}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center">
              <Typography variant="caption" color="textSecondary" mr={1}>
                Row per page
              </Typography>
              <FormControl sx={{ '& > div': { fontSize: '0.75rem', maxWidth: 64 } }}>
                <Select size="small" value={row} onChange={handleChangeRow}>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item>
            <Pagination count={10} showFirstButton showLastButton />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}
