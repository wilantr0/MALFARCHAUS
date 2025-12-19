import ProductCard from "@/components/ProductCard";
import { getColections } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const { STRAPI_HOST } = process.env;


interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  large?: StrapiImageFormat;
}

interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: StrapiImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
}

interface ObjetoColeccion {
  id: number;
  documentId: string;
  name: string;
  description: any[];
  stock: boolean;
  fotos: StrapiMedia[];
}

interface Coleccion {
  id: number;
  name: string;
  description: any[];
  objetos_coleccions: ObjetoColeccion[];
}

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default async function Colecciones() {
  const { data, meta }: StrapiResponse<Coleccion> = await getColections();

  console.log(data);
  console.log(meta);

  return (
    <div className="p-4 flex flex-col gap-20">
      {data.map((item) => {
        return (
          <section key={item.id} className="">
            <h2 className=" text-4xl font-semibold">{item.name}</h2>

            <h3 className="text-body mt-4 mb-2">
              <BlocksRenderer content={item.description} />
            </h3>

            <hr />

            <div className="flex flex-row gap-4"> 
              {item.objetos_coleccions.map((objeto) => {
                console.log(objeto);
                return (
                  <div key={objeto.id} className="">
                      <ProductCard name={objeto.name} imageUrl={`${STRAPI_HOST}${objeto.fotos[1].url}`} stock={objeto.stock} id={objeto.documentId} />
                  </div>
                  
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}