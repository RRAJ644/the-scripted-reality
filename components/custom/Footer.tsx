import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'

const footerConfig = {
  companyName: 'Read Reality',
  year: new Date().getFullYear(),
  tagline: 'Your Gateway to Engaging Screenwriting & Digital Storytelling',
  socialLinks: [
    { name: 'Twitter', url: 'https://twitter.com', icon: FaTwitter },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: FaLinkedin },
    { name: 'Facebook', url: 'https://facebook.com', icon: FaFacebook },
  ],
  links: [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'Frequently Asked Questions', url: '/faq' },
  ],
  mainLinks: [
    { label: 'About Us', url: '/about' },
    { label: 'Key Features', url: '/features' },
    { label: 'Pricing Plans', url: '/pricing' },
    { label: 'Contact Support', url: '/contact' },
  ],
}

const Footer = () => {
  return (
    <footer className='relative overflow-hidden mt-10 py-10 bg-neutral-50'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4 py-6'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-neutral-900'>
              {footerConfig.companyName}
            </h3>
            <p className='text-sm text-neutral-700'>{footerConfig.tagline}</p>
            <p className='text-sm text-neutral-700'>
              Explore expert screenwriting services, creative content, and
              insightful storytelling.
            </p>
          </div>

          {/* Company Links */}
          <div className='space-y-4'>
            <h4 className='text-sm font-bold uppercase text-neutral-900'>
              Explore
            </h4>
            <ul className='space-y-3'>
              {footerConfig.mainLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className='group inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900'
                    aria-label={`Navigate to ${link.label}`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className='ml-2 h-4 w-4 opacity-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className='space-y-4'>
            <h4 className='text-sm font-bold uppercase text-neutral-900'>
              Legal Information
            </h4>
            <ul className='space-y-3'>
              {footerConfig.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className='group inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900'
                    aria-label={`Read our ${link.label}`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className='ml-2 h-4 w-4 opacity-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className='space-y-4'>
            <h4 className='text-sm font-bold uppercase text-neutral-900'>
              Connect With Us
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
                    className='group rounded-full border border-neutral-300 p-2 hover:border-neutral-900 hover:bg-neutral-900'
                    aria-label={`Follow us on ${link.name}`}
                    title={`Follow ${footerConfig.companyName} on ${link.name}`}
                  >
                    <Icon className='h-5 w-5 text-neutral-600 transition-colors duration-200 group-hover:text-white' />
                  </a>
                )
              })}
            </div>
            <p className='text-sm text-neutral-600'>
              Follow us for the latest insights into screenwriting and content
              marketing.
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between border-t border-neutral-200 md:flex-row md:space-y-0 py-6'>
          <p className='text-sm text-neutral-600'>
            &copy; {footerConfig.year} {footerConfig.companyName}. All rights
            reserved.
          </p>
          <p className='text-sm text-neutral-500'>
            Empowering Creativity Through Storytelling Excellence
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
