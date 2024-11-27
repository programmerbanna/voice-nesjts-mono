export type ProfessionalType = 'Organization' | 'Practitioner'

export interface Professional {
  id: string
  type: ProfessionalType
  orgOrPracId: string
  username: string
  name: string
  ranking: number
  photo: string
  category: string
  subCategory: string[]
  rating: number
  totalAppointment: number
  zone: string[]
  branch: string[]
  areaOfPractice: string
}
