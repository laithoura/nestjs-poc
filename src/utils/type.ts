type UserType = {
    id: number
    email: string
    password: string
}

type CreateUserParams = {
    email: string
    password: string
}

type UpdateUserParams = {
    id: number
    email: string
    password: string
}

type ModifyUserProfileParams = {
  firstName: string
  lastName: string
  age: number
  dob: string
}

type CreateUserPostParams = {
    title: string
    description: string
}

type UpdateUserPostParams = {
    id: number,
    title: string
    description: string
}