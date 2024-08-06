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
            alt="picture"
          />
          {onRemoveItem && (
            <button 
              className="bg-gray-500 rounded-full w-8 h-8 absolute bottom-14 left-14 hover:scale-125"
              onClick={() => onRemoveItem(index)}
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  )
}