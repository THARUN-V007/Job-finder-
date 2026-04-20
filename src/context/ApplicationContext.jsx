import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

const ApplicationContext = createContext()

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useLocalStorage('jobs', [])

  const addApplication = (data) => {
    const newJob = { ...data, id: uuidv4(), bookmarked: false }
    setApplications([...applications, newJob])
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
  }

  const updateApplication = (id, updatedData) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, ...updatedData } : app
    ))
  }

  const toggleBookmark = (id) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
    ))
  }

  return (
    <ApplicationContext.Provider value={{
      applications,
      addApplication,
      deleteApplication,
      updateApplication,
      toggleBookmark
    }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplications() {
  return useContext(ApplicationContext)
}