import { format, parseISO } from 'date-fns'

export const STATUS_OPTIONS = [
  'Applied',
  'Interviewing',
  'Offer Received',
  'Rejected'
]

export const PLATFORM_OPTIONS = [
  'LinkedIn',
  'Naukri',
  'Indeed',
  'Company Website',
  'Referral',
  'Other'
]

export const LOCATION_OPTIONS = [
  'Remote',
  'On-site',
  'Hybrid'
]

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy')
  } catch {
    return dateString
  }
}