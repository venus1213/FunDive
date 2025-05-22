import axios from 'axios'

export type ContactFormData = {
  name: string
  email: string
  type: 'mna' | 'consulting' | 'general' | 'service' | 'technical' | 'other'
  message: string
}

// 問い合わせAPIはパブリックAPIなので、認証なしで呼び出す
const contactApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
})

export const contactApi = {
  submit: async (data: ContactFormData) => {
    const response = await contactApiClient.post('/contact', data)
    return response.data
  },
} 