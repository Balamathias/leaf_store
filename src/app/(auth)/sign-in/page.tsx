"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"

import { SignInValidation } from "@/utils/validators/account-credentials-validators"
import { Icons } from "@/components/Icons"
import Link from "next/link"
import { trpc } from "@/trpc/client"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"


function SignIn() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const isSeller = searchParams.get("as") === 'seller'
  const origin = searchParams.get("origin")

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const { mutate, isLoading  } = trpc.auth.signIn.useMutation(
    {
      onSuccess: () => {
        
        toast.success("Signed In Successfully.")
        
        if (origin) {
          router.push(`${origin}`)
          return
        }

        if (isSeller) {
          router.push("/sell")
          return
        }

        router.refresh()
        router.push('/')
      },

      onError: (error) => {
        if (error.data?.code === 'UNAUTHORIZED') {
          toast.error("Your Password or email is not correct!")
          return
        }

        if (error instanceof z.ZodError) {
          toast.error(error.issues[0].message)
          return
        }

        toast.error("Something went wrong, please check your internet connection and try again")
        return
      }
    }
  )
 
  function onSubmit(values: z.infer<typeof SignInValidation>) {
    mutate({
      email: values.email,
      password: values.password
    })
  }

  function continueAsBuyer() {
  router.replace("/sign-in", undefined)
  }

  function continueAsSeller() {
    router.push("?as=seller")
  }
  
  return (
    <Form {...form}>

      <div className="gap-y-1 mt-6  flex justify-center items-center w-full space-x-6 p-4 py-20">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 sm:w-[380px] p-4 flex flex-col">
          <div className="flex items-center gap-x-2">
            <Icons.logo className="w-10 h-10"/>
            <span className="font-bold text-xl bg-clip-text text-primary">MStore.</span>
          </div>
          <h2 className="font-bold text-lg">Sign In to your {isSeller && "seller"} account.</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@gmail.com" type="email" className="" {...field} />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your password" type="password" className=""  {...field} />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
        <Button type="submit" className="bg-primary" disabled={isLoading} aria-disabled={isLoading}>
          Sign In
        </Button>

        <div className='relative'>
          <div
            aria-hidden='true'
            className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              or
            </span>
          </div>
        </div>

        {isSeller ? (
          <Button
            onClick={continueAsBuyer}
            variant='secondary'
            type="button"
            disabled={isLoading}>
            Continue as customer
          </Button>
        ) : (
          <Button
            onClick={continueAsSeller}
            variant='secondary'
            type="button"
            disabled={isLoading}>
            Continue as seller
          </Button>
        )}
        <p className="text-muted-foreground text-sm space-y-0.5">{"Don't"} have an account yet? <Link href={'/sign-up'} className={buttonVariants({variant: "link"})}>Create an account.</Link></p>
      </form>
</div>
    </Form>
  )
}

export default SignIn