import React from 'react'
import logo from "../../public/next.svg"


function Cierre() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="text-2xl mb-4">
        ¡Gracias por utilizar nuestros servicios!
      </header>
      <div className="text-lg text-center max-w-md mb-8">
        <p>
           En minutos revisa la sección &quot;Tus proyectos&quot;. Puedes cerrar esta página. 
        </p>
        <p>
          ¡Gracias por tu visita! 
        </p>
      </div>
      <img src={logo} className="w-1/3 rounded-full"></img>
      <footer className="text-sm mt-8">
        © 2024 DrawingsMachines - Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Cierre