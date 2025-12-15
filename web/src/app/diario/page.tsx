import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getDiaryPages } from "../../lib/strapi";
import { Reader } from "@/components/Pagination";



export default async function Home() {
  const pages = await getDiaryPages()
  console.log(pages)


  return (
    <div>
      {
        <Reader data={pages.data} meta={pages.meta} />
      }
    </div>

  );
}
