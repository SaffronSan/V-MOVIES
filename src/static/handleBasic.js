export function chopMoney(value) {
  const num = Number(value.replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters
  if (isNaN(num)) return value; // Return original if not a number

  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(1)}B`;
  } else if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(1)}M`;
  } else if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(1)}K`;
  } else {
    return `$${num.toLocaleString()}`;
  }
}

export function getBase(){
    return "http://www.omdbapi.com/?apikey=";
}

export function getKey(){
    return import.meta.env.VITE_API_KEY;
}

