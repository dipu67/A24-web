'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Analytics', href: '/admin/analytics' },
  { name: 'Airdrops', href: '/admin/airdrops' },
  { name: 'Blog', href: '/admin/blog' },
  { name: 'Projects', href: '/admin/projects' },
  { name: 'Learn & Tools', href: '/admin/learn' },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname()

  // Don't show the admin layout on the login page
  if (pathname === '/admin/login') {
    return children
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              A24 Admin
            </Link>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            View Site
          </Link>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm rounded-md hover:bg-accent",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 