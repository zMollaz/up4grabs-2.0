export default function Header() {
  return (
    <header className="">
      <video
        autoPlay
        loop
        muted
        className="relative -z-10 sm:w-640 w-auto min-w-full max-h-3/6"
      >
        <source src="/videos/HeaderFinal1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </header>
  );
}
