import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'

const footerConfig = {
  companyName: 'Lovable',
  year: new Date().getFullYear(),
  socialLinks: [
    { name: 'Twitter', url: 'https://twitter.com', icon: FaTwitter },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: FaLinkedin },
    { name: 'Facebook', url: 'https://facebook.com', icon: FaFacebook },
  ],
  links: [
    { label: 'Privacy', url: '/privacy' },
    { label: 'Terms', url: '/terms' },
    { label: 'FAQ', url: '/faq' },
  ],
  mainLinks: [
    { label: 'About', url: '/about' },
    { label: 'Features', url: '/features' },
    { label: 'Pricing', url: '/pricing' },
    { label: 'Contact', url: '/contact' },
  ],
}

const Footer = () => {
  return (
    <footer className='relative overflow-hidden py-20'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4 py-6'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-neutral-900'>
              {footerConfig.companyName}
            </h3>
            <p className='text-sm text-neutral-600'>
              Creating beautiful and functional web applications with
              cutting-edge technology and design principles.
            </p>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-medium uppercase text-neutral-900'>
              Company
            </h4>
            <ul className='space-y-3'>
              {footerConfig.mainLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className='group inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900'
                  >
                    <span>{link.label}</span>
                    <ArrowRight className='ml-1 h-4 w-4 opacity-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className='space-y-4'>
            <h4 className='text-sm font-medium uppercase text-neutral-900'>
              Legal
            </h4>
            <ul className='space-y-3'>
              {footerConfig.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className='group inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900'
                  >
                    <span>{link.label}</span>
                    <ArrowRight className='ml-1 h-4 w-4 opacity-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div className='space-y-4'>
            <h4 className='text-sm font-medium uppercase text-neutral-900'>
              Social
            </h4>
            <div className='flex space-x-4'>
              {footerConfig.socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group rounded-full border border-neutral-200 p-2 hover:border-neutral-900 hover:bg-neutral-900'
                  >
                    <Icon className='h-5 w-5 text-neutral-600 transition-colors duration-200 group-hover:text-white' />
                    <span className='sr-only'>{link.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between border-t border-neutral-200 md:flex-row md:space-y-0 py-6'>
          <p className='text-sm text-neutral-600'>
            &copy; {footerConfig.year} {footerConfig.companyName}. All rights
            reserved.
          </p>
          <p className='text-sm text-neutral-500'>Crafted with precision</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
