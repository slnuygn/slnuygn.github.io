'use client'

import { useState, useRef, useLayoutEffect } from 'react'

export default function RequestNotesSection() {
  const [selectedExtraTopics, setSelectedExtraTopics] = useState<string[]>(['Differential Equations', 'Calculus I'])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const copyTimeoutRef = useRef<number | null>(null)

  const extraTopics = ['Differential Equations', 'Calculus I', 'Calculus II', 'Physics I', 'Physics II', 'Machine Learning', 'System and Network Programming', 'Discrete Mathematics', 'Fundamentals of Programming Languages', 'Programming II (OOP, Java)', 'Design Patterns', 'Software Testing', 'Numerical Methods', 'Algorithms', 'Data Structures']

  const formatExtraTopics = (topics: string[]) => {
    if (topics.length === 0) {
      return 'topic(s)'
    }

    if (topics.length === 1) {
      return `${topics[0]}`
    }

    return `${topics.join(', ')}`
  }

  const requestNotesRequestText = selectedExtraTopics.length === 0
    ? "Hey Selin,\n\nI wouldn't like to request any notes,\n\nbye bye!"
    : `Hey Selin,\n\nI would like to request the notes for ${formatExtraTopics(selectedExtraTopics)},\n\nthanks!`

  const handleExtraTopicToggle = (topic: string) => {
    setSelectedExtraTopics((currentTopics) =>
      currentTopics.includes(topic)
        ? currentTopics.filter((currentTopic) => currentTopic !== topic)
        : [...currentTopics, topic],
    )
  }

  const handleCopyRequestNotesRequest = async () => {
    try {
      await navigator.clipboard.writeText(requestNotesRequestText)
      setCopied(true)
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current)
      }
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      const fallbackInput = document.createElement('textarea')
      fallbackInput.value = requestNotesRequestText
      fallbackInput.style.position = 'fixed'
      fallbackInput.style.opacity = '0'
      document.body.appendChild(fallbackInput)
      fallbackInput.select()
      document.execCommand('copy')
      document.body.removeChild(fallbackInput)
      setCopied(true)
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current)
      }
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
    }
  }

  useLayoutEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex min-h-[65vh] w-full flex-col items-center justify-center px-4 py-8 text-white">
      <div className="max-w-3xl text-left text-base leading-8 text-white/85 md:text-lg md:leading-9">
        <p>
          Did you know I was a bit of a nerd in college and that I am willing to share my notes for free with you? Just choose the topics you need below, copy the text and reach out to me via email at <span className="font-bold text-white">selinjoe34@gmail.com</span> or <span className="font-bold text-white">selinuygun2@posta.mu.edu.tr</span>! I&apos;ll be happy to help.
        </p>
      </div>

      <div className="mt-8 w-full max-w-3xl text-gray-900">
        <div className="relative">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 relative">
              <label className="text-lg font-semibold text-white" htmlFor="request-notes-dropdown-trigger">
                I would like to request the notes for:
              </label>
              <div className="relative w-80 md:w-64">
                <button
                  id="request-notes-dropdown-trigger"
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white hover:bg-gray-700 transition-colors"
                >
                  <input
                    id="request-notes-search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setIsDropdownOpen(true)
                    }}
                    onClick={() => setIsDropdownOpen(true)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm placeholder:text-gray-400 text-white focus:outline-none"
                  />
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 max-h-48 space-y-2 overflow-y-auto rounded-lg border border-gray-600 bg-gray-800 p-3 z-10 shadow-lg">
                    {extraTopics
                      .filter((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((topic) => (
                        <label key={topic} className="flex cursor-pointer items-center gap-3 rounded px-2 py-1 text-white transition-colors hover:bg-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedExtraTopics.includes(topic)}
                            onChange={() => handleExtraTopicToggle(topic)}
                            className="h-4 w-4 cursor-pointer rounded border-gray-500 bg-gray-700"
                          />
                          <span className="text-sm">{topic}</span>
                        </label>
                      ))}

                    {extraTopics.filter((t) => t.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                      <div className="text-sm text-gray-400 px-2 py-1">No results</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="relative rounded-lg border border-dashed border-gray-400 bg-gray-200 px-4 py-3 text-sm leading-7 text-gray-900 whitespace-pre-line">
              <button
                type="button"
                onClick={handleCopyRequestNotesRequest}
                aria-label="Copy request text"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-md border border-gray-400 bg-white p-0 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <span className="relative inline-block h-4 w-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className={`absolute inset-0 m-auto transition-all duration-300 ease-out ${copied ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                    aria-hidden="true"
                  >
                    <path d="M9 9h10v10H9z" />
                    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
                  </svg>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`absolute inset-0 m-auto transition-all duration-300 ease-out ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </button>
              {requestNotesRequestText}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
