import Image from "next/image";
import React from "react";

export default function SearchApi({ data, onAddItem }) {
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ul className="grid grid-cols-3 mx-5">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex justify-center items-center p-5 text-xl border-b-2 border-gray-600 bg-slate-950">
              <Image
                src={item.thumbnails}
                className="rounded-full"
                height={80}
                width={80}
                alt="picture"
                />
            </li>
            <li className="flex justify-center items-center text-white text-xl border-b-2 border-gray-600 p-5">
              <p className="">{item.title}</p>
            </li>
            <li className="flex justify-center items-center text-xl p-5 text-white border-b-2 border-gray-600 bg-slate-950">
              <button className="bg-gray-500 rounded-full w-8 h-8 hover:scale-125" onClick={() => onAddItem(item)}>
                +
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}
