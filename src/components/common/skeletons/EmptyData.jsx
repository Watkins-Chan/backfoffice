import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { ContactsOutlined } from '@ant-design/icons'

const CardSkeleton = () => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
        '&:hover': { boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px' },
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center">
              <Avatar>
                <ContactsOutlined />
              </Avatar>
              <Stack pl={2.5} width="100%">
                <Skeleton animation={false} width="80%" height="20px" />
                <Skeleton animation={false} width="40%" height="20px" />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Skeleton animation={false} width="45px" height="20px" />
            <Skeleton animation={false} height="20px" />
            <Stack direction="row" spacing={1}>
              <Skeleton animation={false} width="90px" height="20px" />
              <Skeleton animation={false} width="38px" height="20px" />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Grid container spacing={1}>
                <Grid item>
                  <Skeleton animation={false} width="40px" height="20px" />
                </Grid>
                <Grid item>
                  <Skeleton animation={false} width="20px" height="20px" />
                </Grid>
              </Grid>
              <Skeleton animation={false} width="47px" height="32px" />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
const EmptyData = () => {
  return (
    <Box p={6}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Box>
            <Box position="relative">
              <CardSkeleton />
            </Box>
            <Box position="relative" top={-120} left={72}>
              <CardSkeleton />
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="h4" mt={-8}>
            You have not created any data yet.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmptyData
