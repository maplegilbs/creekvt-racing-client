//Hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//Icons
import { faFilter, faMagnifyingGlass, faSort, faChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
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

function SearchPanel({ filterOptions, setFilterOptions }) {
    return (
        <div className={`${styles["search-panel__container"]}`}>
            <div>
                <label htmlFor="racerSearch">Search By Racer</label>
                <div className={`${styles["search-box"]}`}>
                    <input type="search" name="racerSearch" id="racerSearch" value={filterOptions.searchName} onChange={(e) => setFilterOptions(prev => { return { ...prev, searchName: e.target.value.toLowerCase() } })} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
        </div>
    )
}

function FilterPanel({ filterOptions, setFilterOptions, raceName }) {
    return (
        <div className={`${styles["search-panel__container"]}`}>
            <div className={`${styles["search-panel__row"]}`}>
                <p>Filter By</p>
            </div>
            <div className={`${styles["search-panel__row"]}`}>
                {raceName &&
                    <FilterSelect labelName={"Race"} filterName={"raceName"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                }
                <FilterSelect labelName={"Year"} filterName={"raceYear"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                <FilterSelect labelName={"Category"} filterName={"raceCategory"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                <FilterSearch filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
            </div>
        </div>
    )
}


function FilterSelect({ labelName, filterName, filterOptions, setFilterOptions }) {
    let options = filterOptions.filterGroups[filterName];

    function handleFilterOptsChange(e) {
        setFilterOptions(prev => {
            let updatedFilterOpts = { ...prev }
            updatedFilterOpts.selectedOpts[filterName] = e.target.value;
            //cycle through all our available options
            updatedFilterOpts.currentFilterOpts = filterOptions.allFilterOpts.filter(dataRow => {
                //cycle through our selected options.  if an available option's data does not contain the corresponding selected data, remove it from the filtered list
                let wasMatched = true
                for (let selectedOptName in filterOptions.selectedOpts) {
                    if (!filterOptions.selectedOpts[selectedOptName]) continue
                    if (selectedOptName === 'raceCategory' && !dataRow[selectedOptName].includes(filterOptions.selectedOpts[selectedOptName])) wasMatched = false
                    else if (selectedOptName !== 'raceCategory' && dataRow[selectedOptName] != filterOptions.selectedOpts[selectedOptName]) wasMatched = false;
                }
                return wasMatched
            })
            for (let groupName in filterOptions.filterGroups) {
                if (groupName !== "raceCategory") {
                    let filterOptGroups = updatedFilterOpts.currentFilterOpts.reduce((accum, dataRow) => {
                        if (accum.includes(dataRow[groupName])) return accum;
                        accum.push(dataRow[groupName])
                        return accum
                    }, []).sort()
                    updatedFilterOpts.availableOpts[groupName] = filterOptGroups
                }
                else {
                    let filterOptGroups = updatedFilterOpts.currentFilterOpts.reduce((accum, dataRow) => {
                        dataRow[groupName].forEach(category => {
                            if (accum.includes(category)) return accum;
                            accum.push(category)
                        })
                        return accum
                    }, []).sort()
                    updatedFilterOpts.availableOpts[groupName] = filterOptGroups
                }
            }
            return updatedFilterOpts
        })
    }

    return (
        <div className={`${styles["filter-group"]}`}>
            <label htmlFor={filterName}>{labelName}</label><br />
            <select id={filterName} value={filterOptions.selectedOpts[filterName]} onChange={handleFilterOptsChange}>
                <option value={''} selected >All</option>
                {options &&
                    options.sort().map(optionValue => {
                        return <option value={optionValue} style={!filterOptions.availableOpts[filterName].includes(optionValue) ? { backgroundColor: "lightgrey", color: "rgba(155,155,155,.5)" } : {}}>{optionValue}</option>
                    })}
            </select>
        </div>
    )
}

function FilterSearch({ filterOptions, setFilterOptions }) {

    function handleFilterOptsChange(e) {
        setFilterOptions(prev => {
            let updatedSelectedOpts = {
                ...prev.selectedOpts,
                racerName: e.target.value.toLowerCase()
            }
            let updatedFilterOpts = {
                ...prev,
                selectedOpts: updatedSelectedOpts
            }
            return updatedFilterOpts
        })
    }
    return (
        <div className={`${styles["filter-group"]}`}>
            <label htmlFor="racerSearch">Racer</label>
            <div className={`${styles["search-box"]}`}>
                <input type="search" name="racerSearch" id="racerSearch" value={filterOptions.selectedOpts.racerName} onChange={(e) => handleFilterOptsChange(e)} />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}

function SortPanel({ filterOptions, setFilterOptions }) {

    let selectedSortOptions = filterOptions.orderedSelectedSortOpts.join(' > ')

    function removeSortOpt() {
        setFilterOptions(prev => {
            let removedSortOpt = prev.orderedSelectedSortOpts.pop()
            let updatedOrderedSelectedSortOpts = prev.orderedSelectedSortOpts
            prev.sortOpts.push(removedSortOpt);
            let updatedSortOpts = prev.sortOpts.sort()
            let upatedFilterOptions = {
                ...prev,
                orderedSelectedSortOpts: updatedOrderedSelectedSortOpts,
                sortOpts: updatedSortOpts
            }
            return upatedFilterOptions
        })
    }

    return (
        <div className={`${styles["search-panel__container"]}`}>
            <div className={`${styles["search-panel__row"]}`}>
                <p>Sort By</p>
            </div>
            <div className={`${styles["search-panel__row"]}`}>
                <SortSelect labelName={"Select To Sort"} filterName={"raceYear"} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
            </div>
            <div className={`${styles["search-panel__row"]}`}>
                {selectedSortOptions && <p>SORT ORDER: &nbsp;<span className={`${styles["sort-order__span"]}`}>{selectedSortOptions}</span><span style={{ cursor: "pointer" }} onClick={removeSortOpt}>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCircleXmark} color={"#4d7288"} /> </span></p>}
            </div>
        </div>
    )
}

function SortSelect({ labelName, filterName, filterOptions, setFilterOptions }) {
    let options = filterOptions.sortOpts;

    function handleSortOptsChange(e) {
        setFilterOptions(prev => {
            console.log(prev)
            let selectedSortOpt = e.target.value;
            let foundIndex = prev.sortOpts.indexOf(selectedSortOpt);
            let updatedSortOpts = prev.sortOpts.toSpliced(foundIndex, 1)
            prev.orderedSelectedSortOpts.push(selectedSortOpt)
            let updatedOrderedSelectedSortOpts = prev.orderedSelectedSortOpts
            let updatedFilterOpts = {
                ...prev,
                sortOpts: updatedSortOpts,
                orderedSelectedSortOpts: updatedOrderedSelectedSortOpts,
            }
            return updatedFilterOpts
        })

    }

    return (
        <div className={`${styles["sort-group"]}`}>
            {/* <label htmlFor={filterName}>{labelName}</label><br /> */}
            <select id={filterName} onChange={handleSortOptsChange}>
                <option value={''} selected >--</option>
                {options &&
                    options.sort().map(optionValue => {
                        return <option value={optionValue}>{optionValue}</option>
                    })}
            </select>
        </div>
    )
}



//Setting up initial object to hold our filtered data
const initialFilterOptions = {
    allFilterOpts: [],
    currentFilterOpts: [],
    selectedOpts: {
        raceName: null,
        raceYear: null,
        raceCategory: null,
        racerName: null
    },
    availableOpts: {},
    filterGroups: {
        raceName: null,
        raceYear: null,
        raceCategory: null
    },
    sortOpts: ['Year', 'Place', 'Race Name', 'Category', 'Final Time', 'Lap 1', 'Lap 2', 'Racer'],
    orderedSelectedSortOpts: [],
    searchName: null,
}

const sortLookup = {
    'Year': 'year',
    'Place': 'place',
    'Race Name': 'raceName',
    'Category': 'raceCategory',
    'Final Time': 'fastestLap',
    'Lap 1': 'lap1',
    'Lap 2': 'lap2',
    'Racer': 'lastName'
}


//DEFAULT COMPONENT
export default function Results() {
    const [results, setResults] = useState([])
    const [filterOptions, setFilterOptions] = useState(initialFilterOptions)
    const [showFilterOptions, setShowFilterOptions] = useState(false)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [showSortOptions, setShowSortOptions] = useState(false)
    const { raceName } = useParams()

    let filteredResults = results.filter(result => {
        if (filterOptions.selectedOpts.raceName && result.raceName.toLowerCase() !== filterOptions.selectedOpts.raceName.toLowerCase()) return false
        if (filterOptions.selectedOpts.raceYear && Number(result.year) !== Number(filterOptions.selectedOpts.raceYear)) return false
        if (filterOptions.selectedOpts.raceCategory && result.raceCategory.toLowerCase() !== filterOptions.selectedOpts.raceCategory.toLowerCase()) return false
        if (filterOptions.selectedOpts.racerName && !`${result.firstName} ${result.lastName}`.toLowerCase().trim().includes(filterOptions.selectedOpts.racerName)) return false
        return true
    })

    function bulidSortFunction(arrayOfOptions) {
        let ifStatements = arrayOfOptions.map(element => {
            console.log(element)
            if (!['Final Time', 'Lap 1', 'Lap 2'].includes(element)) {
                return (`
                if(itemA.${sortLookup[element]} > itemB.${sortLookup[element]}) return 1
                if(itemA.${sortLookup[element]} < itemB.${sortLookup[element]}) return -1`
                )
            }
            else {
                return (`
                if(stringTimeToSeconds(itemA.${sortLookup[element]}) > stringTimeToSeconds(itemB.${sortLookup[element]})) return 1
                if(stringTimeToSeconds(itemA.${sortLookup[element]}) < stringTimeToSeconds(itemB.${sortLookup[element]})) return -1`
                )
            }
        });
        let sortFunctionString = `
        const stringTimeToSeconds = (timeString) => {
            let timeArray = timeString.split(":").reverse()
            let timeInSeconds = timeArray.reduce((accum, value, index) => {
                let curValInSeconds = Number(value) * 60 ** index
                accum += curValInSeconds
                return accum
            }, 0)
            return timeInSeconds? timeInSeconds : 100000; 
        }
        ` + ifStatements.join('\n') + '\n\nreturn 0;'
        console.log(sortFunctionString)
        return new Function('itemA', 'itemB', sortFunctionString)

    }

    const sortFunction = bulidSortFunction(filterOptions.orderedSelectedSortOpts)

    let sortedResults = filterOptions.orderedSelectedSortOpts.length > 0 ? filteredResults.sort((itemA, itemB) => sortFunction(itemA, itemB)) : filteredResults;




    useEffect(() => {
        async function getResults() {
            let resultsResponse = await fetch(`${process.env.REACT_APP_SERVER}/results${raceName ? "?raceName=" + raceName : ""}`)
            let resultsData = await resultsResponse.json();
            let raceFiltersResponse = await fetch(`${process.env.REACT_APP_SERVER}/results/resultYears${raceName ? "?raceName=" + raceName : ""}`)
            if (raceFiltersResponse.status !== 200) throw new Error('Race filters unavailable')
            let raceFiltersData = await raceFiltersResponse.json();
            console.log(raceFiltersData)
            setFilterOptions(prev => {
                let updatedFilterOpts = { ...prev }
                for (let groupName in filterOptions.filterGroups) {
                    if (groupName !== "raceCategory") {
                        let filterOptGroups = raceFiltersData.reduce((accum, dataRow) => {
                            if (accum.includes(dataRow[groupName])) return accum;
                            accum.push(dataRow[groupName])
                            return accum
                        }, []).sort()
                        updatedFilterOpts.filterGroups[groupName] = filterOptGroups;
                        updatedFilterOpts.availableOpts[groupName] = filterOptGroups
                    }
                    else {
                        let filterOptGroups = raceFiltersData.reduce((accum, dataRow) => {
                            dataRow[groupName].forEach(category => {
                                if (accum.includes(category)) return accum;
                                accum.push(category)
                            })
                            return accum
                        }, []).sort()
                        updatedFilterOpts.filterGroups[groupName] = filterOptGroups
                        updatedFilterOpts.availableOpts[groupName] = filterOptGroups
                    }
                }
                
                //find the previous results year
                let mostRecentResultYear = Math.max(...raceFiltersData.map(dataItem => dataItem.raceYear))
                updatedFilterOpts.selectedOpts.raceYear = mostRecentResultYear;
                updatedFilterOpts.allFilterOpts = raceFiltersData
                return updatedFilterOpts
            })
            setResults(resultsData)
        }
        try {
            getResults()
        } catch (error) {
            //!need error handling here
        }
    }, [])


    return (
        <>
            <div className={`${styles["action-buttons__container"]}`}>
                <button className={`button button--medium ${styles["results-button"]}`} onClick={() => setShowSearchBar(prev => !prev)}><FontAwesomeIcon icon={faChevronRight} rotation={showSearchBar ? 90 : 0} /> &nbsp; Search &nbsp;<FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                <button className={`button button--medium ${styles["results-button"]}`} onClick={() => setShowFilterOptions(prev => !prev)}><FontAwesomeIcon icon={faChevronRight} rotation={showFilterOptions ? 90 : 0} /> &nbsp; Filter &nbsp;<FontAwesomeIcon icon={faFilter} /></button>
                <button className={`button button--medium ${styles["results-button"]}`} onClick={() => setShowSortOptions(prev => !prev)}><FontAwesomeIcon icon={faChevronRight} rotation={showSortOptions ? 90 : 0} /> &nbsp; Sort &nbsp;<FontAwesomeIcon icon={faSort} /></button>
            </div>
            {showSearchBar && <SearchPanel filterOptions={filterOptions} setFilterOptions={setFilterOptions} />}
            {showFilterOptions && <FilterPanel filterOptions={filterOptions} setFilterOptions={setFilterOptions} raceName={raceName} />}
            {showSortOptions && <SortPanel filterOptions={filterOptions} setFilterOptions={setFilterOptions} raceName={raceName} />}
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
                    <tbody>
                        {sortedResults.map(result => {
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