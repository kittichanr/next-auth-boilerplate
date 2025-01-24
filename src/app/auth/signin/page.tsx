"use client"

import { Typography, Input, Button } from "@material-tailwind/react"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { doCredentialLogin } from "@/app/actions"
import Link from "next/link"
import SocialLogins from "@/components/auth/SocialLogins"

export default function SignInPage() {
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur)

  const router = useRouter()
  const [error, setError] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)

      const response = await doCredentialLogin(formData)

      if (!!response.error) {
        console.error(response.error)
        setError(response.error.message)
      } else {
        router.push("/")
      }
    } catch (e) {
      console.error(e)
      setError("Check your Credentials")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="text-center p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-6">Welcome to Booking App</h1>
        <div className="text-xl text-red-500 mb-4">{error}</div>
        <form onSubmit={onSubmit} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <Input
              crossOrigin={"anonymous"}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              label="Email"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="mb-6">
            <Input
              crossOrigin={"anonymous"}
              size="lg"
              label="password"
              name="password"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisibility}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            sign in
          </Button>
        </form>
        <Typography
          variant="small"
          color="gray"
          className="!mt-4 text-center font-bold"
        >
          OR
        </Typography>
        <SocialLogins />
        <Typography
          variant="small"
          color="gray"
          className="!mt-4 text-center font-normal"
        >
          Not registered?{" "}
          <Link href="/auth/signup" className="font-medium text-gray-900">
            Create account
          </Link>
        </Typography>
      </section>
    </div>
  )
}
