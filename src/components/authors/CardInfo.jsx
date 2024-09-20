import React from 'react'

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

const CardInfo = () => {
  const theme = useTheme()
  const contactInfo = [
    { icon: <MailOutlined />, value: 'huy.mtruong+distributor+20092024@digicommercegroup.com' },
    { icon: <PhoneOutlined />, value: '+1 (687) 252-5573' },
    { icon: <EnvironmentOutlined />, value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
  ]
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={
          <Typography>
            <b>Ollie Watkins</b>
          </Typography>
        }
        subheader="Team"
        action={
          <IconButton aria-label="settings">
            <MoreOutlined />
          </IconButton>
        }
      />
      <Divider variant="middle" />
      <CardContent>
        <Typography
          paragraph
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          Hello, Loit nih zadul wokazu ta eno pigzuziz ruwulmid divkumas wehumjuv zu pew erasis gaba ofa fenucfo.
        </Typography>
        <List disablePadding>
          {_map(contactInfo, (item, index) => (
            <ListItem disableGutters disablePadding key={index}>
              <ListItemIcon sx={{ color: theme.palette.common.black }}>{_get(item, 'icon')}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: theme.palette.grey[500],
                  sx: {
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    wordBreak: 'break-all',
                  },
                }}
                primary={_get(item, 'value', '')}
              />
            </ListItem>
          ))}
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
          Updated in 2 days ago
        </Typography>
        <Button variant="outlined" size="small">
          Preview
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardInfo
