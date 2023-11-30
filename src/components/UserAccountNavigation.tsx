'use client'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { User } from "../payload-types";

const UserAccountNav = ({ user }: { user: User | null }) => {
  const { signOut } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='secondary'
          size='sm'
          className='relative border border-primary'>
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-background w-60'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/sell'>Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={signOut}
          className='cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav