import React from 'react'

/**
 * Search bar will ask for 3 things, location, start and end date.
 * @returns 
 */
const SearchBar = () => {
    return (
        <div className="bg-red-200">
            <div className="flex items-stretch flex-row w-full">
                <div className="flex-1">
                    Location
                </div>
                <div className="flex-1">
                    Start Date
                </div>
                <div className="flex-1">
                    End Date
                </div>
                <div className="flex-1">
                    Search
                </div>
            </div>
        </div>
    )
}

export default SearchBar
