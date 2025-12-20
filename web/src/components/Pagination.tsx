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
  
  // Ordenar las páginas por número de página
  const sortedData = [...data].sort((a, b) => a.page - b.page)
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
    const currentPage = sortedData[page]

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-amber-50 via-amber-100/50 to-orange-50 p-4">
        <div className="w-full max-w-md flex flex-col">
          {/* Página con aspect ratio A4 */}
          <div className="w-full aspect-210/297 bg-linear-to-br from-white to-amber-50/30 rounded-2xl shadow-xl border border-amber-200/50 backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="flex-1 p-6 overflow-hidden">
              {!currentPage.Imagen ? (
                <div className="h-full overflow-y-auto prose prose-sm prose-amber max-w-none prose-headings:text-amber-900 prose-p:text-gray-700 prose-p:leading-relaxed">
                  <BlocksRenderer content={currentPage.content} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <img 
                    src={`${currentPage.pgImagen?.url}`} 
                    alt="" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="py-3 text-center text-xs font-medium text-amber-600 border-t border-amber-200/30">
              Pàgina {currentPage.page}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-md gap-4 mt-6 px-2">
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

  const currentPage = sortedData[page]
  const next = sortedData[page + 1]
  const isLastSinglePage = !next && page === meta.pagination.total - 1

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-amber-50 via-amber-100/50 to-orange-50 p-6">
      <div className="flex items-center justify-center w-full max-w-7xl gap-0" style={{ height: '85vh' }}>

        {/* Página izquierda con aspect ratio A4 */}
        <div 
          className="h-full bg-linear-to-br from-white to-amber-50/40 rounded-l-2xl shadow-2xl border-y border-l border-amber-200/50 backdrop-blur-sm overflow-hidden flex flex-col"
          style={{ aspectRatio: '210/297' }}
        >
          <div className="flex-1 p-8 overflow-hidden">
            {!currentPage.Imagen ? (
              <div className="h-full overflow-y-auto prose prose-amber max-w-none prose-headings:text-amber-900 prose-p:text-gray-700 prose-p:leading-relaxed">
                <BlocksRenderer content={currentPage.content} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <img 
                  src={`${currentPage.pgImagen?.url}`} 
                  alt="" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>
          <div className="py-4 text-center text-sm font-medium text-amber-600 border-t border-amber-200/30">
            {currentPage.page}
          </div>
        </div>

        {/* Lomo */}
        <div className="h-full w-1 bg-linear-to-b from-amber-600 via-amber-700 to-amber-800 shadow-inner relative">
          <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
        </div>

        {/* Página derecha con aspect ratio A4 */}
        {next ? (
          <div 
            className="h-full bg-linear-to-bl from-white to-amber-50/40 rounded-r-2xl shadow-2xl border-y border-r border-amber-200/50 backdrop-blur-sm overflow-hidden flex flex-col"
            style={{ aspectRatio: '210/297' }}
          >
            <div className="flex-1 p-8 overflow-hidden">
              {!next.Imagen ? (
                <div className="h-full overflow-y-auto prose prose-amber max-w-none prose-headings:text-amber-900 prose-p:text-gray-700 prose-p:leading-relaxed">
                  <BlocksRenderer content={next.content} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <img 
                    src={`${next.pgImagen?.url}`} 
                    alt="" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="py-4 text-center text-sm font-medium text-amber-600 border-t border-amber-200/30">
              {next.page}
            </div>
          </div>
        ) : isLastSinglePage ? (
          <div 
            className="h-full bg-linear-to-bl from-white to-amber-50/40 rounded-r-2xl shadow-2xl border-y border-r border-amber-200/50 backdrop-blur-sm overflow-hidden flex flex-col"
            style={{ aspectRatio: '210/297' }}
          >
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