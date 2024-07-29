import Image from "next/image";
import React from "react";

export default function SearchApi({ data, onAddItem }) {
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ul className="grid grid-cols-3">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex justify-center items-center p-5 text-xl">
              <Image
                src={item.thumbnails}
                className="rounded-full"
                height={80}
                width={80}
                alt="picture"
                />
            </li>
            <li className="flex justify-center items-center text-white text-xl p-5 hover:scale-110">
              <button>{item.title}</button>
            </li>
            <li className="flex justify-center items-center text-xl p-5 hover:scale-125 text-white">
              <button className="bg-gray-500 rounded-full w-8 h-8 " onClick={() => onAddItem(item)}>
                +
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}
