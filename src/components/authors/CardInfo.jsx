import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import _map from 'lodash/map'
import _get from 'lodash/get'

import useTheme from '@mui/material/styles/useTheme'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import { MoreOutlined, MailOutlined, LinkOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const CardInfo = ({ data, onOpenMenu }) => {
  const theme = useTheme()

  const itemStyle = ({ lineClamp = 3, wordBreak = 'break-all' }) => ({
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    ...(lineClamp && { WebkitLineClamp: lineClamp }),
    ...(wordBreak && { wordBreak: wordBreak }),
  })

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={
          <Typography>
            <b>{_get(data, 'author_name', '')}</b>
          </Typography>
        }
        subheader="Team"
        action={
          <IconButton aria-label="settings" onClick={onOpenMenu}>
            <MoreOutlined />
          </IconButton>
        }
      />
      <Divider variant="middle" />
      <CardContent>
        <Typography paragraph sx={itemStyle}>
          {_get(data, 'description', '')}
        </Typography>
        <List disablePadding>
          <ListItem disableGutters disablePadding>
            <ListItemIcon sx={{ color: theme.palette.common.black }}>
              <MailOutlined />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: theme.palette.grey[500],
                sx: itemStyle({ lineClamp: 1 }),
              }}
              primary={_get(data, 'email', '')}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon sx={{ color: theme.palette.common.black }}>
              <PhoneOutlined />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: theme.palette.grey[500],
                sx: itemStyle({ lineClamp: 1 }),
              }}
              primary={_get(data, 'phone', '')}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon sx={{ color: theme.palette.common.black }}>
              <EnvironmentOutlined />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: theme.palette.grey[500],
                sx: itemStyle({ lineClamp: 1 }),
              }}
              primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon sx={{ color: theme.palette.common.black }}>
              <LinkOutlined />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: theme.palette.primary.main, component: Link, target: '_blank', width: 'fit-content' }}
              primary="https://docs.nestjs.com"
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Typography variant="caption" color={theme.palette.grey[500]}>
          Updated in {formatDistanceToNow(new Date(_get(data, 'createdAt', new Date())), { addSuffix: true })}
        </Typography>
        <Button variant="outlined" size="small">
          Preview
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardInfo
