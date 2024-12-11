import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { User } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../api/userapi';
import UserDialogContent from './UserDialogContent';
import Button from '@mui/material/Button';





function AddCar() {
    const queryClient = useQueryClient();
    const handleSave = () => {
        mutate(user);   
        setUser({ firstName: '', middleName: '', lastName: '',  username:'',
                 email: '', password: '', role: '', });
        handleClose();      
      }
      
const { mutate } = useMutation(addUser, {
  onSuccess: () => {
    queryClient.invalidateQueries(["users"]);
  },

  onError: (err) => {
    console.error(err);
  },
});

    const handleClickOpen = () => {
        setOpen(true);
      };
      
      // Close the modal form
      const handleClose = () => {
        setOpen(false);
      };
      
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

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
      setUser({...user, [event.target.name]:
          event.target.value});
    }
    
    return(
      <>
    <Button onClick={handleClickOpen}>New User</Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New User</DialogTitle>
            <UserDialogContent user={user} handleChange={handleChange}/>
            <DialogActions>
             <Button onClick={handleClose}>Cancel</Button>
             <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>            
      </>
    );
    
}
export default AddCar;
