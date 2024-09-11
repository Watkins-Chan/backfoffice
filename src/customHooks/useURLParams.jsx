import { useNavigate, useLocation } from 'react-router-dom'

export const useURLParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getParam = (param, defaultValue) => {
    const params = new URLSearchParams(location.search)
    return params.get(param) ? parseInt(params.get(param), 10) : defaultValue
  }

  const setParam = (param, value) => {
    const params = new URLSearchParams(location.search)
    params.set(param, value)
    navigate(`?${params.toString()}`)
  }

  return { getParam, setParam }
}
