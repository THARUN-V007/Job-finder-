import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useApplications } from '../context/ApplicationContext'
import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS } from '../utils/helpers'
import { toast } from 'react-toastify'

const schema = yup.object({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Job role is required'),
  location: yup.string().required('Location is required'),
  platform: yup.string().required('Platform is required'),
  status: yup.string().required('Status is required'),
  appliedDate: yup.string().required('Applied date is required'),
  salary: yup.string(),
  interviewDate: yup.string(),
  notes: yup.string()
})

export default function AddApplication() {
  const { addApplication, applications, updateApplication } = useApplications()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const existingJob = applications.find(app => app.id === id)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: existingJob || {}
  })

  useEffect(() => {
    if (existingJob) reset(existingJob)
  }, [id])

  const onSubmit = (data) => {
    if (isEditing) {
      updateApplication(id, data)
      toast.success('Application updated!')
    } else {
      addApplication(data)
      toast.success('Application added!')
    }
    navigate('/applications')
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    marginTop: '5px'
  }

  const labelStyle = {
    fontWeight: '600',
    fontSize: '14px',
    color: '#334155'
  }

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '3px'
  }

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '25px', color: '#1e293b' }}>
        {isEditing ? '✏️ Edit Application' : '➕ Add New Application'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          <div>
            <label style={labelStyle}>Company Name *</label>
            <input {...register('company')} placeholder="e.g. Google" style={inputStyle} />
            {errors.company && <p style={errorStyle}>{errors.company.message}</p>}
          </div>

          <div>
            <label style={labelStyle}>Job Role *</label>
            <input {...register('role')} placeholder="e.g. Frontend Developer" style={inputStyle} />
            {errors.role && <p style={errorStyle}>{errors.role.message}</p>}
          </div>

          <div>
            <label style={labelStyle}>Location Type *</label>
            <select {...register('location')} style={inputStyle}>
              <option value="">Select location</option>
              {LOCATION_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {errors.location && <p style={errorStyle}>{errors.location.message}</p>}
          </div>

          <div>
            <label style={labelStyle}>Salary Range</label>
            <input {...register('salary')} placeholder="e.g. 5-8 LPA" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Platform *</label>
            <select {...register('platform')} style={inputStyle}>
              <option value="">Select platform</option>
              {PLATFORM_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.platform && <p style={errorStyle}>{errors.platform.message}</p>}
          </div>

          <div>
            <label style={labelStyle}>Status *</label>
            <select {...register('status')} style={inputStyle}>
              <option value="">Select status</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.status && <p style={errorStyle}>{errors.status.message}</p>}
          </div>

          <div>
            <label style={labelStyle}>Applied Date *</label>
            <input type="date" {...register('appliedDate')} style={inputStyle} />
            {errors.appliedDate && <p style={errorStyle}>{errors.appliedDate.message}</p>}
          </div>

          <div>
            <label style={labelStyle}>Interview Date</label>
            <input type="date" {...register('interviewDate')} style={inputStyle} />
          </div>

        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={labelStyle}>Notes</label>
          <textarea
            {...register('notes')}
            placeholder="Any additional notes..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
          <button
            type="submit"
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {isEditing ? 'Update Application' : 'Add Application'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/applications')}
            style={{
              background: '#e2e8f0',
              color: '#334155',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}