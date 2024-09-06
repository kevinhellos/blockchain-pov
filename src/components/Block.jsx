export default function Block({ blockNumber, data }) {
  
  const blockData = JSON.parse(JSON.stringify(data));

  return (
    <div className="border bg-white border-gray-300 px-5 py-4">
      <span className="mb-5 bg-gray-100 py-1 px-2 block w-fit">
        Block {blockNumber}
      </span>
      <p className="text-sm block text-gray-500">
        Previous hash: <span className="font-medium">{blockData.previousHash}</span>
      </p>
      <p className="text-sm block">
        Current hash: <span className="font-medium">{blockData.currentHash}</span>
      </p>
      <p className="text-sm mt-5">
        Data: {blockData.data}
      </p>
    </div>
  )
}
