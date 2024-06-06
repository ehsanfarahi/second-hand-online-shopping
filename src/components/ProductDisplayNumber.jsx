export default function ProductDisplayNumber({data, displayLimit}) {
    return <div className="mt-4 sm:text-sm">
    <p>{data.slice(0, displayLimit).length} of {data.length} {data.length === 1 ? "product" : "products"}</p>
  </div>
}