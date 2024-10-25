import React, { memo, useState } from 'react'

import _get from 'lodash/get'
import { format, parseISO } from 'date-fns'

import useTheme from '@mui/material/styles/useTheme'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { MoreOutlined } from '@ant-design/icons'
import useIntersectionObserver from 'utils/useIntersectionObserver'

const MangaCard = memo((props) => {
  const { manga, onActions } = props
  const theme = useTheme()

  const titleStyles = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  const descriptionStyles = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  const authorName = _get(manga, 'author.author_name', '')
  const mangaTitle = _get(manga, 'name', '')
  const mangaDescription = _get(manga, 'description', '')
  const createdAt = format(parseISO(_get(manga, 'createdAt', '')), 'MMMM dd, yyyy')

  const optimizedImageUrl = _get(manga, 'image.url', _get(manga, 'imageUrl', '')).replace('/upload/', '/upload/q_auto,f_webp,w_300/')
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardHeader
        title={mangaTitle}
        titleTypographyProps={{ sx: titleStyles }}
        subheader={createdAt}
        action={
          <IconButton aria-label="settings" onClick={onActions}>
            <MoreOutlined />
          </IconButton>
        }
      />
      {optimizedImageUrl && <CardMedia loading="lazy" component="img" height="194" image={optimizedImageUrl} alt={mangaTitle} sx={{ objectFit: 'cover' }} />}
      <CardContent>
        <Typography textTransform="uppercase" color={theme.palette.grey[500]} variant="body2">
          {authorName}
        </Typography>
        <Typography variant="h5" fontWeight={400} sx={descriptionStyles}>
          {mangaDescription}
        </Typography>
      </CardContent>
    </Card>
  )
})

export default MangaCard
