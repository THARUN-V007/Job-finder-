import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

export const fetchDummyJobs = async () => {
  const response = await axios.get(`${BASE_URL}/products?limit=10`)
  return response.data.products.map(item => ({
    id: crypto.randomUUID(),
    company: item.brand || 'Unknown Company',
    role: item.title,
    location: 'Remote',
    salary: `${item.price * 1000} LPA`,
    platform: 'LinkedIn',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    interviewDate: '',
    notes: item.description,
    bookmarked: false
  }))
}