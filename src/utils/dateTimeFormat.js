export const dateFormat = (date) => {
  const dateParsed = new Date(date);
  return dateParsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const minutesWording = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const minutesLeft = minutes % 60;

  return {
    hours,
    minutesLeft
  }
}
