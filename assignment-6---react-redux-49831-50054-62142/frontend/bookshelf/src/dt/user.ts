export interface RdxUserState {
    username: string | null,
    roles:string[],
    waiting:boolean
  }
  
export const initialUserState = {
    username: null,
    roles:[],
    waiting:false
  }

export const userData = [
  {
    username: "John1",
    roles: [
      "registered"
    ],
    password: "pass",
    name: "John Smith"
  }
]