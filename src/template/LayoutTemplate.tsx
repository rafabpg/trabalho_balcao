import Header from '@/components/Organisms/Header'
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