import axios from "axios";
import { getKeyValue } from "./storage.service.js";

const getIcons = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01": return "π"
    case "02": return "β"
    case "03": return "π₯"
    case "04": return "β"
    case "09": return "π₯π¨"
    case "10": return "π¨"
    case "11": return "π©"
    case "13": return "β"
    case "50": return "π"
    default: return "β"
};
}

const getWeather = async () => {
  const token = process.env.TOKEN ?? await getKeyValue("token");
  const city = process.env.TOKEN ?? await getKeyValue("city");
  if (!token) {
    throw new Error("ΠΠ΅ Π·Π°Π΄Π°Π½ ΠΊΠ»ΡΡ");
  }
console.log(city);
  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: token, lang: "ru", units: "metric" },
  });
  return data;
};

export { getWeather, getIcons }
