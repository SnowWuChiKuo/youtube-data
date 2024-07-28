import Link from "next/link";

export default function Data() {

  return (
    <div className="flex justify-center box-border w-60 h-lvh">
      <ul className="text-white pt-20">
        <li className="text-black mb-4">
          <Link href="/" className="bg-green-400 flex justify-center w-40 h-12 items-center rounded-full">
            頻道資訊
          </Link>
        </li>
        <li className="text-black mb-4">
          <Link href="/analyze" className="bg-green-400 flex justify-center w-40 h-12 items-center rounded-full">
            <button>數據分析</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}