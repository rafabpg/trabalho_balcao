import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavLinkItemProps {
    link:string;
    children:React.ReactNode;
}

const NavLinkItem = ({link,children}:NavLinkItemProps) => {
  return (
    <li>
        <NavLink
            end
            to={link}
            className={({ isActive }) =>
                `focus:underline ${isActive ? 'underline' : ''} `

            }
        >
            {children}
        </NavLink>
    </li>
  )
}

export default NavLinkItem