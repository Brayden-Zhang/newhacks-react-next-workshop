import Link from "next/link"

import React from "react"
export const NavBar = () => {
    return (
      <>
      <div className="navbar">
        <Link href={"https:/ieee.utoronto.ca"}>
          <img className='logo' src="/logo.png"/>
        </Link>
        <Link href={"/"}>
          <button className="promo">Home</button>
        </Link>
        {/* TODO: Make the promo page */}
        <Link href={"/promo"}>
            <button className="promo">Promo</button>
        </Link>
  
  
        
      </div>    
      </>
  
    )
  }
  