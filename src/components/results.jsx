//Hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//Icons
import { faFilter, faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Styles
import styles from './results.module.css'

function ResultsRow({ result, isSelected, raceName }) {
    let racerName = result.firstName + " " + result.lastName
    return (
        <tr className={isSelected ? `${styles["selected-row"]}` : ""}>
            <td>{result.year}</td>
            {!raceName && <td>{result.raceName}</td>}
            <td>{result.place}</td>
            <td>{racerName}</td>
            <td>{result.raceCategory}</td>
            <td>{result.fastestLap || "-"}</td>
            <td>{result.lap1 || "-"}</td>
            <td>{result.lap2 || "-"}</td>
        </tr>
    )
}

function FilterPanel({ filterOptions, setFilterOptions }) {
    return (
        <div className={`${styles["search-panel__container"]}`}>
            <div className={`${styles["search-panel__row"]}`}>
                <p>Filter By</p>
            </div>
            <div className={`${styles["search-panel__row"]}`}>
                <FilterSelect labelName={"Race"} filterOptionName={"selectedRace"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                <FilterSelect labelName={"Year"} filterOptionName={"selectedYear"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                <FilterSelect labelName={"Category"} filterOptionName={"selectedCategory"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                {/* //Category */}
                {/* //Racer Name */}
            </div>
        </div>
    )
}

function SearchPanel({ filterOptions, setFilterOptions }) {
    return (
        <div className={`${styles["search-panel__container"]}`}>
            <div>
                <label htmlFor="racerSearch">Search By Racer</label>
                <div className={`${styles["search-box"]}`}>
                    <input type="search" name="racerSearch" id="racerSearch" value={filterOptions.searchName} onChange={(e) => setFilterOptions(prev => { return { ...prev, searchName: e.target.value } })} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
        </div>
    )
}

function FilterSelect({ labelName, filterOptionName, filterOptions, setFilterOptions }) {
    let options = [];
    // if (labelName === "Category")
    if (labelName === "Race") options = filterOptions.availableRaceYears.map(raceYear => Object.keys(raceYear)[0])
    if (labelName === "Year" && filterOptions.selectedRace) {
        //go into available race years, find the selected race, and use that to return all keys (years)
        let foundIndex = filterOptions.availableRaceYears.findIndex(raceName => Object.keys(raceName)[0] === filterOptions.selectedRace)
        options = Object.keys(filterOptions.availableRaceYears[foundIndex][filterOptions.selectedRace])
    }
    else if (labelName === "Year") {
        options = filterOptions.availableRaceYears.reduce((accum, race) => {
            for (let raceYear in race[Object.keys(race)[0]]) {
                if (!accum.includes(raceYear)) accum.push(raceYear)
            }
            return accum
        }, [])
    }
    return (
        <div className={`${styles["filter-group"]}`}>
            <label htmlFor={filterOptionName}>{labelName}</label><br />
            <select id={filterOptionName} onChange={(e) => setFilterOptions(prev => { return { ...prev, [filterOptionName]: e.target.value } })}>
                <option value={''}>All</option>
                {options.sort().map(optionValue => {
                    return <option value={optionValue}>{optionValue}</option>
                })}
            </select>
        </div>
    )
}

const initialFilterOptions = {
    availableRaceYears: [],
    selectedRace: null,
    selectedYear: null,
    availableCategories: [],
    selectedCategory: null,
    searchName: null,
}

export default function Results() {
    const [results, setResults] = useState([])
    const [showFilterOptions, setShowFilterOptions] = useState(false)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [showSortOptions, setShowSortOptions] = useState(false)
    const { raceName } = useParams()
    const [filterOptions, setFilterOptions] = useState(initialFilterOptions)

    console.log(filterOptions)

    useEffect(() => {
        async function getResults() {
            let resultsResponse = await fetch(`http://localhost:3000/results`)
            let resultsData = await resultsResponse.json();
            let raceFiltersResponse = await fetch(`http://localhost:3000/results/resultYears`)
            if (raceFiltersResponse.status !== 200) throw new Error('Race filters unavailable')
            let raceFiltersData = await raceFiltersResponse.json();
            let groupedFilterOptions = raceFiltersData.reduce((accum, item) => {
                let foundRaceGroup = accum.find(group => Object.keys(group).includes(item.raceName))
                if (foundRaceGroup) {
                    let updatedRaceGroup = { ...foundRaceGroup[item.raceName], [item.raceYear]: item.raceCategory.split(", ").sort() }
                    accum[accum.findIndex(group => Object.keys(group).includes(item.raceName))] = { [item.raceName]: updatedRaceGroup }
                }
                else {
                    accum.push({ [item.raceName]: { [item.raceYear]: item.raceCategory.split(", ").sort() } })
                }
                return accum
            }, [])
            setFilterOptions(prev => {
                return { ...prev, availableRaceYears: groupedFilterOptions }
            })
            setResults(resultsData)
        }
        try {
            getResults()
        } catch (error) {

        }
    }, [])

    return (
        <>
            <div className={`${styles["action-buttons__container"]}`}>
                <button className={`button button--medium ${styles["results-button"]}`} onClick={() => setShowSearchBar(prev => !prev)}>Search &nbsp;<FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                <button className={`button button--medium ${styles["results-button"]}`} onClick={() => setShowFilterOptions(prev => !prev)}>Filter &nbsp;<FontAwesomeIcon icon={faFilter} /></button>
                <button className={`button button--medium ${styles["results-button"]}`} onClick={() => setShowSortOptions(prev => !prev)}>Sort &nbsp;<FontAwesomeIcon icon={faSort} /></button>
            </div>
            {showSearchBar && <SearchPanel filterOptions={filterOptions} setFilterOptions={setFilterOptions} />}
            {showFilterOptions && <FilterPanel filterOptions={filterOptions} setFilterOptions={setFilterOptions} />}
            {results.length === 0 &&
                <p>No results available</p>
            }
            {results.length > 0 &&
                <table className={`${styles["results-table"]}`}>
                    <thead>
                        <tr>
                            <th>Year</th>
                            {!raceName && <th>Race</th>}
                            <th>Place</th>
                            <th>Racer</th>
                            <th>Category</th>
                            <th>Final Time</th>
                            <th>Lap 1</th>
                            <th>Lap 2</th>
                        </tr>
                    </thead>
                    {results.map(result => {
                        let racerName = `${result.firstName} ${result.lastName}`.toLowerCase().trim()
                        let isSelected = racerName.includes(filterOptions.searchName) && filterOptions.searchName.length > 0 ? true : false;
                        return <ResultsRow result={result} isSelected={isSelected} raceName={raceName} />
                    })
                    }
                </table>
            }
        </>
    )
}