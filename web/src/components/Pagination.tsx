"use client"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Button } from "flowbite-react"
import { useState, useEffect } from "react"

interface PageContent {
  page: number
  content: any[]
  Imagen?: boolean
  pgImagen?: {
    url: string
  }
}

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

interface Meta {
  pagination: Pagination
}

interface ReaderProps {
  data: PageContent[]
  meta: Meta
}

export function Reader({ data, meta }: ReaderProps) {
  const [page, setPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const lastIndex = meta.pagination.total - 1


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

 const nextPage = () => {
  if (page + 2 <= lastIndex) {
    setPage((prev) => prev + 2)
  }
}

  const prevPage = () => {
  if (page - 2 >= 0) {
    setPage((prev) => prev - 2)
  }
}

  /* =======================
        MOBILE
  ======================= */

  if (isMobile) {
    const currentPage = data[page]

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-amber-50 via-amber-100/50 to-orange-50 p-4">
        <div className="w-full max-w-2xl h-[85vh] flex flex-col">
          <div className="flex-1 p-8 bg-linear-to-br from-white to-amber-50/30 rounded-2xl shadow-xl border border-amber-200/50 backdrop-blur-sm">
            <div className="h-full overflow-y-auto pr-3 prose prose-amber max-w-none prose-headings:text-amber-900 prose-p:text-gray-700 prose-p:leading-relaxed">
              {
                !currentPage.Imagen ?
                <BlocksRenderer content={currentPage.content} />
                : <img src={`http://localhost:1337${currentPage.pgImagen?.url}`} alt="" />
              }
            </div>
            <div className="mt-6 text-center text-sm font-medium text-amber-600">
              Pàgina {currentPage.page}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-2xl gap-4 mt-6 px-2">
          <Button onClick={prevPage} disabled={page === 0}>
            Anterior
          </Button>

          <Button onClick={nextPage} disabled={page + 1 >= meta.pagination.total}>
            Següent
          </Button>
        </div>
      </div>
    )
  }

  /* =======================
        DESKTOP
  ======================= */

  const currentPage = data[page]
  const next = data[page + 1]
  const isLastSinglePage = !next && page === meta.pagination.total - 1


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-amber-50 via-amber-100/50 to-orange-50 p-6">
      <div className="flex items-stretch justify-center w-full max-w-7xl h-[85vh] gap-0">

        {/* Página izquierda */}
        <div className="flex flex-col justify-between w-full h-full p-10 bg-linear-to-br from-white to-amber-50/40 rounded-l-2xl shadow-2xl border-y border-l border-amber-200/50 backdrop-blur-sm">
          <div className="flex-1 overflow-y-auto pr-6 prose prose-amber max-w-none prose-headings:text-amber-900 prose-p:text-gray-700 prose-p:leading-relaxed">
            {
              !currentPage.Imagen ?
              <BlocksRenderer content={currentPage.content} />
              : <img src={`http://localhost:1337${currentPage.pgImagen?.url}`} alt="" />
            }
          </div>
          <div className="mt-6 text-center text-sm font-medium text-amber-600 border-t border-amber-200/30 pt-4">
            {currentPage.page}
          </div>
        </div>

        {/* Lomo */}
        <div className="w-0.5 bg-linear-to-b from-amber-600 via-amber-700 to-amber-800 shadow-inner relative">
          <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
        </div>

        {/* Página derecha */}
        {next ? (
          <div className="flex flex-col justify-between w-full h-full p-10 bg-linear-to-bl from-white to-amber-50/40 rounded-r-2xl shadow-2xl border-y border-r border-amber-200/50 backdrop-blur-sm">
            <div className="flex-1 overflow-y-auto pl-6 prose prose-amber max-w-none prose-headings:text-amber-900 prose-p:text-gray-700 prose-p:leading-relaxed">
              {
                !next.Imagen ?
                <BlocksRenderer content={next.content} />
                : <img src={`http://localhost:1337${next.pgImagen?.url}`} alt="" />
              }
            </div>
            <div className="mt-6 text-center text-sm font-medium text-amber-600 border-t border-amber-200/30 pt-4">
              {next.page}
            </div>
          </div>
        ) : isLastSinglePage ? (
          <div className="flex flex-col justify-between w-full h-full p-10 bg-linear-to-bl from-white to-amber-50/40 rounded-r-2xl shadow-2xl border-y border-r border-amber-200/50 backdrop-blur-sm">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-amber-700">FIN</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-8 mt-8">
        <Button onClick={prevPage} disabled={page === 0}>
          ← Recula
        </Button>

        <Button onClick={nextPage} disabled={page + 2 > lastIndex}>
          Abanza →
        </Button>
      </div>
    </div>
  )
}