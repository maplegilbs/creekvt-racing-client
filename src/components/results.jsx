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
            {raceName && <td>{result.raceName}</td>}
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
                <FilterSelect labelName={"Race"} filterName={"raceName"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                <FilterSelect labelName={"Year"} filterName={"raceYear"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                <FilterSelect labelName={"Category"} filterName={"raceCategory"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
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

function FilterSelect({ labelName, filterName, filterOptions, setFilterOptions }) {
    let options = filterOptions.filterGroups[filterName];
    console.log(filterOptions, options)


    function handleFilterOptsChange(e) {
        setFilterOptions(prev => {
           let updatedFilterOpts = {...prev}
           updatedFilterOpts.selectedOpts[filterName] = e.target.value;
           return updatedFilterOpts
        })
    }

    return (
        <div className={`${styles["filter-group"]}`}>
            <label htmlFor={filterName}>{labelName}</label><br />
            <select id={filterName} onChange={handleFilterOptsChange}>
                <option value={''} selected >All</option>
                {options &&
                    options.sort().map(optionValue => {
                        return <option value={optionValue}>{optionValue}</option>
                    })}
            </select>
        </div>
    )
}

const initialFilterOptions = {
    allFilterOpts: [],
    selectedOpts: {
        raceName: null,
        raceYear: null,
        raceCategory: null
    },
    filterGroups: {
        raceName: null,
        raceYear: null,
        raceCategory: null
    },
    searchName: null,
}

export default function Results() {
    const [results, setResults] = useState([])
    const [filterOptions, setFilterOptions] = useState(initialFilterOptions)
    const [showFilterOptions, setShowFilterOptions] = useState(false)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [showSortOptions, setShowSortOptions] = useState(false)
    const { raceName } = useParams()

    console.log(filterOptions)

    useEffect(() => {
        async function getResults() {
            let resultsResponse = await fetch(`http://localhost:3000/results`)
            let resultsData = await resultsResponse.json();
            let raceFiltersResponse = await fetch(`http://localhost:3000/results/resultYears`)
            if (raceFiltersResponse.status !== 200) throw new Error('Race filters unavailable')
            let raceFiltersData = await raceFiltersResponse.json();

            setFilterOptions(prev => {
                let updatedFilterOpts = { ...prev }
                console.log(raceFiltersData)
                for (let groupName in filterOptions.filterGroups) {
                    if (groupName !== "raceCategory") {
                        updatedFilterOpts.filterGroups[groupName] = raceFiltersData.reduce((accum, dataRow) => {
                            if (accum.includes(dataRow[groupName])) return accum;
                            accum.push(dataRow[groupName])
                            return accum
                        }, []).sort()
                    }
                    else {
                        updatedFilterOpts.filterGroups[groupName] = raceFiltersData.reduce((accum, dataRow) => {
                            dataRow[groupName].split(", ").forEach(category => {
                                if (accum.includes(category)) return accum;
                                accum.push(category)
                            })
                            return accum
                        }, []).sort()
                    }
                }
                return updatedFilterOpts
            })
            setResults(resultsData)
        }
        try {
            getResults()
        } catch (error) {

        }
    }, [])

    let filteredResults = results.filter(result => {
        console.log(filterOptions)
        if (filterOptions.selectedOpts.raceName && result.raceName.toLowerCase() !== filterOptions.selectedOpts.raceName.toLowerCase()) return false
        if (filterOptions.selectedOpts.raceYear && Number(result.year) !== Number(filterOptions.selectedOpts.raceYear)) return false
        if (filterOptions.selectedOpts.raceCategory && result.raceCategory.toLowerCase() !== filterOptions.selectedOpts.raceCategory.toLowerCase()) return false
        return true
    })

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
                            {raceName && <th>Race</th>}
                            <th>Place</th>
                            <th>Racer</th>
                            <th>Category</th>
                            <th>Final Time</th>
                            <th>Lap 1</th>
                            <th>Lap 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map(result => {
                            let racerName = `${result.firstName} ${result.lastName}`.toLowerCase().trim()
                            let isSelected = racerName.includes(filterOptions.searchName) && filterOptions.searchName.length > 0 ? true : false;
                            return <ResultsRow key={result.id} result={result} isSelected={isSelected} raceName={raceName} />
                        })
                        }
                    </tbody>
                </table>
            }
        </>
    )
}