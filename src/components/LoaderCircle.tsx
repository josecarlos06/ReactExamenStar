

const LoaderCircle = ( { color } : { color : string} ) => {
   return (
      <div className="flex justify-center items-center">
         <div className={`w-5 h-5 border-2 border-t-transparent border-${color} border-solid rounded-full animate-spin`}></div>
      </div>
   )
}

export default LoaderCircle