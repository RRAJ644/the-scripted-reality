'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { signInSchema } from '@/schemas/signInSchema'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form'

import { signIn } from 'next-auth/react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'

const SignIn = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setError(null)

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (res?.error) {
        throw new Error(res.error)
      }

      router.replace('/dashboard')
    } catch (error: any) {
      console.log(error, '===error')
      setError(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 w-80 p-6 border rounded-lg shadow-md'
        >
          <h2 className='text-xl font-semibold text-center'>Sign In</h2>

          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='email'>Email</Label>
                <FormControl>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='password'>Password</Label>
                <FormControl>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

          {/* Submit Button */}
          <Button type='submit' className='w-full'>
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn
