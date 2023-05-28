import bcrypt from 'bcryptjs'
const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Sony',
        email:'sony@example.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Emal',
        email:'ej@example.com',
        password:bcrypt.hashSync('123456',10),
    }
]

export default users;