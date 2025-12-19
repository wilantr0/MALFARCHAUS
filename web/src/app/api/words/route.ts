export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sectionsParam = searchParams.get("sections")

  if (!sectionsParam) {
    return Response.json([])
  }

  const sections = sectionsParam.split(",")

  const queries = sections.map(
    s =>
      `filters[$or][][SECCION][$eq]=${encodeURIComponent(s)}`
  )

  const url =
    "palabras?" +
    queries.join("&") +
    "&populate[post][fields][0]=url"

  const res = await fetch(
    `${process.env.STRAPI_HOST}/api/${url}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  )

  const json = await res.json()
  return Response.json(json.data)
}