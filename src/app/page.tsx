import MaxWrapper from "@/components/MaxWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, RocketIcon } from "lucide-react";
import Link from "next/link";


const perks = [
  {
    title: "M_Store, the best digital market store",
    Icon: ArrowDownToLine,
    description: "Get our best digital products instantly with a nanosecond delivery to email"
  },
  {
    title: "30 days Guarantee",
    Icon: CheckCircle,
    description: "Our team implemented a refund policy to get your money refunded."
  },
  {
    title: "Fast and Instant",
    Icon: RocketIcon,
    description: "Delivery to your email for download is in split seconds. Speed is one of our priority."
  },
]

export default function Home() {
  return (
    <>
    <MaxWrapper>
      <div className="w-max-3xl max-auto flex flex-col gap-3 md:py-30 min-h-screen py-5 text-center items-center justify-center">
        <h2 className="text-4xl md:text-6xl tracking-tight font-bold text-foreground">
          Discover a world of amazing digital Products brought to you by <span className="text-primary">MStore.</span>
        </h2>
        <p className="text-muted-foreground mt-6">
          We sell and provide quality products and services approved by our team. 
          Discover those digital products you have been looking for on MStore.
        </p>
        <div className="flex sm:flex-row flex-col gap-4 py-4">
          <Link href={'/products'} className={buttonVariants()}>
            Go to Products
          </Link>
          <Button variant={'ghost'}>
            Get Started
          </Button>
        </div>
      </div>

      {/** TODO: List products here */}
  <ProductReel href="/products" query={{limit: 4, sort: "desc"}} title="Brand New"/>
    </MaxWrapper>

    <section className="bg-muted">
      <MaxWrapper className="py-4">
        <div className="flex gap-3 flex-wrap md:flex-row flex-col md:justify-start items-center border border-muted">
          {perks.map(perk => (
            <div className="p-2  flex flex-col gap-1 items-center w-[300px] h-[300px] md:w-[400px]" key={perk.title}>
              <div className="flex justify-center items-center w-16 h-16 mb-6 rounded-full bg-violet-500">
                {<perk.Icon className="" />}
              </div>
              <div className="mt-4">
                <h3 className="text-base font-medium text-primary text-center">{perk.title}</h3>
                <p className="mt-5 text-muted-foreground text-center">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </MaxWrapper>
    </section>
    </>
  )
}
