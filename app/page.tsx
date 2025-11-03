'use client'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/themeToggle'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Home() {
  const router = useRouter()

  const {
    data: session,
    isPending, // loading state
    error, // error state
    refetch, // refetch the session,
  } = authClient.useSession()

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/') // redirect to login page
          toast.success('Successfully signed out!')
        },
      },
    })
  }
  return (
    <div className='p-24'>
      {/* FIXME -- uncomment and fix not finding session */}
      <ThemeToggle />
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </div>
      ) : (
        <Button>Sign In</Button>
      )}
      <p></p>
    </div>
  )
}
