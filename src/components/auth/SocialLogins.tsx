import { doSocialLogin } from "@/app/actions"
import { Button } from "@material-tailwind/react"
import Image from "next/image"

const SocialLogins = () => {
  return (
    <form action={doSocialLogin}>
      <Button
        variant="outlined"
        size="lg"
        className="mt-4 flex h-12 items-center justify-center gap-2"
        fullWidth
        type="submit"
        name="action"
        value="github"
      >
        <Image
          src={`https://www.material-tailwind.com/logos/logo-google.png`}
          alt="google"
          className="h-6 w-6"
          width={24}
          height={24}
        />{" "}
        sign in with google
      </Button>
    </form>
  )
}

export default SocialLogins
