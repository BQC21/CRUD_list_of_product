
const BASE_URL = "https://api.frankfurter.dev";

export function current_converter(price_base: string, price_quote: string, amount: number) {
    const path = `/v2/rates?base=${price_base}&quotes=${price_quote}`;
    fetch(BASE_URL + path)
    .then((r) => r.json())
    .then((data) => {
        const result = (amount * data[0].rate).toFixed(2);
        return result;
    });
}

