export function categories() {
  const data = fetch("https://api.escuelajs.co/api/v1/categories/").then(res=>res.json())
  return data
}