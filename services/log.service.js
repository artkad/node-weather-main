import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
};
const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(" HELP " + "\n")}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена 
		`)
  );
};

const pirntWeather = (res, icon) => {
  // console.log(res);
  const date = new Date(res.sys.sunset * 1000);
  let unix_timestamp = 1549312452;
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  console.log(
    dedent(`${chalk.bgYellow(" WEATHER ")} Погода в городе ${res.name}
		${icon} ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность ${res.main.humidity} %
		Давление ${res.main.pressure}
		Скорость ветра ${res.wind.speed}
		Солнце начнет садиться в ${formattedTime}
		`)
  );
};
export { printError, printSuccess, printHelp, pirntWeather };
