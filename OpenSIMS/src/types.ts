export type UserResponse = {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;   
}

export type User = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    username: string;
    password: string
    role: string;
}

export type UserEntry = {
    user: User;
    id: string;
  }
  