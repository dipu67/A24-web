'use client'

import { memo, useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { MobileNav } from "./MobileNav"
import { ThemeToggle } from "./theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

// Constants moved outside component for better performance
const LOGO_DIMENSIONS = { width: 32, height: 32 }

const NAVIGATION_ITEMS = {
  airdrops: [
    {
      title: "Active Airdrops",
      href: "/airdrops/active",
      description: "Currently active airdrops you can participate in right now.",
    },
    {
      title: "Upcoming Airdrops",
      href: "/airdrops/upcoming",
      description: "Soon-to-launch airdrops to watch and prepare for.",
    },
    {
      title: "Past Airdrops",
      href: "/airdrops/past",
      description: "Historical airdrops and their distribution details.",
    },
    {
      title: "My Airdrops",
      href: "/airdrops/my-airdrops",
      description: "Track and manage your airdrop participations.",
    },
  ],
  learn: [
    {
      title: "Airdrop Guide",
      href: "/learn/guide",
      description: "Learn how to participate in crypto airdrops safely.",
    },
    {
      title: "Eligibility Checker",
      href: "/tools/eligibility",
      description: "Check if you're eligible for upcoming airdrops.",
    },
    {
      title: "Risk Assessment",
      href: "/learn/risks",
      description: "Understand the risks and how to avoid airdrop scams.",
    },
    {
      title: "Wallet Setup",
      href: "/learn/wallet",
      description: "Set up your wallet correctly for airdrops.",
    },
  ],
}

// Memoized ListItem component
const ListItem = memo(({ className, title, children, ...rest }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white dark:hover:bg-black hover:text-accent-foreground focus:bg-white dark:focus:bg-black focus:text-accent-foreground",
          className
        )}
        {...rest}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
))

ListItem.displayName = "ListItem"

// Memoized Logo component
const Logo = memo(() => (
  <Link href="/" className="flex items-center space-x-2">
    <div className="relative w-8 h-8">
      <Image
        src="/A24.jpg"
        alt="A24"
        {...LOGO_DIMENSIONS}
        className="w-auto h-auto rounded-full"
        priority
      />
    </div>
    <span className="hidden sm:inline-block text-xl font-bold">
      A24
    </span>
  </Link>
))

Logo.displayName = "Logo"

// Memoized NavigationContent component
const NavigationContent = memo(({ items }) => (
  <NavigationMenuContent>
    <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2 bg-white dark:bg-black">
      {items.map((item) => (
        <ListItem
          key={item.title}
          title={item.title}
          href={item.href}
        >
          {item.description}
        </ListItem>
      ))}
    </ul>
  </NavigationMenuContent>
))

NavigationContent.displayName = "NavigationContent"

// Memoized MobileMenuButton component
const MobileMenuButton = memo(({ onClick }) => (
  <button 
    className="p-2"
    onClick={onClick}
    aria-label="Toggle mobile menu"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  </button>
))

MobileMenuButton.displayName = "MobileMenuButton"

// Main navigation component with client-side only rendering
export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only render after component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMobileMenuOpen = () => setIsMobileMenuOpen(true)
  const handleMobileMenuClose = () => setIsMobileMenuOpen(false)

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Airdrops</NavigationMenuTrigger>
                  <NavigationContent items={NAVIGATION_ITEMS.airdrops} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Learn & Tools</NavigationMenuTrigger>
                  <NavigationContent items={NAVIGATION_ITEMS.learn} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/projects" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Projects
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/calendar" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Calendar
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <MobileMenuButton onClick={handleMobileMenuOpen} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileNav 
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      />
    </>
  )
} 