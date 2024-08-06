import Link from "next/link"

export default function Navbar() {
  return (
    <div className="grid grid-cols-4">
      <h1  className="flex justify-start items-center text-white col-span-3 pl-16 text-4xl">
        YoutubeData
      </h1>
      <ul className="flex justify-around items-center">
        <li className="m-4 text-lg">
          <Link href="/" className="bg-green-300 px-5 py-3 rounded-lg hover:bg-green-500">
            首頁
          </Link>
        </li>
        <li className="m-4 text-lg">
          <Link href="/about" className="bg-green-300 px-5 py-3 rounded-lg hover:bg-green-500">
            About
          </Link>
        </li>
      </ul>
    </div>
  )
}