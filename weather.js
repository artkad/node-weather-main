#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcons } from "./services/api.service.js";
import { printHelp, printSuccess, printError, pirntWeather } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен")
    return;
  }
  try {
    await saveKeyValue("token", token);
    printSuccess("Token saved");
  } catch (e) {
    printError("Error saving token");
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город")
    return;
  }
  try {
    await saveKeyValue("city", city);
    printSuccess("City saved");
  } catch (e) {
    printError("Error saving city");
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather();
    pirntWeather(weather, getIcons(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 404) {
      printError("Не верно указан город");
    } else if (error?.response?.status === 401) {
      printError("Не верно указан токен");
    } else {
      printError(error.message);
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    //help
    printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForcast();
};

initCLI();
