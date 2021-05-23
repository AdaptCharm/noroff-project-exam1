import { FC, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Navbar, Newsletter, Footer } from '@components/common'

const Layout: FC = ({ children }) => {
  const content = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    content.current?.focus()
  }, [asPath])

  return (
    <div className="focus:outline-none" ref={content} tabIndex={-1}>
      <Navbar />
      <main>
        <div className="pt-20 sm:pt-30">{children}</div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Layout