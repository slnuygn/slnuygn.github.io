'use client'

import { useState } from 'react'
import RotatingAvatar from '@/components/RotatingAvatar'
import profile1 from '@/public/assets/profile/1.jpeg'
import profile2 from '@/public/assets/profile/2.jpeg'
import profile3 from '@/public/assets/profile/3.jpeg'

import TimelineSection from '@/components/sections/TimelineSection'
import InfoContactSection from '@/components/sections/InfoContactSection'
import WhoAmISection from '@/components/sections/WhoAmISection'
import RequestNotesSection from '@/components/sections/RequestNotesSection'
import RoadmapSection from '@/components/sections/RoadmapSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState('Timeline')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const avatarImages = [profile1, profile2, profile3]
  const ribbonLabels = [
    'Timeline',
    'Roadmap',
    'Info & Contact',
    'Who Am I?',
    'Request Notes',
  ]

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'Timeline':
        return <TimelineSection />
      case 'Roadmap':
        return <RoadmapSection />
      case 'Info & Contact':
        return <InfoContactSection />
      case 'Who Am I?':
        return <WhoAmISection />
      case 'Request Notes':
        return <RequestNotesSection />
      default:
        return (
          <div className="flex min-h-[65vh] flex-col items-center justify-center text-center text-white">
            <div className="max-w-xl rounded-3xl border border-white/15 bg-black/20 px-8 py-10 shadow-2xl backdrop-blur-sm">
              <h2 className="text-3xl font-semibold tracking-tight">{activeSection}</h2>
              <p className="mt-4 text-sm leading-6 text-white/75">
                This section is ready to hold its own content.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 xl:p-24">
      {/* Mobile menu toggle (phone only) */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-0 top-0 z-50 md:hidden group h-12 w-12 overflow-visible text-left transition-all duration-300 ease-out"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="flex h-full w-full items-center justify-center rounded-r-full px-2 text-base font-semibold text-stone-100 bg-stone-600 shadow-lg transition-colors">
          <svg className={`w-5 h-5 text-white transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex fixed left-0 top-[3.375rem] z-50 flex-col gap-1.5`}>
        {ribbonLabels.map((label, index) => (
          <button
            key={`${label}-${index}`}
            type="button"
            onClick={() => setActiveSection(label)}
            className={`group relative h-12 overflow-visible text-left transition-all duration-300 ease-out ${activeSection === label ? 'w-52' : 'w-36 hover:w-52'}`}
          >
            <div
              className={`flex h-full w-full items-center overflow-hidden rounded-r-full px-5 pr-10 text-base font-semibold text-stone-100 shadow-lg transition-all duration-300 ease-out dark:text-stone-50 ${activeSection === label ? 'w-52 justify-center bg-stone-500 dark:bg-stone-600' : 'justify-start bg-stone-600 group-hover:w-52 group-hover:justify-center group-hover:bg-stone-500 dark:bg-stone-700 dark:group-hover:bg-stone-600'}`}
            >
              <span className="whitespace-nowrap transition-all duration-300 ease-out">
                {label}
              </span>
            </div>
          </button>
        ))}
      </div>
      <RotatingAvatar images={avatarImages} interval={10000} />
      <div className="w-full max-w-6xl flex flex-col items-center">
        <div className="bg-gradient-to-b from-gray-300 to-gray-800 dark:from-gray-700 dark:to-gray-900 rounded-lg p-12 shadow-lg w-full flex flex-col gap-8 relative">
          {renderSectionContent()}
        </div>
      </div>
    </main>
  )
}
