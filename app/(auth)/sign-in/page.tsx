import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SignIn = () => {
  return (
    <section className='flex min-h-screen items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-semibold'>
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <Input type='email' placeholder='Enter your email' required />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <Input
                type='password'
                placeholder='Enter your password'
                required
              />
            </div>
            <Button className='w-full' type='submit'>
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default SignIn
