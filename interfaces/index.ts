export interface PeopleProps {
  count: number
  next: string
  previous: string
  results: [
    {
      name: string
      height: string
      mass: string
      hair_color: string
      skin_color: string
      eye_color: string
      birth_year: string
      gender: string
      homeworld: string
      films: string[]
      species: string[]
      vehicles: string[]
      starships: string[]
      created: string
      edited: string
      url: string
    }
  ]
}

export interface PeopleResult {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export interface PlanetProps {
  count: number
  next: string | null
  previous: string | null
  results: [
    {
      name: string
      rotation_period: string
      orbital_period: string
      diameter: string
      climate: string
      gravity: string
      terrain: string
      surface_water: string
      population: string
      residents: string[]
      films: string[]
      created: string
      edited: string
      url: string
    }
  ]
}

export interface PlanetResult {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export interface StarshipProps {
  count: number
  next: string | null
  previous: string | null
  results: [
    {
      name : string 
      model : string 
      starship_class : string 
      manufacturer : string 
      cost_in_credits : string 
      length : string 
      crew : string 
      passengers : string 
      max_atmosphering_speed : string 
      hyperdrive_rating : string 
      MGLT : string 
      cargo_capacity : string 
      consumables : string
      films : string[] 
      pilots : string[] 
      url : string 
      created : string 
      edited : string 
    }
  ]
}

export interface StarshipResult {
  name : string 
  model : string 
  starship_class : string 
  manufacturer : string 
  cost_in_credits : string 
  length : string 
  crew : string 
  passengers : string 
  max_atmosphering_speed : string 
  hyperdrive_rating : string 
  MGLT : string 
  cargo_capacity : string 
  consumables : string
  films : string[] 
  pilots : string[] 
  url : string 
  created : string 
  edited : string
}

export interface ButtonProps {
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleSortName?: () => void
  handleSortHeight?: () => void
  handleSortMass?: () => void
}
