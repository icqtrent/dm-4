// types.ts
export type Comuna = {
    nombre: string;
    coordenadas: string;
  };
  
  export type Region = {
    region: string;
    comunas: Comuna[];
  };
  
  export type RegionesDataset = {
    regiones: Region[];
  };