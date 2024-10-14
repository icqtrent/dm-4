"use client";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src="/images/logos/logo.png"
        width={80}
        height={80}
        alt="logo"
        priority
      />
    </div>
  );
};

export default Logo;
