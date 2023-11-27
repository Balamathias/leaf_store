import Link from "next/link"
import { Icons } from "./Icons"
import MaxWrapper from "./MaxWrapper"
import NavItems from "./NavItems"
import { ModeToggle } from "@/utils/ModeToggle"

const Navbar = () => {
  return (
    <nav className="sticky z-50 bg-blend-darken bg-muted top-0 inset-x-0 h-16">
        <section className="bg-blend-darken bg-muted relative">
            <MaxWrapper className="md:p-12">
                <div className="flex justify-between">
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
                    <ModeToggle />
                </div>
            </MaxWrapper>
        </section>
    </nav>
  )
}

export default Navbar