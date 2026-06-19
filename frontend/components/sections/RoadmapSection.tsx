'use client'

export default function RoadmapSection() {
  const roadmapItems = [
    { text: 'Read Engineering Software Products by Ian Sommerville', color: 'yellow' },
    { text: 'Fully Implement the Learning Management System Project', color: 'yellow' },
    { text: 'Enroll and Get Certification from Microsoft: Foundational C#', color: 'yellow' },
    { text: 'Enroll and Get Digital Badge from The Linux Foundation: Introduction to Linux (LFS101)', color: 'green' },
    { text: 'Read Fundamentals of Software Architecture by Mark Richards and Neal Ford', color: 'green' },
    { text: 'Read Computer Networking: A Top-Down Approach by Kurose and Ross', color: 'green' },
    { text: 'Get Certification from BTK Academy: Asp.Net Core Web API', color: 'green' },
    { text: 'Enroll and Get Certification from BTK Academy: DevOps Solutions (Jenkins)', color: 'gray' },
    { text: 'Enroll and Get Certification from BTK Academy: Kubernetes', color: 'gray' },
    { text: 'Enroll and Get Certification from BTK Academy: Cloud Computing Architectures', color: 'gray' },
  ]

  return (
    <div className="flex min-h-[65vh] w-full flex-col items-center justify-start px-4 py-8 text-white gap-4">
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {roadmapItems.map((item, index) => {
          let outlineColor = ''
          let statusText = ''
          let circleColor = ''

          if (item.color === 'green') {
            outlineColor = 'border-green-300/60'
            statusText = 'Up Next'
            circleColor = 'bg-green-300'
          } else if (item.color === 'yellow') {
            outlineColor = 'border-yellow-200/60'
            statusText = 'Ongoing'
            circleColor = 'bg-yellow-200'
          } else if (item.color === 'gray') {
            outlineColor = 'border-gray-500/50'
            statusText = 'Done'
            circleColor = 'bg-gray-500'
          }

          return (
            <div key={index} className={`w-full rounded-2xl md:rounded-full border-2 ${outlineColor} bg-black p-5 md:px-6 md:py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4`}>
              <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed md:leading-snug">{item.text}</p>
              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                <span className="text-white/60 text-sm font-semibold tracking-wide w-20 text-right">{statusText}</span>
                <div className={`h-3 w-3 shrink-0 rounded-full ${circleColor}`}></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
