export const getDecimalValue = (
	decimalObj: { $numberDecimal: string } | undefined
) => {
	if (!decimalObj) return 0
	return parseFloat(decimalObj.$numberDecimal)
}
