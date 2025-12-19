import Filter from "@/components/Filter";
import { getWords } from "@/lib/strapi";

type Item = {
  id: number
  documentId: string
  SECCION: string
  post: {
    id: number
    documentId: string
    url: string
  }
}

export default async function Diccionario() {

  const palabras = await getWords()
  console.log(palabras)

  let secciones:string[] = []


  palabras.map((palabra:Item) => {
    if (secciones.findIndex(seccion => seccion === palabra.SECCION) === -1) {
      secciones.push(palabra.SECCION)
    }
  })

  secciones = secciones.sort()

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-4">
      <Filter sections={secciones.sort()} todas={palabras} />

      <div>
      </div>
    </div>
  );
}
