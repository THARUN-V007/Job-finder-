import { Link, useLocation } from 'react-router-dom'
import { FiBriefcase, FiGrid, FiList, FiPlusCircle, FiTrendingUp } from 'react-icons/fi'

export default function Navbar() {
  const location = useLocation()

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FiGrid },
    { path: '/applications', label: 'Applications', icon: FiList },
    { path: '/applications/new', label: 'Add Job', icon: FiPlusCircle },
    { path: '/analytics', label: 'Analytics', icon: FiTrendingUp },
  ]

  return (
    <nav style={{
      background: '#0f172a',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'white',
        fontWeight: '800',
        fontSize: '18px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FiBriefcase size={18} color='white' />
        </div>
        Job<span style={{ color: '#3b82f6' }}>Tracker</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navLinks.map(link => {
          const Icon = link.icon
          const isActive = location.pathname === link.path ||
            (link.path === '/applications' && location.pathname.startsWith('/applications') && location.pathname !== '/applications/new')

          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: isActive ? 'white' : '#94a3b8',
                textDecoration: 'none',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: isActive ? 'rgba(59,130,246,0.2)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                transition: 'all 0.2s',
                borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent'
              }}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}