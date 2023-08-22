import { useEffect, useState } from 'react'
import { InferGetServerSidePropsType, NextPage} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { v4 } from 'uuid'
import { fetchData, getPilots, scrollToTop } from '../../utils/functions'
import { StarshipProps, StarshipResult } from '../../interfaces'
import { Router, useRouter } from 'next/router'

const Starships: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
}) => {
  const router = useRouter()

  const [previousPage, setPreviousPage] = useState<string | null>(data.previous)
  const [nextPage, setNextPage] = useState<string | null>(data.next)
  const [results, setResults] = useState<StarshipResult[]>(data.results)

  const updatePageState = (pageResponse: StarshipProps) => {
    setPreviousPage(pageResponse.previous)
    setNextPage(pageResponse.next)
  }

  const handlePreviousClick = async () => {
    if (!previousPage) return

    const previousPageResponse = (await fetchData(previousPage)) as StarshipProps

    updatePageState(previousPageResponse)

    const previousResidentsResponse = await getPilots([
      ...previousPageResponse.results,
    ])

    setResults(previousResidentsResponse)

    scrollToTop()
  }

  const handleNextClick = async () => {
    if (!nextPage) return

    const nextPageResponse = (await fetchData(nextPage)) as StarshipProps

    updatePageState(nextPageResponse)

    const nextResidentsResponse = await getPilots([
      ...nextPageResponse.results,
    ])

    setResults(nextResidentsResponse)

    scrollToTop()
  }

  return (
    <>
      <Head>
        <title>Starships Endpoint</title>
      </Head>
      <div className='container mx-auto my-8 w-11/12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {results.map((result) => (
            <div
              key={v4()}
              className='border text-white bg-blue-600 p-6 text-lg rounded-lg font-light shadow-2xl shadow-slate-500 hover:translate-x-1 transition-all hover:-rotate-6 duration-500 hover:cursor-pointer'
            >
              <p>
                <span className='font-bold'>Name: </span>
                <span>
                  {result.name === 'unknown' ? 'Unknown' : result.name}
                </span>
              </p>
              <p>
                <span className='font-bold'>StarshipClass: </span>
                <span>
                  {result.name === 'unknown' ? 'Unknown' : result.starship_class}
                </span>
              </p>
              <p>
                <span className='font-bold'>Length: </span>
                <span>
                  {result.name === 'unknown' ? 'Unknown' : result.length}
                </span>
              </p>
              <p>
                <span className='font-bold'>Crew: </span>
                <span>
                  {result.crew === 'unknown'
                    ? 'Unknown'
                    : Intl.NumberFormat('en').format(
                        Number.parseInt(result.crew)
                      )}
                </span>
              </p>
              <span className='font-bold'>Pilots: </span>
              {result.pilots.map((pilots) => (
                <p key={v4()}>{pilots}</p>
              ))}
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row w-full gap-4 text-white text-sm my-10'>
          <button
            className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
            onClick={handleNextClick}
          >
            Next
          </button>
          <Link href='/' legacyBehavior>
            <button className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'>
              Return to Main Menu
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Starships

export const getServerSideProps = async () => {
  const response = await fetch('https://swapi.py4e.com/api/starships/')
  const data: StarshipProps = await response.json()

  for (let i = 0; i < data.results.length; i++) {
    const starshipResult: StarshipResult[] = await Promise.all(
      data.results[i].pilots.map(async (pilots) => {
        const residentResponse = await fetch(pilots)
        return await residentResponse.json()
      })
    )

    data.results[i].pilots.length = 0
    for (const person of starshipResult) {
      data.results[i].pilots.push(person.name)
    }
  }

  return {
    props: {
      data,
    },
  }
}
