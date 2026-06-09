'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import RotatingAvatar from '@/components/RotatingAvatar'
import Card from '@/components/Card'
import profile1 from '@/assets/profile/1.jpeg'
import profile2 from '@/assets/profile/2.jpeg'
import profile3 from '@/assets/profile/3.jpeg'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const cvFile = `${basePath}/assets/docs/CV_Selin_Uygun.pdf`

export default function Home() {
  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 })
  const [activeSection, setActiveSection] = useState('Timeline')
  const [selectedExtraTopics, setSelectedExtraTopics] = useState<string[]>(['Differential Equations', 'Calculus I'])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyTimeoutRef = useRef<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Stack behavior: append new cards at the end of timelineCards, they render at the top.
  const renderedTimelineCards = [
    {
      title: 'Started Mugla Sitki Kocman University',
      content: 'Enrolled in the software engineering program at the engineering faculty.',
      techStack: '',
    },
    {
      title: 'UI UX Design',
      content: 'Designed a UI&UX for a school community and events platform mobile application project, actively participating in scrum meetings.',
      techStack: 'Figma, Scrum, Agile Methodologies',
    },
    {
      title: 'Car Database Architecture project',
      content: 'Built a database architecture with a public second-hand car dataset, established the necessary relationships, and tested it by connecting it to an intuitive web UI.',
      techStack: 'MySQL, Relational Database Design',
    },
    {
      title: 'ERP Workflow And Document Management Internship at Aksoy Cozum',
      content: 'Gained experience in ERP workflow optimization and successfully implemented document management processes and workflows using the eBA software system and SQL Server Management Studio.',
      techStack: 'eBA Document & Workflow Management system, SQL Server Management Studio',
    },
    {
      title: 'Arduino Projects',
      content: 'Built various Arduino projects with various sensor integrations and microcontroller programming with C++.',
      techStack: 'Arduino, C++, Embedded Systems',
    },
    {
      title: 'Unity 2D Platformer',
      content: 'Designed the assets, character animations, and added gameplay mechanics for a 2D platformer game using Unity and C#.',
      techStack: 'Unity, C#, 2D Game Design, Animation',
    },
    {
      title: 'Web Frontend Development Internship at Virtus Arge',
      content: 'Participated in a team and helped develop the frontend of a learning management system web application, implemented UI components and integrated them with backend APIs, tested application and requests with Docker and Postman, while actively using version control tools.',
      techStack: 'React, Tailwind CSS, JavaScript, HTML, CSS, Postman, Docker, Git',
    },
    {
      title: 'EEG Old vs Young Classification And Analysis',
      content: 'Preprocessed and analyzed EEG data of young and old subjects, extracted features and built machine learning pipelines to classify the two groups with high accuracy. Implemented a web dashboard for visualizing the results and insights from the analysis.',
      techStack: 'MATLAB, Fieldtrip, Python, PyTorch, Flask',
    },
    {
      title: 'Huddle: School Communities App',
      content: 'Designed and developed a mobile application for school community, event engagement and community hierarchy management with Dart, Flutter and used NoSQL Firebase for backend.',
      techStack: 'Flutter, Dart, Firebase',
    },
    {
      title: 'NeuroPAC: A Preprocessing, Analysis and Classification Framework for EEG Data',
      content: 'Built an open-source EEG data analysis framework, connected MATLAB operations and Fieldtrip functions with Python, with an intuitive PyQt interface. Used TensorFlow for deep learning and machine learning pipelines and tested the framework on public EEG datasets.',
      techStack: 'Python, MATLAB, FieldTrip, PyQt, TensorFlow',
    },
    {
      title: 'Graduated Mugla Sitki Kocman University',
      content: 'Graduated with a degree in Software Engineering, with a GPA of 3.47 on a 4.0 scale.',
      techStack: '',
    },
    {
      title: 'Web-Based Learning Management System',
      content: 'Currently developing a web-based learning management system, using a service-oriented architecture. Planning to stress-test it on a local Kubernetes cluster using Minikube to validate scalability and resilience before production-style deployment.',
      techStack: 'TypeScript, Node.js, NestJS, PostgreSQL, Redis, RabbitMQ, Prisma, Docker, Next.js, Kubernetes',
    },
  ].reverse()

  useLayoutEffect(() => {
    if (activeSection !== 'Timeline') {
      setLineStyle({ top: 0, height: 0 })
      return
    }

    const updateLine = () => {
      const timelineContainer = timelineContainerRef.current
      const topRow = topRowRef.current
      const bottomRow = bottomRowRef.current

      if (!timelineContainer || !topRow || !bottomRow) {
        return
      }

      const containerRect = timelineContainer.getBoundingClientRect()
      const topRect = topRow.getBoundingClientRect()
      const bottomRect = bottomRow.getBoundingClientRect()

      const topCenter = topRect.top - containerRect.top + topRect.height / 2
      const bottomCenter = bottomRect.top - containerRect.top + bottomRect.height / 2

      setLineStyle({
        top: topCenter,
        height: Math.max(bottomCenter - topCenter, 0),
      })
    }

    updateLine()
    window.addEventListener('resize', updateLine)

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateLine)
      if (timelineContainerRef.current) {
        resizeObserver.observe(timelineContainerRef.current)
      }
      if (topRowRef.current) {
        resizeObserver.observe(topRowRef.current)
      }
      if (bottomRowRef.current) {
        resizeObserver.observe(bottomRowRef.current)
      }
    }

    return () => {
      window.removeEventListener('resize', updateLine)
      resizeObserver?.disconnect()
    }
  }, [activeSection, renderedTimelineCards.length])

  const avatarImages = [profile1, profile2, profile3]
  const ribbonLabels = [
    'Timeline',
    // 'Gallery',
    'Info & Contact',
    'Who Am I?',
    'Request Notes',
  ]
  const showTimeline = activeSection === 'Timeline'
  const extraTopics = ['Differential Equations', 'Calculus I', 'Calculus II', 'Physics I', 'Physics II', 'Machine Learning','System and Network Programming', 'Discrete Mathematics', 'Fundamentals of Programming Languages', 'Programming II (OOP, Java)', 'Design Patterns', 'Software Testing', 'Numerical Methods', 'Algorithms', 'Data Structures']

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

  // clear timeout on unmount
  useLayoutEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  const renderSectionContent = () => {
    if (showTimeline) {
      return (
        <div ref={timelineContainerRef} className="relative flex flex-col gap-2">
          {/* Center timeline line */}
          <div
            className="absolute left-1/2 w-px -translate-x-1/2 bg-gray-900 dark:bg-gray-100 z-0 md:z-10"
            style={{ top: `${lineStyle.top}px`, height: `${lineStyle.height}px` }}
          ></div>

          {/* Timeline cards */}
          {renderedTimelineCards.map((card, index) => {
            const isLeft = index % 2 === 0
            const rowRef =
              index === 0
                ? topRowRef
                : index === renderedTimelineCards.length - 1
                ? bottomRowRef
                : undefined

            return (
              <div
                key={card.title}
                ref={rowRef}
                className={`w-full flex relative justify-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
              >
                {isLeft ? (
                  <div className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2 ml-2 hidden md:flex items-center">
                    <div className="h-3 w-3 rounded-full border-2 border-gray-900 bg-transparent dark:border-gray-100"></div>
                    <div className="h-0.5 w-12 bg-gray-900 dark:bg-gray-100"></div>
                  </div>
                ) : (
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -ml-2 hidden md:flex items-center">
                    <div className="h-0.5 w-12 bg-gray-900 dark:bg-gray-100"></div>
                    <div className="h-3 w-3 rounded-full border-2 border-gray-900 bg-transparent dark:border-gray-100"></div>
                  </div>
                )}

                <div className="w-full md:w-5/12 relative z-10 md:z-0">
                  <Card title={card.title} techStack={card.techStack}>{card.content}</Card>
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    // Info & Contact: show CV preview and download
    if (activeSection === 'Info & Contact') {
      return (
        <div className="flex min-h-[65vh] flex-col items-center justify-center text-white">
          <p className="mt-2 text-sm text-white/80">Preview of my CV below. Feel free to download a copy.</p>

          <div className="w-full max-w-3xl mt-6">
            <iframe
              src={cvFile}
              title="CV Preview"
              className="w-full h-[560px] rounded-md border border-white/10"
            />
          </div>
        </div>
      )
    }

    if (activeSection === 'Who Am I?') {
      return (
        <div className="flex min-h-[65vh] w-full items-center justify-center px-4 py-8 text-white">
          <div className="max-w-3xl text-left text-base leading-8 text-white/85 md:text-lg md:leading-9">
             <p>
              Up until joining the software enginering program in my university, my knowledge in computer science wasn&apos;t beyond editing the HTML file of a website from a browser to prank my friends. I was familiar with the very basics of how to use a computer, but I was neither familiar with developing software nor applying engineering methodologies to it.
            </p>
            <p className="mt-6">
              When I first started the software engineering program, I had the tendency to classify the unfamiliar as &quot;hard&quot;, and not as &quot;unfamiliar&quot;. But when I started putting effort, studying and learning, I realized that I was far more capable than what I thought, and I started getting straight A’s as a result of my hard work.
            </p>
            <p className="mt-6">
              To further reinforce my love for learning, I pursued extracurricular activities such as learning to code and building Arduino projects by myself. At some point I formed a robotics club and even though it was short-lived, I formed unforgettable memories and friendships.
            </p>
            <p className="mt-6">
              But I wasn&apos;t done with extracurricular education yet, when my teacher who then became my advisor on my senior capstone project, introduced me to and taught me such an underappreciated and cool topic as neuroscience. It was the perfect opportunity to incorporate my software engineering skills with my new knowledge of brain signal processing and data science to conceive my senior capstone project.
            </p>
            <p className="mt-6">
              That is how I realized that I like to challenge my software engineering skills on various domains and projects. Seeing the successful outcome of my hard work became one of my great passions in my profession. Every day I&apos;m looking for new challenges and opportunities, finding new ideas and building projects to learn new languages and tools, and still reading and taking notes from the software engineering books we were taught at college.
            </p>
            <p className="mt-6">
              A long and winding road is ahead and I hope the journey never ends. The further I proceed the further I rebuild and reinforce my values as a software engineer.
            </p>
          </div>
        </div>
      )
    }

    if (activeSection === 'Request Notes') {
      return (
        <div className="flex min-h-[65vh] w-full flex-col items-center justify-center px-4 py-8 text-white">
          <div className="max-w-3xl text-left text-base leading-8 text-white/85 md:text-lg md:leading-9">
            <p>
              Did you know I was a total nerd in college and that I am willing to share my notes for free with you? Just choose the following available topics and copy the text beneath and reach out to me via email at <span className="font-bold text-white">selinjoe34@gmail.com</span> or <span className="font-bold text-white">selinuygun2@posta.mu.edu.tr</span>! I&apos;ll be happy to help.
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
