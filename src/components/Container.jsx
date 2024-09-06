function Container({ children }) {
    return (
      <div className="flex justify-center min-h-screen px-3 py-0 bg-gray-50">
        <div className="w-full max-w-6xl p-5">
          {children}
        </div>
      </div>
    )
}
  
export default Container;