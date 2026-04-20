import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS } from '../utils/helpers'

export default function Filters({ filters, onChange }) {
  const selectStyle = {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    background: 'white',
    cursor: 'pointer'
  }

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <select
        value={filters.status}
        onChange={e => onChange({ ...filters, status: e.target.value })}
        style={selectStyle}
      >
        <option value="">All Status</option>
        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select
        value={filters.platform}
        onChange={e => onChange({ ...filters, platform: e.target.value })}
        style={selectStyle}
      >
        <option value="">All Platforms</option>
        {PLATFORM_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <select
        value={filters.location}
        onChange={e => onChange({ ...filters, location: e.target.value })}
        style={selectStyle}
      >
        <option value="">All Locations</option>
        {LOCATION_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
      </select>

      <select
        value={filters.sortBy}
        onChange={e => onChange({ ...filters, sortBy: e.target.value })}
        style={selectStyle}
      >
        <option value="">Sort By</option>
        <option value="appliedDate">Applied Date</option>
        <option value="salary">Salary</option>
        <option value="company">Company Name</option>
      </select>
    </div>
  )
}