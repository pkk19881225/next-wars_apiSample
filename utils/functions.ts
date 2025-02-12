import {
  PlanetResult,
  PeopleResult,
  PeopleProps,
  PlanetProps,
  StarshipProps,
  StarshipResult
} from './../interfaces/index'

export const fetchData = async (page: string) => {
  const cache = await caches.open('swapi')
  await cache.add(new Request(page))

  const data: PeopleProps | PlanetProps | StarshipProps = await caches
    .match(page)
    .then((pageData) => pageData?.json())

  return data
}

export const sortName = (resultsCopy: PeopleResult[]) => {
  return resultsCopy.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })
}

export const sortHeight = (resultsCopy: PeopleResult[]) => {
  return resultsCopy.sort((a, b) => {
    return Number.parseInt(a.height) - Number.parseInt(b.height)
  })
}

export const sortMass = (resultsCopy: PeopleResult[]) => {
  return resultsCopy.sort((a, b) => {
    let replaceA = a.mass
    let replaceB = b.mass

    if (a.mass.includes('unknown')) replaceA = a.mass.replace('unknown', '0')
    if (a.mass.includes(',')) replaceA = a.mass.replace(',', '')

    if (b.mass.includes(',')) replaceB = b.mass.replace(',', '')
    if (b.mass.includes('unknown')) replaceB = b.mass.replace('unknown', '0')

    return Number.parseInt(replaceA) - Number.parseInt(replaceB)
  })
}

export const getResidents = async (results: PlanetResult[]) => {
  const cache = await caches.open('residents')
  const planets = [...results]

  for (let i = 0; i < planets.length; i++) {
    const peopleResult: PeopleResult[] = await Promise.all(
      planets[i].residents.map(async (resident) => {
        if (await cache.match(resident)) {
          return cache
            .match(resident)
            .then((residentData) => residentData?.json())
        }

        await cache.add(resident)
        return await cache
          .match(resident)
          .then((residentData) => residentData?.json())
      })
    )

    planets[i].residents.length = 0
    for (const person of peopleResult) {
      planets[i].residents.push(person.name)
    }
  }

  return planets
}

export const getPilots = async (results: StarshipResult[]) => {
  const cache = await caches.open('pilots ')
  const starships = [...results]

  for (let i = 0; i < starships.length; i++) {
    const starshipResult: StarshipResult[] = await Promise.all(
      starships[i].pilots .map(async (pilots) => {
        if (await cache.match(pilots)) {
          return cache
            .match(pilots)
            .then((residentData) => residentData?.json())
        }

        await cache.add(pilots)
        return await cache
          .match(pilots)
          .then((residentData) => residentData?.json())
      })
    )

    starships[i].pilots.length = 0
    for (const person of starshipResult) {
      starships[i].pilots.push(person.name)
    }
  }

  return starships
}

export const scrollToTop = () => {
  window.scrollTo(0, 0)
}
