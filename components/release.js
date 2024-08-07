import Image from "next/image"

export default function Release({ items, onRemoveItem }) {

  if (!items || items.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className="text-white flex justify-center items-center pl-10 relative gap-10">
      {items.map((item, index) => (
        <div key={index} className="relative inline-block">
          <Image
            src={item.thumbnails}
            className="rounded-full"
            height={80}
            width={80}
            alt={item.title}
          />
          {onRemoveItem && (
            <button 
              className="bg-gray-500 rounded-full w-8 h-8 absolute bottom-20 left-16 hover:scale-125"
              onClick={() => onRemoveItem(index)}
            >
              -
            </button>
          )}
          <div className="flex justify-center items-center ">
            <p>{item.title.slice(0, 8)}...</p>
          </div>
        </div>
      ))}
    </div>
  )
}