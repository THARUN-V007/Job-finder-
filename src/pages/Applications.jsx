import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext'
import JobCard from '../components/JobCard'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import useDebounce from '../hooks/useDebounce'
import { fetchDummyJobs } from '../services/api'
import { toast } from 'react-toastify'
import { FiPlus, FiDownload } from 'react-icons/fi'

const TABS = ['All', 'Applied', 'Interviewing', 'Offer Received', 'Rejected', 'Bookmarked']

export default function Applications() {
  const { applications, addApplication } = useApplications()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    status: '', platform: '', location: '', sortBy: ''
  })

  const debouncedSearch = useDebounce(searchQuery, 500)

  // Import dummy jobs using Axios
  const handleImportJobs = async () => {
    setLoading(true)
    try {
      const jobs = await fetchDummyJobs()
      jobs.forEach(job => addApplication(job))
      toast.success(`${jobs.length} sample jobs imported!`)
    } catch (error) {
      toast.error('Failed to import jobs!')
    } finally {
      setLoading(false)
    }
  }

  let filtered = [...applications]

  if (activeTab === 'Bookmarked') {
    filtered = filtered.filter(app => app.bookmarked)
  } else if (activeTab !== 'All') {
    filtered = filtered.filter(app => app.status === activeTab)
  }

  if (debouncedSearch) {
    filtered = filtered.filter(app =>
      app.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      app.role.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }

  if (filters.status) filtered = filtered.filter(app => app.status === filters.status)
  if (filters.platform) filtered = filtered.filter(app => app.platform === filters.platform)
  if (filters.location) filtered = filtered.filter(app => app.location === filters.location)

  if (filters.sortBy === 'appliedDate') {
    filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
  } else if (filters.sortBy === 'company') {
    filtered.sort((a, b) => a.company.localeCompare(b.company))
  } else if (filters.sortBy === 'salary') {
    filtered.sort((a, b) => (a.salary || '').localeCompare(b.salary || ''))
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ color: '#1e293b', margin: '0 0 4px', fontSize: '22px', fontWeight: '800' }}>
            My Applications
          </h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
            {applications.length} total applications tracked
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleImportJobs}
            disabled={loading}
            style={{
              background: loading ? '#e2e8f0' : '#f0fdf4',
              color: loading ? '#94a3b8' : '#16a34a',
              border: '1px solid',
              borderColor: loading ? '#e2e8f0' : '#bbf7d0',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px'
            }}
          >
            <FiDownload size={15} />
            {loading ? 'Importing...' : 'Import Sample Jobs'}
          </button>
          <button
            onClick={() => navigate('/applications/new')}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px'
            }}
          >
            <FiPlus size={15} /> Add New Job
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filters filters={filters} onChange={setFilters} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              background: activeTab === tab ? '#3b82f6' : '#e2e8f0',
              color: activeTab === tab ? 'white' : '#475569',
              transition: 'all 0.2s'
            }}
          >
            {tab}
            <span style={{
              marginLeft: '6px',
              background: activeTab === tab ? 'rgba(255,255,255,0.25)' : '#cbd5e1',
              color: activeTab === tab ? 'white' : '#64748b',
              padding: '1px 7px',
              borderRadius: '10px',
              fontSize: '11px'
            }}>
              {tab === 'All' ? applications.length :
               tab === 'Bookmarked' ? applications.filter(a => a.bookmarked).length :
               applications.filter(a => a.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
          <p style={{ fontSize: '56px', margin: '0 0 16px' }}>📭</p>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#64748b', margin: '0 0 8px' }}>
            No applications found
          </p>
          <p style={{ fontSize: '14px', margin: '0 0 24px' }}>
            Try adjusting your filters or add a new application
          </p>
          <button
            onClick={() => navigate('/applications/new')}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ➕ Add First Job
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {filtered.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}