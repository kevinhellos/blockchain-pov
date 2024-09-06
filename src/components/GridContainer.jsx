export default function GridContainer({ children }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
        {children}
    </div>
  )
}
