"use client"

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { formatPrice } from "@/lib/utils"
import { Separator } from "@radix-ui/react-dropdown-menu"

import { ShoppingCart } from 'lucide-react'
import { ArrowBigRightDashIcon } from 'lucide-react'
import Image from "next/image"
import { buttonVariants } from "./ui/button"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import CartItem from "./CartItem"
import { ScrollArea } from "./ui/scroll-area"
import { useEffect, useState } from "react"

const Cart = () => {
  const {items} = useCart()
  const cartTotal = items.reduce((total, {product}) => total + product.price, 0)
  const itemsCount = items.length
  const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
    setIsMounted(true)
}, [])

// if (!isMounted) return null
  const fee = 10
  return (
    <Sheet>
        <SheetTrigger className="flex items-center gap-1 group">
            <ShoppingCart className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
            <span className="group-autofill:text-muted">({isMounted ? itemsCount : 0})</span>
        </SheetTrigger>
        <SheetContent className="md:max-w-lg flex flex-col gap-3">
            <SheetHeader>
                <SheetTitle>
                    Cart ({itemsCount})
                </SheetTitle>
            </SheetHeader>
            <>
                {itemsCount > 0 ? (<div className="flex flex-col gap-3">
                
                    <ScrollArea>
                    {
                      items.map(({product}) => 
                        <CartItem product={product} key={product.id} />
                        )
                    }
                   </ScrollArea>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                        <span>Transaction Details</span>
                        <span>{formatPrice(fee)}</span>
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                        <span className="font-md text-primary">Total</span>
                        <span>{formatPrice(cartTotal + fee)}</span>
                    </div>
                    <SheetFooter className="w-full space-y-6">
                        <SheetTrigger asChild>
                            <Link className={buttonVariants({className: "w-full flex gap-3 items-center"})} href='/cart'>
                                <span>Continue to Cart</span><ArrowBigRightDashIcon className="w-6 h-6" />
                            </Link>
                        </SheetTrigger>
                    </SheetFooter>
                </div>) : (
                    <div className="items-center justify-center flex flex-col gap-3 h-full min-h-screen space-y-1">
                        <div className="relative w-60 h-60 mb-4" aria-hidden={true}>
                            <Image fill src={'/empty_cart.jpg'} alt="empty shopping cart"
                                className="filter rounded-md"
                            />
                        </div>
                        <p className="text-base text-muted-foreground py-4">Your Cart is Empty. Go shopping to add products to Cart</p>
                        <SheetTrigger asChild>
                            <Link className={buttonVariants({className: "w-full text-sm flex gap-3 items-center", variant: "link", size: "sm"})} href='/products'>
                                <span>Add Items to Cart and Check out</span><ArrowBigRightDashIcon className="w-6 h-6" />
                            </Link>
                    </SheetTrigger>
                    </div>
                )}
            </>
        </SheetContent>
    </Sheet>
  )
}

export default Cart