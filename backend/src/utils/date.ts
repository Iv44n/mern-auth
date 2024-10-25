export const tenMinutesFromNow = () =>
  new Date(Date.now() + 10 * 60 * 1000)

export const oneHourFromNow = () =>
  new Date(Date.now() + 60 * 60 * 1000)

export const thirtyDaysFromNow = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

export const oneYearFromNow = () =>
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
