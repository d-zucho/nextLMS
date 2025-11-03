import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/themeToggle'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { headers } from 'next/headers'
import Image from 'next/image'

export default async function Home() {
  const {
    data: session,
    isPending, // loading state
    error, // error state
    refetch, // refetch the session
  } = authClient.useSession()
  }
  return (
    <div className='p-24'>
      <ThemeToggle />
      {/* FIXME -- uncomment and fix not finding session */}
      {/* {session ? <p>{session.user.name}</p> : <Button>Sign In</Button>} */}
    </div>
  )
}
