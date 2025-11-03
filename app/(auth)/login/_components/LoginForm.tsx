'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { GithubIcon, Loader } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition()

  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Successfully signed in with GitHub!')
          },
          onError: (error) => {
            toast.error('Internal Server Error')
          },
        },
      })
    })
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Welcome back!</CardTitle>
          <CardDescription>
            Login with your Github or Email Account
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <Button
            disabled={githubPending}
            onClick={signInWithGithub}
            className='w-full'
            variant={'outline'}
          >
            <GithubIcon className='size-4' />
            {githubPending ? (
              <>
                <Loader className='size-4 animate-spin' />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Sign in with GitHub</span>
              </>
            )}
          </Button>

          <div className='relative text-sm text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-card px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>

          {/* email input */}
          <div className='grid gap-3'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input type='email' placeholder='johndoe@example.com' />
            </div>

            <Button>Continue with Email</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
