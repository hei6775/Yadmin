//json
import JsonFile from 'jsonfile';

export const readJson = (file) => {
  const data = JsonFile.readFile(file)
  return data
}


export default {
  readJson
}

