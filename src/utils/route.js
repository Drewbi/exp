export const parseRoute = (path) => {
  const segments = path.split('/')
  return segments[2]
}