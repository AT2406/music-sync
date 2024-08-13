export const exportVar = (name: string, value: string) => {
  process.env[name] = value
}
