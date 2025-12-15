"use client"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Button } from "flowbite-react"
import { useState, useEffect } from "react"

export function Reader({ data, meta }:{data:Array<object>, meta:object}) {
  
  const [page, setPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es dispositivo móvil/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextPage = () => {
    if (page < meta.pagination.total - 1) {
      setPage(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(prev => prev - 1)
    }
  }

  // Para móvil/tablet: mostrar una página a la vez
  if (isMobile) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-amber-600/30 p-4">
        {/* Contenedor de página única para móvil */}
        <div className="w-full max-w-2xl h-[80vh] flex flex-col items-center justify-center">
          {/* Página actual */}
          <div className="w-full h-full p-6 bg-gradient-to-r from-neutral-50 to-amber-50 rounded-xl shadow-lg">
            <div className="h-full overflow-y-auto pr-2">
              <BlocksRenderer content={data[page].content} />
            </div>
            <div className="mt-4 text-center text-amber-700">
              {data[page].page}
            </div>
          </div>
        </div>

        {/* Controles para móvil */}
        <div className="flex flex-row justify-center items-center gap-6 mt-6">
          {page === 0 ? (
            <div className="w-24"></div>
          ) : (
            <Button onClick={prevPage} className="bg-amber-600 hover:bg-amber-700">
              Prev
            </Button>
          )}
          
          <div className="text-sm text-amber-800">
            Página {Number(data[page].page)} de {meta.pagination.total}
          </div>
          
          {page === meta.pagination.total - 1 ? (
            <div className="w-24 text-center text-amber-700 font-medium">FIN</div>
          ) : (
            <Button onClick={nextPage} className="bg-amber-600 hover:bg-amber-700">
              Next
            </Button>
          )}
        </div>
      </div>
    )
  }

  // Para desktop: mostrar dos páginas como originalmente
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-amber-600/30 p-4">
      <div className="flex flex-row justify-center items-center w-full max-w-6xl h-[80vh]">
        {/* Página izquierda */}
        <div className="flex flex-col justify-between items-center w-full h-full p-6 bg-gradient-to-r from-neutral-50 to-amber-50 rounded-l-xl shadow-lg">
          <div className="w-full h-full overflow-y-auto pr-4">
            <BlocksRenderer content={data[page].content} />
          </div>
          <div className="mt-4 text-amber-700">
            {data[page].page}
          </div>
        </div>

        {/* Separador visual (simula lomo del libro) */}
        <div className="h-full w-2 bg-gradient-to-b from-amber-500 to-amber-600"></div>

        {/* Página derecha o FIN */}
        {page + 1 === meta.pagination.total ? (
          <div className="flex flex-col justify-between items-center w-full h-full p-6 bg-gradient-to-l from-neutral-50 to-amber-100 rounded-r-xl shadow-lg">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-4">CABO</div>
                <p className="text-amber-600">Cabo del conteniu</p>
              </div>
            </div>
            <div className="text-amber-700">
              {Number(data[page].page) + 1}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center w-full h-full p-6 bg-gradient-to-l from-neutral-50 to-amber-100 rounded-r-xl shadow-lg">
            <div className="w-full h-full overflow-y-auto pl-4">
              <BlocksRenderer content={data[page + 1].content} />
            </div>
            <div className="mt-4 text-amber-700">
              {data[page + 1].page}
            </div>
          </div>
        )}
      </div>

      {/* Controles de navegación */}
      <div className="flex flex-row justify-center items-center gap-10 mt-6">
        {page === 0 ? (
          <Button disabled className="px-6 opacity-50">
            Recula
          </Button>
        ) : (
          <Button 
            onClick={prevPage} 
            className="bg-amber-600 hover:bg-amber-700 px-6"
          >
            Recula
          </Button>
        )}
        
        {page === meta.pagination.total - 1 ? (
          <Button disabled className="px-6 opacity-50">
            Abanza
          </Button>
        ) : (
          <Button 
            onClick={nextPage} 
            className="bg-amber-600 hover:bg-amber-700 px-6"
          >
            Abanza
          </Button>
        )}
      </div>
    </div>
  )
}