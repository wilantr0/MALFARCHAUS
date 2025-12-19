"use client"

import { useState } from "react";
type Foto = {
  url: string;
  name: string;
};

export default function Imagenes({ fotos, base }: { fotos: Foto[] , base: string }) {
  const [image, setImage] = useState(1)
  return (
    <div className="w-full h-fit flex flex-row justify-start items-center">
      <div className="flex flex-col gap-2 m-3 w-1/10">
        {fotos.map((foto, index) =>
      index == 0 ? null : (
        <img
          key={index}
          onClick={() => setImage(index)}
          src={`${base}${foto.url}`}
          alt={foto.name}
          className="aspect-square object-cover w-full h-auto border rounded-md"
        />
      )
    )}
      </div>
      <div className="w-9/10">
        <img src={`${base}${fotos[image].url}`} alt={fotos[image].name}  className="w-full h-full border "/>
      </div>

      
    </div>
    
  );    
}