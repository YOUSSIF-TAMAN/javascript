export function productPrice(priceInCents) {
	return (((Math.round(priceInCents) / 100)).toFixed(2));

}