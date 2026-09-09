export const getProfitabilityColor = (profitability: string) => {
  switch (profitability) {
    case "Excepcional":
      return "text-purple-600 bg-purple-100"
    case "Revolucionaria":
      return "text-indigo-600 bg-indigo-100"
    case "Muy Alta":
      return "text-green-600 bg-green-100"
    case "Alta":
      return "text-green-600 bg-green-100"
    case "Media-Alta":
      return "text-yellow-600 bg-yellow-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}
