 export interface FormData {
  name: string
  email: string
  sector: string 
  services: string[]
  message: string
}

export interface ServiceCompletionData {
  services: string[]
  documentId: string
}


export interface Service {
  id: string
  title: string
  description: string
}

export interface Props {
  userData: {
    name: string
    email: string
  }
}