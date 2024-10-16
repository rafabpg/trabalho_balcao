import Header from '@/components/Header/Header'
import { Outlet } from 'react-router'

const LayoutTemplate = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default LayoutTemplate