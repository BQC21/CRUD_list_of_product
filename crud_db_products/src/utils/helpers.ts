export function convertPenToUsd(pricePen: number, exchangeRate: number): number {
	return pricePen / exchangeRate;
}

export function convertUsdToPen(priceUsd: number, exchangeRate: number): number {
	return priceUsd * exchangeRate;
}   

export function compute_price_with_IGV(price_PEN: number, price_USD: number, IGV: number): { price_PEN_IGV: number; price_USD_IGV: number } {
	const price_PEN_IGV = price_PEN * (1+IGV)
	const price_USD_IGV = price_USD * (1+IGV)
	return { price_PEN_IGV, price_USD_IGV}
}