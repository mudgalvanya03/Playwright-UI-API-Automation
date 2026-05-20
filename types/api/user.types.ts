// types/api/user.types.ts
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface GetUserResponse{
    
  data:User
}


export interface CreateUserRequest {
  name: string
  job: string
}

export interface CreateUserResponse {
  name: string
  job: string
  id: string
  createdAt: string
}

export interface UpdateUserRequest {
  name?: string
  job?: string
}

export interface PaginatedResponse<T>{
    data: T[],
    page: number,
    total: number
    totalPages: number
}
export interface EmptyCreateUserResponse {
    id: string
    createdAt: string
}

export interface UpdateUserResponse{
    name: string
    job: string
    updatedAt: string
}
