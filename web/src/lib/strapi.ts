const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function query (url: string){
  const res = await fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`
    }
  });
  return await res.json();
}

export async function getHomeInfo(){
  const res = await query("home?populate=cover");
  const {title, description, cover} = res.data

  const image = `${STRAPI_HOST}${cover.url}`
  return { title, description, image };

}

export async function getDiaryPages(){
  const res = await query("paginas-diario")
  console.log(res.meta)
  return res

}