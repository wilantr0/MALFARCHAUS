"use client"
import { useState } from "react"

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export default function Filter({
  sections,
  todas,
}: {
  sections: string[]
  todas: any[]
}) {
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [words, setWords] = useState(todas)

  async function applyFilter(nextSections: string[]) {
    setSelectedSections(nextSections)

    const encoded = nextSections.map(s => encodeURIComponent(s)).join(",")
    const res = await fetch(`/api/words?sections=${encoded}`)
    const data = await res.json()
    setWords(data)
  }

  function toggleSection(section: string) {
    if (section === "Todas") {
      // Toggle general
      if (selectedSections.length === sections.length) {
        applyFilter([]) // Deselecciona todo
      } else {
        applyFilter([...sections]) // Selecciona todo
      }
    } else {
      // Toggle individual
      if (selectedSections.includes(section)) {
        applyFilter(selectedSections.filter(s => s !== section))
      } else {
        applyFilter([...selectedSections, section])
      }
    }
  }

  const allSelected = selectedSections.length === sections.length

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">

      {/* CHIPS */}
      <div className="flex flex-wrap gap-2">
        {/* CHIP GENERAL */}
        <button
          onClick={() => toggleSection("Todas")}
          className={`
            px-4 py-1 rounded-full text-sm transition
            ${allSelected ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
          `}
        >
          Todas
        </button>

        {/* CHIPS INDIVIDUALES */}
        {sections.map(section => {
          const active = selectedSections.includes(section)
          return (
            <button
              key={section}
              onClick={() => toggleSection(section)}
              className={`
                px-4 py-1 rounded-full text-sm transition
                ${active ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              `}
            >
              {section}
            </button>
          )
        })}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-2">
        {words.map((word, index) => (
          <img
            key={index}
            src={`${word.post.url}`}
            alt=""
          />
        ))}
      </div>
    </div>
  )
}