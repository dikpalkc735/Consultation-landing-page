import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white px-5 py-6 sm:py-8">
      <div className="mx-auto flex max-w-7xl justify-center">
        <Image
          src="/logo.png"
          alt="Digital Dikpal"
          width={1959}
          height={340}
          priority
          className="h-auto w-[min(72vw,14.5rem)] sm:w-[17.25rem]"
          sizes="(max-width: 322px) 72vw, (max-width: 640px) 232px, 276px"
        />
      </div>
    </header>
  );
}
