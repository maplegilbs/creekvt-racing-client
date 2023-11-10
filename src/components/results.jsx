//Hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//Styles
import styles from './results.module.css'

function ResultsRow({ result, isSelected }) {
    return (
        <tr className={isSelected ? `${styles["selected-row"]}` : ""}>
            <td>{result.year}</td>
            <td>{result.place} &nbsp; {"\u2022"}</td>
            <td>&nbsp;{result.firstName} {result.lastName}</td>
            <td>{result.raceCategory}</td>
            <td>{result.fastestLap}</td>
            <td>{result.lap1}</td>
            <td>{result.lap2}</td>
        </tr>
    )
}

function YearSelect({ availableYears, selectedYear, setSelectedYear }) {
    console.log(availableYears)
    return (
        <select onChange={(e) => setSelectedYear(e.target.value)}>
            <option value={null}>All</option>
            {availableYears.map(availableYear => {
                return <option value={availableYear.year}>{availableYear.year}</option>
            })}
        </select>
    )
}

export default function Results() {
    const [results, setResults] = useState([])
    const [selectedYear, setSelectedYear] = useState(null)
    const [availableYears, setAvailableYears] = useState([])
    const { raceName } = useParams()
    const [searchName, setSearchName] = useState(null)

    useEffect(() => {
        async function getResults() {
            let resultsResponse = await fetch(`http://localhost:3000/results/${raceName}${selectedYear? "?raceYear="+selectedYear : ""}`)
            let resultsData = await resultsResponse.json();
            let yearsResponse = await fetch(`http://localhost:3000/results/resultYears/${raceName}`)
            let yearsData = await yearsResponse.json();
            setAvailableYears(yearsData)
            setResults(resultsData)
        }
        try {
            getResults()
        } catch (error) {

        }
    }, [selectedYear])

    return (
        <>
            <YearSelect availableYears={availableYears} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            <input type="text" value={searchName} onChange={(e)=>{setSearchName(e.target.value)}}/>
            {results.length === 0 &&
                <p>No results available</p>
            }
            {results.length > 0 &&
                <table className={`${styles["results-table"]}`}>
                    {results.map(result => {
                        let racerName = `${result.firstName} ${result.lastName}`.toLowerCase().trim()
                        console.log(racerName)
                        let isSelected = racerName.includes(searchName) ? true : false;
                        return <ResultsRow result={result} isSelected={isSelected} />
                    })
                    }
                </table>
            }
        </>
    )
}