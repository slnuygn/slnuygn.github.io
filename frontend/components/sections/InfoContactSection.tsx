'use client'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const cvFile = `${basePath}/assets/docs/CV_Selin_Uygun.pdf`

export default function InfoContactSection() {
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
