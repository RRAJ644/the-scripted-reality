'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import * as z from 'zod'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'

import { signUpSchema } from '@/schemas/signUpSchema'

const SignUp = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'writer',
    },
  })

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setError(null)
    try {
      const response = await axios.post('/api/sign-up', data)

      if (response.data.success) {
        router.replace('/sign-in')
      } else {
        setError(response.data.message)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 w-80 p-6 border rounded-lg shadow-md'
        >
          <h2 className='text-xl font-semibold text-center'>Sign Up</h2>

          {/* Name Field */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='name'>Full Name</Label>
                <FormControl>
                  <Input id='name' placeholder='Enter your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Role Select Field */}
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='role'>Role</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='superadmin'>Superadmin</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='writer'>Writer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

          {/* Submit Button */}
          <Button type='submit' className='w-full'>
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUp
