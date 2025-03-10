'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from "@/lib/utils"

export function MobileNav({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState(null)

  const sections = {
    airdrops: [
      { title: "Active Airdrops", href: "/airdrops/active" },
      { title: "Upcoming Airdrops", href: "/airdrops/upcoming" },
      { title: "Past Airdrops", href: "/airdrops/past" },
      { title: "My Airdrops", href: "/airdrops/my-airdrops" },
    ],
    learn: [
      { title: "Airdrop Guide", href: "/learn/guide" },
      { title: "Eligibility Checker", href: "/tools/eligibility" },
      { title: "Risk Assessment", href: "/learn/risks" },
      { title: "Wallet Setup", href: "/learn/wallet" },
    ]
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-background md:hidden",
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs border-l bg-background p-6 shadow-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={onClose} className="p-2 -mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Main Navigation */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveSection(activeSection === 'airdrops' ? null : 'airdrops')}
              className="flex items-center justify-between w-full p-2 text-left text-lg font-medium hover:bg-accent rounded-md"
            >
              Airdrops
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
                className={`w-4 h-4 transition-transform ${activeSection === 'airdrops' ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {activeSection === 'airdrops' && (
              <div className="pl-4 space-y-1">
                {sections.airdrops.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block p-2 text-sm hover:text-primary"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <button
              onClick={() => setActiveSection(activeSection === 'learn' ? null : 'learn')}
              className="flex items-center justify-between w-full p-2 text-left text-lg font-medium hover:bg-accent rounded-md"
            >
              Learn & Tools
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
                className={`w-4 h-4 transition-transform ${activeSection === 'learn' ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {activeSection === 'learn' && (
              <div className="pl-4 space-y-1">
                {sections.learn.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block p-2 text-sm hover:text-primary"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/projects"
              className="block p-2 text-lg font-medium hover:bg-accent rounded-md"
              onClick={onClose}
            >
              Projects
            </Link>

            <Link
              href="/calendar"
              className="block p-2 text-lg font-medium hover:bg-accent rounded-md"
              onClick={onClose}
            >
              Calendar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 