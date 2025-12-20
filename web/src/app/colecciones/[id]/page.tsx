import { getObject } from "@/lib/strapi";
import Imagenes from "@/components/Images";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const { NEXT_PUBLIC_STRAPI_HOST : STRAPI_HOST } = process.env;

export default async function PaginaObjeto({ params }: {params:any}) {
  const { id } = await params;
  console.log(id);
  const { data } = await getObject(id);
  const product = data[0];
  console.log(product);
  
  const listaTallas = product.ConTalla
  ? Object.entries(product.tallas[0])
      .filter(([key]) => key !== "id")
      .map(([size, stock]) => ({ size, stock }))
  : []

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Colecciones", href: "/colecciones" },
    { label: product.name },
  ];

  return (
    <div className="m-4">
      <Breadcrumbs items={breadcrumbs} />
      <div className="w-min-screen flex flex-row justify-start gap-10 m-4">
        <div className="w-1/2 h-fit flex flex-col justify-center items-end">
          <Imagenes fotos={product.fotos} base={STRAPI_HOST?STRAPI_HOST:""} />
          <img src={`${product.fotos[0].url}`} className="w-9/10" alt="" />
        </div>
        <div className="w-1/2">
          <div className="w-full lg:w-full flex flex-col gap-6">
            {/* Título */}
            <div>
              <h1 className="text-3xl font-bold text-heading mb-2">
                {product.name}
              </h1>
              <div className="h-0.5 w-16 bg-amber-600 rounded-full" />
            </div>

            {/* Descripción */}
            <div className="prose prose-amber max-w-none text-body">
              <BlocksRenderer content={product.description} />
            </div>

            {/* Separador */}
            <div className="border-t border-default" />
            {
              product.ConTalla ? (
                <div className="bg-neutral-primary-soft shadow-xs rounded-xl border border-default overflow-hidden">
              <table className="w-full text-sm text-left text-body">
                <thead className="bg-neutral-secondary-soft border-b border-default">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 font-semibold tracking-wide"
                    >
                      Talla
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-semibold tracking-wide text-right"
                    >
                      Stock
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {listaTallas.map((talla: any) => (
                    <tr
                      key={talla.size}
                      className="border-b last:border-b-0 border-default hover:bg-neutral-secondary-soft/50 transition"
                    >
                      <td className="px-6 py-3 font-medium text-heading uppercase">
                        {talla.size}
                      </td>

                      <td className="px-6 py-3 text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    talla.stock > 0
                      ? talla.stock >= 10
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
                        >
                          {talla.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              ) : null
            }
            {/* Tabla de tallas */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
