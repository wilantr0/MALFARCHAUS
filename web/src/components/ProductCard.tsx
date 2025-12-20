import Link from "next/link"
import { Button } from "flowbite-react"

export default function ProductCard({
  name,
  imageUrl,
  stock,
  id,
}: {
  name: string
  imageUrl: string
  stock: boolean
  id: string
}) {
  return (
    <Link href={`/colecciones/${id}`}>
      <div className="
        bg-neutral-primary-soft
        p-4
        sm:max-w-50
        md:max-w-55
        aspect-4/7
        overflow-hidden
        flex
        flex-col
        justify-between
        gap-2
        hover:cursor-default
        rounded-xl
        shadow-[5px_6px_19px_-5px_rgba(0,0,0,0.1)]
      ">
        {/* Imagen */}
        <div className="w-full aspect-4/5 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="p-3">
          <h5 className="text-sm font-semibold text-heading line-clamp-2">
            {name}
          </h5>

          <span
            className={`inline-block mt-2 text-xs font-medium rounded-full
              ${stock ? "text-green-600" : "text-red-600"}
            `}
          >
            {stock ? "En stock" : "Sin stock"}
            
          </span>
          
          <button className="bg-amber-800/30 w-full py-3 rounded-md cursor-pointer">
            Ver mas 
          </button>

        </div>
      </div>
    </Link>
  )
}