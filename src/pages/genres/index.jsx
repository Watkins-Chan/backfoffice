import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DataGrid } from '@mui/x-data-grid';
import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

export default function Genres() {
  const [sort, setSort] = React.useState('');
  const [row, setRow] = React.useState(10);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeRow = (event) => {
    setRow(event.target.value);
  };

  const columns = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    }
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
  ];

  return (
    <Card variant="outlined">
      <Box p={2}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md="auto">
            <TextField
              placeholder="Search..."
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <SearchOutlined />
              }}
            />
          </Grid>
          <Grid item xs={12} md="auto">
            <Stack direction="row" alignItems="center">
              <FormControl fullWidth sx={{ width: 200 }}>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sort} label="Sort by" onChange={handleChangeSort}>
                  <MenuItem value={10}>A-Z</MenuItem>
                  <MenuItem value={20}>Z-A</MenuItem>
                </Select>
              </FormControl>
              <Button sx={{ marginX: 2 }} variant="contained" startIcon={<PlusOutlined />}>
                Add
              </Button>
              <Tooltip title="Upload file">
                <IconButton>
                  <UploadOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <DataGrid rows={rows} columns={columns} hideFooter />
      <Divider />
      <Box p={2}>
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
    </Card>
  );
}
