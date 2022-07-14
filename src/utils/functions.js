const DEFAULT_FORMAT_OPTIONS = {
  format: value => String(value),
  exclude: [],
}

// Pass a function format to the values of an object to format it
const formatObjectValues = (object, options = DEFAULT_FORMAT_OPTIONS) => {
  options = {...DEFAULT_FORMAT_OPTIONS, ...options};
  
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (options.exclude.includes(key)) return [key, value];
      return [key, options.format(value)];
    })
  )
}

module.exports = {
  formatObjectValues
}