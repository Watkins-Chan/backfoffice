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
import { SearchOutlined, PlusOutlined, UploadOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import GenreModal from 'components/modals/GenreModal';

export default function Genres() {
  const [sort, setSort] = React.useState('');
  const [row, setRow] = React.useState(10);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeRow = (event) => {
    setRow(event.target.value);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'actions', headerName: 'Actions', width: 200, 
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View">
            <IconButton onClick={() => handleView(params.id)}>
              <EyeOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.id)}>
              <EditOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.id)}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
     },
  ];

  const rows = [
    { id: 1, name: 'Snow', description: 'Jon' },
    { id: 2, name: 'Lannister', description: 'Cersei' },
    { id: 3, name: 'Lannister', description: 'Jaime'  },
    { id: 4, name: 'Stark', description: 'Arya'},
    { id: 5, name: 'Targaryen', description: 'Daenerys' },
    { id: 6, name: 'Melisandre', description: null },
    { id: 7, name: 'Clifford', description: 'Ferrara' },
    { id: 8, name: 'Frances', description: 'Rossini' },
    { id: 9, name: 'Roxie', description: 'Harvey' }
  ];

  return (
    <React.Fragment>
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
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort by"
                    onChange={handleChangeSort}
                  >
                    <MenuItem value={10}>A-Z</MenuItem>
                    <MenuItem value={20}>Z-A</MenuItem>
                  </Select>
                </FormControl>
                <Button sx={{ marginX: 2 }} variant="contained" startIcon={<PlusOutlined />} onClick={handleClickOpenModal}>
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
        <DataGrid rows={rows} columns={columns} hideFooter disableRowSelectionOnClick />
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
      <GenreModal open={openModal} handleClose={handleCloseModal} />
    </React.Fragment>
  );
}
