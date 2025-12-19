"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('es'); // 'es' para Castellano, 'an' para Aragonés

  const translations = {
    es: {
      diario: "Diario",
      colecciones: "Colecciones",
      entorno: "Entorno",
      diccionario: "Diccionario",
    },
    an: {
      diario: "Diario",
      colecciones: "Colezions",
      entorno: "Redolada",
      diccionario: "Dizionario",
    },
  };

  const links = [
    { href: "/diario", labelKey: "diario" },
    { href: "/colecciones", labelKey: "colecciones" },
    { href: "/diccionario", labelKey: "diccionario" },
    { href: "/entorno", labelKey: "entorno" },
    
  ];

  return (
    <header className="w-full bg-amber-950/30 flex flex-col md:flex-row items-center md:justify-between px-4 md:px-20 py-2 md:py-4 relative">
      <div className="flex justify-between w-full md:w-auto items-center">
        <img src="/LOGO_NEGRO.png" alt="logo" className="h-10 md:h-14 w-auto" />
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Selector de idiomas */}
      <div className="flex space-x-2 md:order-2">
        <button
          onClick={() => setLanguage('es')}
          className={`px-2 py-1 text-sm font-medium rounded ${
            language === 'es' ? 'bg-cyan-800 text-white' : 'bg-transparent text-white md:text-black'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('an')}
          className={`px-2 py-1 text-sm font-medium rounded ${
            language === 'an' ? 'bg-cyan-800 text-white' : 'bg-transparent text-white md:text-black'
          }`}
        >
          ARG
        </button>
      </div>

      {/* Menu */}
      <nav
        className={`${
          menuOpen ? "max-h-96" : "max-h-0"
        } overflow-hidden transition-[max-height] duration-300 w-full md:w-auto md:max-h-full md:flex md:items-center md:overflow-visible md:order-1`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-8 bg-amber-950/30 md:bg-transparent">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-2 md:py-0 text-white md:text-black md:hover:text-cyan-800 border-b-4 md:border-b-0 ${
                  pathname === link.href ? "border-b-cyan-800" : "border-b-transparent"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {translations[language][link.labelKey]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
