import Image from "next/image"
import Link from "next/link"

export default function JourneySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left content */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-[#2e7d32] mb-6">
                Our journey to building the best version of Moderna
              </h2>

              <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
                READ OUR 2023 ESG REPORT
                <div className="ml-2 flex items-center justify-center w-6 h-6 rounded-full border border-[#2e7d32]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Right image */}
            <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
              <Image
                src="/esg-diagram.png"
                alt="Moderna ESG Diagram"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
