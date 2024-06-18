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

type CreateUserProfileParams = {
    firstName: string
    lastName: string
    age: number
    dob: string
  }

type UpdateUserProfileParams = {
  id: number
  firstName: string
  lastName: string
  age: number
  dob: string
}

type CreateUserPostParams = {
    userId: number
    title: string
    description: string
}

type UpdateUserPostParams = {
    id: number,
    title: string
    description: string
}