import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {getUsers, deleteUser } from '../api/userapi';
import { DataGrid, GridColDef, GridCellParams, GridToolbar
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddUser from './AddUser'
import EditUser from './EditUser';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';







function Userlist() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { mutate } = useMutation(deleteUser, {
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['users'] });
         },
         onError: (err) => {
           console.error(err);
         },
     });

    
  const { data, error, isSuccess } = useQuery({
    queryKey: ["users"], 
    queryFn: getUsers
  });
 
  const columns: GridColDef[] = [
    {field: 'firstName', headerName: 'First Name', width: 120},
    {field: 'middleName', headerName: 'Middle Name', width: 120},
    {field: 'lastName', headerName: 'Last Name', width: 120},
    {field: 'username', headerName: 'Username', width: 100},
    {field: 'email', headerName: 'Email', width: 220},
    {field: 'role', headerName: 'Role', width: 100},
    {field: 'createdAt', headerName: 'Create At', width: 250},
    {field: 'updatedAt', headerName: 'Updated At', width: 250},    
      {
        field: 'edit',
        headerName: '',
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => 
          <EditUser userdata={params.row} />
      },
      {
        field: 'delete',
        headerName: '',
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => (
            <IconButton aria-label="delete" size="small"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${params.row.role} ${params.row.firstName} ${params.row.lastName}?`)) {
              mutate(params.row.id);
            }
          }}>
        <DeleteIcon fontSize="small" />
        </IconButton>

        ),
      },
    
  ];  

  if (!isSuccess) {
    return <span>Loading</span>
  }
  
  else if (error) {
    return <span>Error when fetching users...</span>
  }
  
  else {
    return ( 
        <>
        <AddUser />
        <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={row => row.id}
        slots={{ toolbar: GridToolbar }}
      /> 
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Car deleted" />
    </>
 
    );
  }
}

export default Userlist;
