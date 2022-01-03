import axios from "axios";
import { getKeyValue } from "./storage.service.js";

const getIcons = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01": return "🌞"
    case "02": return "⛅"
    case "03": return "🌥"
    case "04": return "☁"
    case "09": return "🌥🌨"
    case "10": return "🌨"
    case "11": return "🌩"
    case "13": return "❄"
    case "50": return "🎄"
    default: return "⛄"
};
}

const getWeather = async () => {
  const token = process.env.TOKEN ?? await getKeyValue("token");
  const city = process.env.TOKEN ?? await getKeyValue("city");
  if (!token) {
    throw new Error("Не задан ключ");
  }
console.log(city);
  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: token, lang: "ru", units: "metric" },
  });
  return data;
};

export { getWeather, getIcons }
