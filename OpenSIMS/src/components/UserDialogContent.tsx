import DialogContent from '@mui/material/DialogContent';
import { User } from '../types';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

type DialogFormProps = {

  user: User;

  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CarDialogContent({ user, handleChange }: DialogFormProps) {

  return (
    <DialogContent>
    <Stack spacing={2} mt={1}>
    <TextField label="First Name" name="firstName"
      value={user.firstName} onChange={handleChange}/>
      <TextField label="Middle Name" name="middleName"
        value={user.middleName} onChange={handleChange}/>
      <TextField label="Last Name" name="lastName"
        value={user.lastName} onChange={handleChange}/>
        <TextField label="Email" name="email"
         value={user.email} onChange={handleChange}/>
      <TextField label="Username" name="username"
         value={user.username} onChange={handleChange}/>
      <TextField label="Password" name="password"
        value={user.password} onChange={handleChange}/>
      <TextField label="Role" name="role"
        value={user.role} onChange={handleChange}/>
    </Stack>
    </DialogContent>
  );
}

export default CarDialogContent;
