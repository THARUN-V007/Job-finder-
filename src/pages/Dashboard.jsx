import { useApplications } from '../context/ApplicationContext'
import { useNavigate } from 'react-router-dom'
import {
  FiBriefcase, FiSend, FiUsers, FiAward,
  FiXCircle, FiBookmark, FiTrendingUp, FiPlus,
  FiList, FiClock, FiChevronRight
} from 'react-icons/fi'

export default function Dashboard() {
  const { applications } = useApplications()
  const navigate = useNavigate()

  const total = applications.length
  const applied = applications.filter(a => a.status === 'Applied').length
  const interviewing = applications.filter(a => a.status === 'Interviewing').length
  const offers = applications.filter(a => a.status === 'Offer Received').length
  const rejected = applications.filter(a => a.status === 'Rejected').length
  const bookmarked = applications.filter(a => a.bookmarked).length
  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0
  const interviewRate = total > 0 ? Math.round((interviewing / total) * 100) : 0

  const stats = [
    { label: 'Total Applications', value: total, icon: FiBriefcase, color: '#3b82f6', light: '#eff6ff' },
    { label: 'Applied', value: applied, icon: FiSend, color: '#06b6d4', light: '#ecfeff' },
    { label: 'Interviewing', value: interviewing, icon: FiUsers, color: '#f59e0b', light: '#fffbeb' },
    { label: 'Offers Received', value: offers, icon: FiAward, color: '#10b981', light: '#ecfdf5' },
    { label: 'Rejected', value: rejected, icon: FiXCircle, color: '#ef4444', light: '#fef2f2' },
    { label: 'Bookmarked', value: bookmarked, icon: FiBookmark, color: '#8b5cf6', light: '#f5f3ff' },
  ]

  const recentJobs = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5)

  const statusConfig = {
    'Applied': { bg: '#dbeafe', color: '#1d4ed8' },
    'Interviewing': { bg: '#fef9c3', color: '#854d0e' },
    'Offer Received': { bg: '#dcfce7', color: '#166534' },
    'Rejected': { bg: '#fee2e2', color: '#991b1b' }
  }

  const pipeline = [
    { label: 'Applied', value: applied, color: '#3b82f6' },
    { label: 'Interviewing', value: interviewing, color: '#f59e0b' },
    { label: 'Offers', value: offers, color: '#10b981' },
    { label: 'Rejected', value: rejected, color: '#ef4444' },
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px' }}>

      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 60%, #3b82f6 100%)',
        borderRadius: '20px',
        padding: '36px 40px',
        marginBottom: '24px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 10px 40px rgba(59,130,246,0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.75 }}>
            <FiBriefcase size={16} />
            <span style={{ fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Job Search Dashboard</span>
          </div>
          <h1 style={{ margin: '0 0 10px', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Welcome Back! 👋
          </h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: '1.6' }}>
            <strong>{total}</strong> applications tracked &nbsp;•&nbsp;
            <strong>{interviewing}</strong> interviews scheduled &nbsp;•&nbsp;
            <strong>{offers}</strong> offers received
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => navigate('/applications/new')}
            style={{
              background: 'white',
              color: '#1e40af',
              border: 'none',
              padding: '12px 22px',
              borderRadius: '10px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
            }}
          >
            <FiPlus size={16} /> Add Application
          </button>
          <button
            onClick={() => navigate('/applications')}
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.25)',
              padding: '12px 22px',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiList size={16} /> View All Jobs
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '22px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                borderLeft: `4px solid ${stat.color}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                background: stat.light,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}>
                <Icon size={20} color={stat.color} />
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>

        {/* Pipeline Progress */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
            <FiTrendingUp size={18} color='#3b82f6' />
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '16px', fontWeight: '700' }}>Pipeline Progress</h3>
          </div>

          {pipeline.map(item => (
            <div key={item.label} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: item.color }}>
                  {item.value} <span style={{ color: '#cbd5e1', fontWeight: '400' }}>/ {total}</span>
                </span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                <div style={{
                  width: `${total > 0 ? (item.value / total) * 100 : 0}%`,
                  background: `linear-gradient(90deg, ${item.color}99, ${item.color})`,
                  height: '100%',
                  borderRadius: '10px',
                  transition: 'width 0.6s ease'
                }} />
              </div>
            </div>
          ))}

          {/* Rate Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '22px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                <FiAward size={18} color='#10b981' />
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#10b981' }}>{successRate}%</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>Success Rate</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                <FiUsers size={18} color='#f59e0b' />
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#f59e0b' }}>{interviewRate}%</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>Interview Rate</div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiClock size={18} color='#3b82f6' />
              <h3 style={{ margin: 0, color: '#1e293b', fontSize: '16px', fontWeight: '700' }}>Recent Applications</h3>
            </div>
            <button
              onClick={() => navigate('/applications')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '7px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                color: '#475569',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View All <FiChevronRight size={14} />
            </button>
          </div>

          {recentJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8' }}>
              <FiBriefcase size={48} color='#e2e8f0' style={{ marginBottom: '12px' }} />
              <p style={{ fontWeight: '600', fontSize: '15px', margin: '0 0 6px', color: '#64748b' }}>No applications yet</p>
              <p style={{ fontSize: '13px', margin: '0 0 20px' }}>Start tracking your job search progress!</p>
              <button
                onClick={() => navigate('/applications/new')}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <FiPlus size={15} /> Add First Job
              </button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderRadius: '8px' }}>
                  {['Company', 'Role', 'Status', 'Applied Date'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      color: '#94a3b8',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      fontWeight: '600'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job, index) => (
                  <tr
                    key={job.id}
                    onClick={() => navigate(`/applications/${job.id}`)}
                    style={{
                      borderBottom: index < recentJobs.length - 1 ? '1px solid #f1f5f9' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px', height: '36px',
                          borderRadius: '8px',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          <img
                            src={`https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s/g, '')}.com`}
                            alt=""
                            onError={e => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'block'
                            }}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                          <FiBriefcase size={16} color='#94a3b8' style={{ display: 'none' }} />
                        </div>
                        <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>{job.company}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px', color: '#64748b', fontSize: '14px' }}>{job.role}</td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        background: statusConfig[job.status]?.bg || '#f1f5f9',
                        color: statusConfig[job.status]?.color || '#475569',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px', color: '#94a3b8', fontSize: '13px' }}>{job.appliedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}