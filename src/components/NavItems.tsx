'use client'

import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use_onclick_outside"


const NavItems = () => {

  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null)
    }
  document.addEventListener("keydown", handler)
  }, [])

  const isAnyOpen = activeIndex !== null
  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className="flex gap-4 z-50" ref={navRef}>
      {PRODUCT_CATEGORIES.map((cat, i) => {

        const handleOpen = () => {
          if (activeIndex === i) setActiveIndex(null)
          else setActiveIndex(i)
        }

        const isOpen = i === activeIndex

        return <NavItem key={i} category={cat} isOpen={isOpen} isAnyOpen={isAnyOpen} handleOpen={handleOpen} />
      })}
    </div>
  )
}

export default NavItems