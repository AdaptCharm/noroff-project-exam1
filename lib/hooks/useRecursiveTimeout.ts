import { useEffect, useState, useRef, useCallback } from 'react'

export const useRecursiveTimeout = (cb: CallableFunction, delay: number) => {
  const [isActive, setIsActive] = useState(false)
  const pause = useCallback(() => setIsActive(false), [setIsActive])
  const play = useCallback(() => setIsActive(true), [setIsActive])
  const content = useRef(cb)

  useEffect(() => {
    content.current = cb
  }, [cb])

  useEffect(() => {
    if (!isActive) return
    let id = 0

    const tick = () => {
      if (!isActive) return clearTimeout(id)
      content.current()
      requestAnimationFrame(() => (id = window.setTimeout(tick, delay)))
    }
    requestAnimationFrame(() => (id = window.setTimeout(tick, delay)))

    return () => {
      if (id) clearTimeout(id)
      pause()
    }
  }, [isActive, delay, pause])

  return { play, pause }
}