import Link from "next/link"

export default function Navbar() {
  return (
    <div className="grid grid-cols-4">
      <h1  className="flex justify-start items-center text-white col-span-3 pl-16 text-4xl">
        Snow
      </h1>
      <ul className="flex justify-around items-center">
        <li className="m-4 text-white text-2xl">
          <Link href="/">
            Home
          </Link>
        </li>
        <li className="m-4 text-white text-2xl">
          <Link href="/about">
            About
          </Link>
        </li>
      </ul>
    </div>
  )
}