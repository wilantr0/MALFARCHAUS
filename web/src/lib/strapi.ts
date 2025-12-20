const { NEXT_PUBLIC_STRAPI_HOST: STRAPI_HOST } = process.env;

export async function query (url: string){
  const res = await fetch(`${STRAPI_HOST}/api/${url}`, {
  });
  return await res.json();
}

export async function getHomeInfo(){
  const res = await query("home?populate=cover");
  const {title, description, cover} = res.data

  const image = `${cover.url}`
  return { title, description, image };

}

export async function getDiaryPages(){
  const res = await query("paginas-diario?populate=*")
  console.log(res.data)
  return res
}

export async function getColections(){
  let { data, meta } = await query("coleccions?populate[objetos_coleccions][populate]=fotos")
  data = data??[]
  meta = meta??[]
  console.log(meta)
  return { data, meta }
}

export async function getObject(documentId: string){
  console.log(documentId)
  const res = await query(`objetos-colecciones?filters[documentId][$eq]=${documentId}&populate=*`)
  console.log(res)
  return res
}

export async function getWords(){
  const { data } = await query("palabras?fields[0]=SECCION&populate[post][fields][0]=url")
  console.log(data)
  return data;
}

export async function getSectionWords(section: string){
  const { data } = await query("palabras?filters[SECCION][$eq]="+section+"&populate[post][fields][0]=url")
  console.log(data)
  return data;
}
