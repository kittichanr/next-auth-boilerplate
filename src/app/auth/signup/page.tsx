"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input } from "@material-tailwind/react"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid"

export default function SignupPage() {
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur)

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || "Something went wrong")
        return
      }

      router.push("/")
    } catch (err) {
      console.log(err)
      setError("Failed to sign up")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-4 border rounded-md shadow-md"
      >
        <h1 className="text-3xl mb-6">Signup</h1>
        {error && <p className="mb-2 text-red-500">{error}</p>}

        <div className="mb-6">
          <Input
            required
            crossOrigin={"anonymous"}
            id="email"
            color="gray"
            size="lg"
            type="text"
            name="name"
            label="Name"
            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
          />
        </div>

        <div className="mb-6">
          <Input
            required
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
            required
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

        <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
          Sign up
        </Button>
      </form>
    </div>
  )
}
