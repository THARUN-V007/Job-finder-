import { useApplications } from '../context/ApplicationContext'
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts'
import { FiTrendingUp, FiPieChart, FiBarChart2, FiAward, FiUsers, FiXCircle } from 'react-icons/fi'

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444']

export default function Analytics() {
  const { applications } = useApplications()

  const total = applications.length
  const applied = applications.filter(a => a.status === 'Applied').length
  const interviewing = applications.filter(a => a.status === 'Interviewing').length
  const offers = applications.filter(a => a.status === 'Offer Received').length
  const rejected = applications.filter(a => a.status === 'Rejected').length

  const pieData = [
    { name: 'Applied', value: applied },
    { name: 'Interviewing', value: interviewing },
    { name: 'Offer Received', value: offers },
    { name: 'Rejected', value: rejected },
  ].filter(d => d.value > 0)

  // Monthly data
  const monthlyMap = {}
  applications.forEach(app => {
    if (app.appliedDate) {
      const month = app.appliedDate.slice(0, 7)
      monthlyMap[month] = (monthlyMap[month] || 0) + 1
    }
  })
  const barData = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, count]) => ({
      month: new Date(month).toLocaleString('default', { month: 'short', year: '2-digit' }),
      Applications: count
    }))

  // Platform data
  const platformMap = {}
  applications.forEach(app => {
    if (app.platform) {
      platformMap[app.platform] = (platformMap[app.platform] || 0) + 1
    }
  })
  const platformData = Object.entries(platformMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0
  const interviewRate = total > 0 ? Math.round((interviewing / total) * 100) : 0
  const rejectionRate = total > 0 ? Math.round((rejected / total) * 100) : 0

  const summaryStats = [
    { label: 'Success Rate', value: `${successRate}%`, icon: FiAward, color: '#10b981', light: '#ecfdf5' },
    { label: 'Interview Rate', value: `${interviewRate}%`, icon: FiUsers, color: '#f59e0b', light: '#fffbeb' },
    { label: 'Rejection Rate', value: `${rejectionRate}%`, icon: FiXCircle, color: '#ef4444', light: '#fef2f2' },
    { label: 'Total Tracked', value: total, icon: FiTrendingUp, color: '#3b82f6', light: '#eff6ff' },
  ]

  if (total === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: '80px 20px' }}>
        <FiBarChart2 size={64} color='#e2e8f0' />
        <h2 style={{ color: '#64748b', marginTop: '20px' }}>No Data Yet</h2>
        <p style={{ color: '#94a3b8' }}>Add some job applications to see your analytics!</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 60%, #3b82f6 100%)',
        borderRadius: '20px',
        padding: '30px 40px',
        marginBottom: '24px',
        color: 'white',
        boxShadow: '0 10px 40px rgba(59,130,246,0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', opacity: 0.75 }}>
          <FiTrendingUp size={16} />
          <span style={{ fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Analytics Overview</span>
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: '800' }}>Job Search Analytics</h1>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '14px' }}>
          Insights based on <strong>{total}</strong> tracked applications
        </p>
      </div>

      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {summaryStats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '22px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              borderLeft: `4px solid ${stat.color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '46px', height: '46px',
                background: stat.light,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={22} color={stat.color} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>{stat.value}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

        {/* Pie Chart */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <FiPieChart size={18} color='#3b82f6' />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Application Stages</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <FiBarChart2 size={18} color='#3b82f6' />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Monthly Applications</h3>
          </div>
          {barData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <p>No monthly data available yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="Applications" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Platform Breakdown */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '25px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <FiBarChart2 size={18} color='#3b82f6' />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Applications by Platform</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {platformData.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No platform data yet</p>
          ) : (
            platformData.map((platform, index) => (
              <div key={platform.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>{platform.name}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: COLORS[index % COLORS.length] }}>
                    {platform.value} <span style={{ color: '#cbd5e1', fontWeight: '400' }}>/ {total}</span>
                  </span>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(platform.value / total) * 100}%`,
                    background: `linear-gradient(90deg, ${COLORS[index % COLORS.length]}99, ${COLORS[index % COLORS.length]})`,
                    height: '100%',
                    borderRadius: '10px',
                    transition: 'width 0.6s ease'
                  }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}