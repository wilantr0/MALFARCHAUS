import "./globals.css";
import Header from "../components/Header";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700']})



export const metadata = {
  title: "MALFARCHAUS",
  description: "Tienda de productos con raices en la lengua aragonesa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} min-h-screen flex flex-col bg-yellow-100`}>
        <Header />
        
        {/* Contenido principal */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer fijo al final */}
        <footer className="w-full bg-amber-950/30 text-amber-950 text-center py-4">
          &copy; {new Date().getFullYear()} MALFARCHAUS • Todos los derechos reservados
        </footer>
      </body>
    </html>
  );
}