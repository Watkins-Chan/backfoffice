import React from 'react'

import _get from 'lodash/get'
import { format, parseISO } from 'date-fns'

import useTheme from '@mui/material/styles/useTheme'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { MoreOutlined } from '@ant-design/icons'

const MangaCard = (props) => {
  const { manga, onActions } = props
  const theme = useTheme()

  return (
    <Card variant="outlined" sx={{ height: '100%', '&:hover': { cursor: 'pointer', boxShadow: theme.shadows[10] } }}>
      <CardHeader
        title={_get(manga, 'name', '')}
        subheader={format(parseISO(_get(manga, 'createdAt')), 'MMMM dd, yyyy')}
        action={
          <IconButton aria-label="settings" onClick={onActions}>
            <MoreOutlined />
          </IconButton>
        }
      />
      <CardMedia sx={{ objectFit: 'contain' }} component="img" height="194" image={_get(manga, 'image.url', _get(manga, 'imageUrl', ''))} alt={_get(manga, 'name', '')} />
      <CardContent>
        <Typography textTransform="uppercase" color={theme.palette.grey[500]}>
          {_get(manga, 'author.author_name', '')}
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
          {_get(manga, 'description', '')}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default MangaCard
