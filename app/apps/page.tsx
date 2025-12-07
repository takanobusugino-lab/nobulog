import Header from "../../components/Header";

export default function Apps() {
  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold mb-6">Apps</h1>

      <p className="text-gray-300 mb-6">
        作ったアプリをここに並べています。
      </p>

      <ul className="space-y-4">
        <li>
          <a
            href="https://image-scraper-downloader-8fqx.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            ・Image Scraper Downloader
          </a>
        </li>
      </ul>
    </>
  );
}
