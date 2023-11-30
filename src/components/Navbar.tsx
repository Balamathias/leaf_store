import Link from "next/link"
import { Icons } from "./Icons"
import MaxWrapper from "./MaxWrapper"
import NavItems from "./NavItems"
import { ModeToggle } from "@/utils/ModeToggle"
import { buttonVariants } from "./ui/button"
import Cart from "./Cart"
import { cookies } from 'next/headers'
import { getServerSideUser } from "@/lib/payload-utils"
import UserAccountNav from "./UserAccountNavigation"

const Navbar = async () => {
  
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <nav className="sticky z-50 bg-blend-darken bg-muted top-0 inset-x-0 h-16">
        <section className="bg-blend-darken bg-muted relative">
            <MaxWrapper className="md:p-12">
                <div className="flex justify-between items-center">
                    <div className="ml-2 lg:ml-0 flex itmes-center gap-3">
                    {/** TODO: Mobile Navigation */}

                        <div className="flex items-center justify-center ml-2 lg:ml-0">
                            <Link href={'/'} className="flex text-3xl items-center justify ml-2 lg:ml-0 center">
                                {<Icons.logo className="w-10 h-10" />}
                            </Link>
                        </div>
                        <div className="hidden z-50 lg:self-stretch md:block">
                            <NavItems />
                        </div>
                    </div>
                    <div className="ml-auto hidden lg:flex lg:flex-1 lg:items-center gap-3.5 justify-end mr-2">
                        {!user && (
                            <Link className={buttonVariants({variant: "outline"})} href={'/sign-in'}>
                                Sign In
                            </Link>
                        )}

                        {!user && (
                            <span className="h-6 bg-foreground w-px"></span>
                        )}

                        {user ? <UserAccountNav user={user} /> : null}

                        {!user && (
                            <Link className={buttonVariants({variant: "default"})} href={'/sign-up'}>
                                Sign Up
                            </Link>
                        )}

                        {!user && (
                            <span className="h-6 bg-foreground w-px lg:ml-6"></span>
                        )}

                        <ModeToggle />

                        {!user && (
                            <span className="h-6 bg-foreground w-px lg:ml-6"></span>
                        )}

                        <div>
                            <Cart />
                        </div>
                    </div>
                </div>
            </MaxWrapper>
        </section>
    </nav>
  )
}

export default Navbar