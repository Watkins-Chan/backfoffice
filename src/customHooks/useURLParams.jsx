import { useNavigate, useLocation } from 'react-router-dom'

export const useURLParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getParam = (param, defaultValue) => {
    const params = new URLSearchParams(location.search)
    const value = params.get(param)
    return value !== null ? value : defaultValue
  }

  const setParam = (param, value) => {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set(param, value)

    const newURL = `${window.location.pathname}?${urlParams.toString()}`
    window.history.replaceState(null, '', newURL)
  }

  return { getParam, setParam }
}
