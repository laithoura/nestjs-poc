type UserType = {
    id: number
    name: string
    age: number
    email: string
}

type CreateUserParams = {
    name: string
    age: number 
    email: string
}

type UpdateUserParams = {
    id: number
    name: string
    age: number
    email: string
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