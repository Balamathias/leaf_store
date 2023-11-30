"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

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

import { SignUpValidation } from "@/utils/validators/account-credentials-validators"
import { Icons } from "@/components/Icons"
import Link from "next/link"
import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"



function SignUp() {

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const router = useRouter()

  const { mutate, isLoading  } = trpc.auth.createPayloadUser.useMutation()
 
  function onSubmit(values: z.infer<typeof SignUpValidation>) {
    console.log(values)
    mutate({
      email: values.email,
      password: values.password
    }, {
      onError: (error) => {
        if (error.data?.code === "CONFLICT") {
          toast.error("A User with this email already exists. Sign In instead.")
          return
        }
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("You are not authorized to use this application.")
          return
        }
        if (error instanceof z.ZodError) {
          toast.error(error.issues[0].message)
          return
        }

        toast.error("Sorry, Something went wrong.")
        return
      },
      onSuccess: ({ sentEmailto }) => {
        toast.success(`Verification Email sent to ${sentEmailto}`)
        router.push(`/verify-email?to=${sentEmailto}`)
        return
      }
    })
  }
  
  return (
    <Form {...form}>

      <div className="gap-y-1 mt-6  flex justify-center items-center w-full space-x-6 p-4 py-20">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 sm:w-[380px] p-4 flex flex-col">
          <div className="flex items-center gap-x-2">
            <Icons.logo className="w-10 h-10"/>
            <span className="font-bold text-xl bg-clip-text text-primary">MStore.</span>
          </div>
          <h2 className="font-bold text-lg">Create an account.</h2>
          <p className="text-muted-foreground">Welcome to MStore, your digital market space. Create an account to get started.</p>
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
          Sign Up
        </Button>
        <p className="text-muted-foreground text-sm space-y-0.5">Already have an account<Link href={'/sign-in'} className={buttonVariants({variant: "link"})}>Login to your account.</Link></p>
      </form>
      </div>
    </Form>
  )
}

export default SignUp