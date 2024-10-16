

interface FirstsectionProps {
  id?: string;
}

const Firstsection: React.FC<FirstsectionProps> = ({ id }) => {
  return (
    <div id={id} >
    <section className="md:py-20 py-16 bg-gradient-to-r from gray-00 to-gray-200 spacey-10">
      <div className="container mx-auto text-center mt-10">
        <div className="text-6xl flex justify-center font-bold md:px-20 pb-10 text-gradient bg-gradient-to-r from-blue-500 to-green-300 bg-clip-text text-transparent">
         Tus trabajos digitales listos en pocos minutos
        </div>

        <p className="text-lg md:text-xl md-10 bg-gradient-to-r from-black to-gray-400 dark:from-white dark:to-gray-500 bg-clip-text text-transparent font-bold">
          Olvídate de los requerimientos digitales que exige tu trabajo, enfócate en el trabajo en terreno.  
        </p> 

        <div className="flex gap-4 justify-center pt-10">
          <button
            aria-label="Regístrate button"
            className="bg-blue-500 text-white px-10 py-4 rounded-md text-lg font-bold"
          > Ingresa           
            
          </button>
          <button
            aria-label="learn more button"
            className="bg-gray-600 text-white px-10 py-4 rounded-md text-lg font-bold"
          >
            Conoce más
          </button>
        </div>

        <div className="pt-10">
          <video className="rounded-xl" autoPlay muted loop>
            <source src="/content/video-3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Firstsection