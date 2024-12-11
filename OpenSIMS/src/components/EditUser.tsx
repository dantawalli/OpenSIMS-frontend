import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { User, UserResponse, UserEntry } from '../types';
import UserDialogContent from './UserDialogContent';
import { updateUser } from '../api/userapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';


type FormProps = {

  userdata: UserResponse;

}

function EditUser({ userdata }: FormProps) {
    const queryClient = useQueryClient();

    // Use useMutation hook 
    const { mutate } = useMutation(updateUser, {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
      onError: (err) => {
        console.error(err);
      }
    });    

    const handleSave = () => {
        const id = userdata.id;
        const userEntry: UserEntry = {user, id}
        mutate(userEntry);
        setUser({ firstName: '', middleName: '', lastName: '',  username:'',
            email: '', password: '', role: '', });    
        setOpen(false);
      }
      

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>({

    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: '',
});


    

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
      setUser({...user, [event.target.name]: event.target.value});
    } 

    const handleClickOpen = () => {
        setUser({
      
            firstName: userdata.firstName,
            middleName: userdata.middleName,
            lastName: userdata.lastName,
            username: userdata.username,
            email: userdata.email,
            password: userdata.username,
            role: userdata.role,
        });
        setOpen(true);
      };
      
  return(
    <>
    <Tooltip title="Edit car">
      <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
       <EditIcon fontSize= "small" />
      </IconButton>
    </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <UserDialogContent user={user} handleChange={handleChange}/>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default EditUser;
