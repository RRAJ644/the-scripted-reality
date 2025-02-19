'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'writer',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Add API call for user registration
  }

  return (
    <section className='flex min-h-screen items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-semibold'>
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <Input
                name='name'
                type='text'
                placeholder='Enter your name'
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <Input
                name='email'
                type='email'
                placeholder='Enter your email'
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <Input
                name='password'
                type='password'
                placeholder='Enter your password'
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Role
              </label>
              <Select onValueChange={handleRoleChange} defaultValue='writer'>
                <SelectTrigger>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent className='bg-gray-200'>
                  <SelectItem value='superadmin'>Superadmin</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='writer'>Writer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className='w-full' type='submit'>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default SignUp
