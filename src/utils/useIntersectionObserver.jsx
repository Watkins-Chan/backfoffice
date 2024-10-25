import { useState, useEffect, useRef } from 'react'

const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        observer.unobserve(ref.current)
      }
    }, options)

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return [ref, isIntersecting]
}

export default useIntersectionObserver
