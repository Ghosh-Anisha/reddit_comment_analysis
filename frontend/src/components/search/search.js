import React, {useState} from 'react';
import { RiUserSearchFill } from 'react-icons/ri'
const SearchBar = () => {
    const[searchVal, setSearchVal] = useState("");
    const changeVal=(newVal)=>setSearchVal(newVal);

    return(

    <div class="p-8">
        <div class="bg-white flex items-center rounded-full shadow-xl">
            <input class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Enter subreddit /u/"/>
          
            <div class="p-4">
                <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center" onClick={changeVal}>
                    <RiUserSearchFill/>
                </button>
            </div>
        </div>
    </div>
    // <form action="/" method="get">
    //     <label htmlFor="header-search">
    //         <span className="visually-hidden">Search subreddit</span>
    //         <br/>
    //     </label>
    //     <input
    //         type="text"
    //         id="header-search"
    //         placeholder="Search subreddit"
    //         name="s" 
    //     />
    //     <button type="submit" onClick={changeVal}>Search</button>
    // </form>
    )
};

export default SearchBar;