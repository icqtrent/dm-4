const Footer = () => {
  return (
    <footer
      className=" border-t-[1px] hidden md:block"
    >
      <div className="flex justify-evenly gap-4 p-4">
        <div>
          <div className="flex flex-col p-4 cursor-pointer text-xl">
            Todos los derechos reservados. @2024 by DrawingsMachines.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
