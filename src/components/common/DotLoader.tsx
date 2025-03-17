

const DotLoader = () => {
  return (
    <div className="bg-white/20 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-4">
      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[#1d3660] animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-[#1d3660] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-[#1d3660] animate-bounce [animation-delay:-.5s]"></div>
      </div>
      <p className="text-sm text-gray-700 font-medium">Cargando Datos</p>
    </div>
  )
}

export default DotLoader