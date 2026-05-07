'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import RotatingAvatar from '@/components/RotatingAvatar'
const cvFile = '/assets/docs/CV_Selin_Uygun.pdf'
import Card from '@/components/Card'
import profile1 from '@/assets/profile/1.jpeg'
import profile2 from '@/assets/profile/2.jpeg'
import profile3 from '@/assets/profile/3.jpeg'

export default function Home() {
  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 })
  const [activeSection, setActiveSection] = useState('Timeline')
  const [selectedExtraTopics, setSelectedExtraTopics] = useState<string[]>(['Differential Equations', 'Calculus I'])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    'Extras',
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

  const extrasRequestText = selectedExtraTopics.length === 0 
    ? "Hey Selin,\n\nI wouldn't like to request any notes,\n\nbye bye!" 
    : `Hey Selin,\n\nI would like to request the notes for ${formatExtraTopics(selectedExtraTopics)},\n\nthanks!`

  const handleExtraTopicToggle = (topic: string) => {
    setSelectedExtraTopics((currentTopics) =>
      currentTopics.includes(topic)
        ? currentTopics.filter((currentTopic) => currentTopic !== topic)
        : [...currentTopics, topic],
    )
  }

  const handleCopyExtrasRequest = async () => {
    try {
      await navigator.clipboard.writeText(extrasRequestText)
    } catch {
      const fallbackInput = document.createElement('textarea')
      fallbackInput.value = extrasRequestText
      fallbackInput.style.position = 'fixed'
      fallbackInput.style.opacity = '0'
      document.body.appendChild(fallbackInput)
      fallbackInput.select()
      document.execCommand('copy')
      document.body.removeChild(fallbackInput)
    }
  }

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
        <div className="flex min-h-[65vh] w-full flex-col items-center justify-center px-4 py-8 text-white">
          <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-black/20 p-4 shadow-2xl backdrop-blur-sm md:p-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Info &amp; Contact</h2>
                <p className="mt-2 text-sm text-white/75">Preview my CV inline, open it in a new tab, or download the PDF directly.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  Open PDF
                </a>
                <a
                  href={cvFile}
                  download
                  className="inline-flex items-center justify-center rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-white"
                >
                  Download CV
                </a>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/95">
              <object data={cvFile} type="application/pdf" className="h-[70vh] min-h-[560px] w-full">
                <div className="flex h-[70vh] min-h-[560px] flex-col items-center justify-center gap-4 px-6 text-center text-stone-900">
                  <p className="text-lg font-semibold">Your browser cannot preview PDFs inline.</p>
                  <p className="max-w-lg text-sm leading-6 text-stone-700">
                    Use the button above to open the CV in a new tab or download the file directly.
                  </p>
                  <a
                    href={cvFile}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
                  >
                    View CV
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )
    }

    if (activeSection === 'Who Am I?') {
      return (
        <div className="flex min-h-[65vh] w-full items-center justify-center px-4 py-8 text-white">
          <div className="max-w-3xl text-left text-base leading-8 text-white/85 md:text-lg md:leading-9">
            <p>
              Like most teenagers, I didn’t know who I was, what I wanted from life and what I could contribute to it for a very long time. This was still the case when I signed up for the software engineering program in my university. I was familiar with the very basics of how to use a computer, but I was neither familiar with developing software nor applying engineering methodologies to it. I classified everything unfamiliar I saw as “hard”, and not “unfamiliar”.
            </p>
            <p className="mt-6">
              But when I started learning, even when it was absolutely necessary because I was failing multiple classes for the 3rd time, I realized that I was way more than what I thought I was, and I started getting straight A’s as a result of my hard work.
            </p>
            <p className="mt-6">
              To further reinforce my love for learning, I pursued extracurricular activities such as learning to code and build Arduino projects by myself, I even tried to form a robotics club at some point and as a result I formed unforgettable memories and invaluable friendships.
            </p>
            <p className="mt-6">
              But I wasn’t done with extracurricular education yet, when my teacher who then later also became my advisor on my senior capstone project, introduced me to and taught me such an underappreciated and cool topic as neuroscience. It was the perfect opportunity to incorporate my new knowledge of data science, brain signal processing and software engineering skills to conceive my senior capstone project.
            </p>
            <p className='mt-6'>
              Every day I&apos;m looking for new challenges and opportunities, finding new ideas and building projects to learn new languages and tools, and still reading software engineering books we were taught at college.
            </p>
            <p className="mt-6">
              In summary, after a lot of existential crises, hard work, grief and a lot of journaling, I started seeing me for me, what my values and traits were and are. This is still an ongoing process, and I hope it never ends. The further I proceed the further I reinforce and rebuild my values as a person and my love for my profession.
            </p>
          </div>
        </div>
      )
    }

    if (activeSection === 'Extras') {
      return (
        <div className="flex min-h-[65vh] w-full flex-col items-center justify-center px-4 py-8 text-white">
          <div className="max-w-3xl text-left text-base leading-8 text-white/85 md:text-lg md:leading-9">
            <p>
              Did you know I was a total nerd in college and that I have the best class notes ever and I am willing to share them for free with you? Just choose the following available topics and copy the text beneath and reach out to me via email at <span className="font-bold text-white">selinjoe34@gmail.com</span> or <span className="font-bold text-white">selinuygun2@posta.mu.edu.tr</span>! I&apos;ll be happy to help.
            </p>
          </div>

          <div className="mt-8 w-full max-w-3xl text-gray-900">
            <div className="relative">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 relative">
                  <label className="text-lg font-semibold text-white" htmlFor="extras-dropdown-trigger">
                    I would like to request the notes for:
                  </label>
                  <div className="relative w-80 md:w-64">
                    <button
                      id="extras-dropdown-trigger"
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-sm text-gray-400">Search...</span>
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
                        {extraTopics.map((topic) => (
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
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative rounded-lg border border-dashed border-gray-400 bg-gray-200 px-4 py-3 text-sm leading-7 text-gray-900 whitespace-pre-line">
                  <button
                    type="button"
                    onClick={handleCopyExtrasRequest}
                    aria-label="Copy request text"
                    className="absolute right-3 top-3 rounded-md border border-gray-400 bg-white p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                      <path d="M9 9h10v10H9z" />
                      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
                    </svg>
                  </button>
                  {extrasRequestText}
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
