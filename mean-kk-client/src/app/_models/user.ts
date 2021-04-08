export enum Role {
    User = 'User',
    Admin = 'Admin'
}

export class User {
    id!: string;
    title!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    role!: Role;
    isDeleting: boolean = false;
}
