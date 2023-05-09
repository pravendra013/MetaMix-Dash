// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { gridClasses } from '@mui/x-data-grid';
// import Search from 'layout/MainLayout/Header/HeaderContent/Search';
// import { Button, Stack } from '@mui/material';
// import Box from '@mui/material/Box';
// import './table.css';
// import Create from 'components/table/create';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { useState } from 'react';

// const columns = [
//     { field: 'id', headerName: 'Country Name', flex: 1, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
//     {
//         field: 'countryId',
//         headerName: 'Country Id',
//         flex: 1,
//         headerAlign: 'center',
//         headerClassName: 'super-app-theme--header'
//     },

//     {
//         field: 'actions',
//         headerName: 'Actions',
//         flex: 1,
//         // align: 'center',
//         headerAlign: 'center',
//         headerClassName: 'super-app-theme--header',

//         renderCell: (params) => (
//             <div style={{ display: 'flex', gap: '1rem' }}>
//                 <IconButton aria-label="delete" size="small">
//                     <DeleteIcon sx={{ width: '1rem' }} />
//                 </IconButton>
//                 <IconButton aria-label="edit" size="small">
//                     <EditIcon sx={{ width: '1rem' }} />
//                 </IconButton>
//             </div>
//         )
//     }
// ];

// const rows = [
//     { id: 'INDIA', countryId: '00009' },
//     { id: 'AUS', countryId: '898989' },
//     { id: 'ARG', countryId: '898989' },
//     { id: 'ENG', countryId: '898989' },
//     { id: 'NEWZ', countryId: '898989' },
//     { id: 'WI', countryId: '00009' },
//     { id: 'ZIL', countryId: '898989' },
//     { id: 'CAN', countryId: '898989' },
//     { id: 'USA', countryId: '898989' },
//     { id: 'BRITAIN', countryId: '898989' },
//     { id: 'BHARAT', countryId: '00009' },
//     { id: 'BAN', countryId: '898989' },
//     { id: 'SL', countryId: '898989' },
//     { id: 'NIG', countryId: '898989' },
//     { id: 'PAK', countryId: '898989' },
//     { id: 'BAR', countryId: '00009' },
//     { id: 'BRAZIL', countryId: '898989' },
//     { id: 'PURTGAL', countryId: '898989' },
//     { id: 'UAE', countryId: '898989' },
//     { id: 'DAVID', countryId: '898989' }
// ];

// const Index = () => {
//     const [add, setAdd] = useState(false);

//     return (
//         <>
//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
//                 <Search />

//                 <Button variant="contained" size="small" sx={{ height: '1.8rem' }} onClick={() => setAdd(true)}>
//                     Add
//                 </Button>
//             </div>

//             <Box
//                 sx={{
//                     height: 435,
//                     width: '100%',
//                     mt: '0.2rem',
//                     '& .super-app-theme--header': {
//                         backgroundColor: '#85CDFD'
//                     }
//                 }}
//             >
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     rowHeight={25}
//                     headerHeight={30}
//                     getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
//                     scrollbarSize={0}
//                 />

//                 {add && <Create />}
//             </Box>
//         </>
//     );
// };

// export default Index;

// pageSize={5} rowsPerPageOptions={[50]}
// onClick={() => console.log(`Edit button clicked for row ${params.row.id}`)}
// cellClassName={classes.centeredCell}
// style={{ display: 'flex', width: 'auto', textAlign: 'end', gap: '1rem', zIndex: 2 }}
