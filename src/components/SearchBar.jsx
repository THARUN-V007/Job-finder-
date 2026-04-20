export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
      <input
        type="text"
        placeholder="Search by company or role..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 10px 10px 38px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '14px',
          outline: 'none'
        }}
      />
    </div>
  )
}