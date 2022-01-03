import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), "weater-data.json");
const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExits(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
    promises.writeFile(filePath, JSON.stringify(data));
}

const getKeyValue = async (key) => {
  if (await isExits(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

const isExits = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
    
  }
}

export { saveKeyValue, getKeyValue }