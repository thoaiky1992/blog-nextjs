export function convertToPlainObject(data: any) {
  return JSON.parse(JSON.stringify(data));
}
