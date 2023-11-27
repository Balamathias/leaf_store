"use client"

import { ChevronDown } from 'lucide-react'

import { PRODUCT_CATEGORIES } from "@/config"
import { Button } from "./ui/button"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavbarProps {
    category: Category,
    handleOpen: () => void,
    isOpen: boolean,
    isAnyOpen?: boolean
}

function NavItem({ category, handleOpen, isOpen, isAnyOpen }: NavbarProps) {
  return (
    <div className="flex">
        <div className="flex relative gap-2">
            <Button variant={isOpen ? "secondary" : "ghost"} onClick={handleOpen}>
                {category?.label}
                <ChevronDown className={cn("text-muted-foreground", {
                    "-rotate-180": isOpen
                })}/>
            </Button>
        </div>
        {isOpen ? (
            <div className={cn("absolute top-full inset-x-0 text-sm text-muted-foreground", {
                "slide-in-from-top-5 animate-in fade-in-10": !isAnyOpen
            })}>
                <div className='absolute inset-0 top-1/2' />
                <div className='grid grid-cols-4 gap-x-8 gap-y-10 bg-blend-darken z-50 bg-secondary py-12 p-8'>
                    <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-4 gap-y-8'>
                        {category.featured.map(feature => (
                            <div
                                key={feature.name}
                                className='group relative text-base sm:text-sm '
                            >
                                <div className="relative aspect-video overflow-hidden rounded-lg bg-violet-200 group-hover:opacity-75 shadow-lg">
                                    <Image
                                        src={feature.imageSrc}
                                        alt={feature.name}
                                        className='object-cover object-center'
                                        fill
                                    />
                                </div>
                                <Link href={feature.href} className='mt-6 block font-medium text-muted-foreground text-lg rounded-md hover:text-primary transition-all'>
                                    {feature.name}
                                </Link>
                                <p aria-hidden={true} className='text-base'>Shop now</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : null}
    </div>
  )
}

export default NavItem