import React from 'react'
const SearchBar = ({handleSearch}) => {
    return (
        <div>
                <div class="input-group add-on">
                    <input
                        class="form-control SearchInput"
                        placeholder="Search"
                        name="srch-term"
                        id="srch-term"
                        type="text"
                        onChange = {(e)=>handleSearch(e.target.value)}
                        
                    />
                    <div class="input-group-btn">
                        <button class="btn btn-default" style={{ background: "#feb41d", border: "1px solid #feb41d" }} type="submit">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
            </div>
    )
}
export default SearchBar;


