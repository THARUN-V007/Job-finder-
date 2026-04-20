import { useApplications } from '../context/ApplicationContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { FiEdit2, FiTrash2, FiBriefcase } from 'react-icons/fi'
import { formatDate } from '../utils/helpers'

const statusColors = {
  'Applied': { bg: '#dbeafe', color: '#1d4ed8' },
  'Interviewing': { bg: '#fef9c3', color: '#854d0e' },
  'Offer Received': { bg: '#dcfce7', color: '#166534' },
  'Rejected': { bg: '#fee2e2', color: '#991b1b' }
}

export default function JobCard({ job }) {
  const { deleteApplication, toggleBookmark } = useApplications()
  const navigate = useNavigate()
  const status = statusColors[job.status] || { bg: '#f1f5f9', color: '#334155' }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(job.id)
      toast.success('Application deleted!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        border: job.bookmarked ? '2px solid #f59e0b' : '2px solid transparent',
        cursor: 'default'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '10px',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img
              src={`https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s/g, '')}.com`}
              alt={job.company}
              onError={e => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <FiBriefcase size={20} color='#94a3b8' style={{ display: 'none' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{job.company}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{job.role}</p>
          </div>
        </div>

        {/* Bookmark */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleBookmark(job.id)}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px' }}
        >
          {job.bookmarked ? '⭐' : '☆'}
        </motion.button>
      </div>

      {/* Tags */}
      <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{
          background: status.bg,
          color: status.color,
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {job.status}
        </span>
        <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
          📍 {job.location}
        </span>
        <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
          💰 {job.salary || 'Not specified'}
        </span>
      </div>

      {/* Dates */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          Applied: <strong style={{ color: '#64748b' }}>{formatDate(job.appliedDate)}</strong>
        </span>
        {job.interviewDate && (
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            Interview: <strong style={{ color: '#64748b' }}>{formatDate(job.interviewDate)}</strong>
          </span>
        )}
      </div>

      {/* Platform */}
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
        via {job.platform}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/applications/${job.id}`)}
          style={{
            background: '#eff6ff',
            color: '#3b82f6',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <FiEdit2 size={13} /> Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDelete}
          style={{
            background: '#fef2f2',
            color: '#ef4444',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <FiTrash2 size={13} /> Delete
        </motion.button>
      </div>
    </motion.div>
  )
}