// components/ImageComponent.js
import Image from 'next/image';
import logo from '../../src/app/logo.png';

const DrawingsIcon = () => {
    return (
      <div>
        <Image src={logo} alt="Descripción de la imagen" width={200} height={140} />
      </div>
    );
  }

  export default DrawingsIcon;