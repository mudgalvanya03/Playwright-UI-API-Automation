export interface MockUser {
  id?: number | string  
  name: string
  job: string
  email: string
}

export interface MockOrder {
  id?: number | string  
  userId: number | string 
  product: string
  status: 'pending' | 'delivered' | 'cancelled'
}

export interface MockPost {
  id?: number 
  userId: number
  title: string
  body: string
}