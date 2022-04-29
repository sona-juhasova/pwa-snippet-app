import { Link } from '@remix-run/react';



export default function SnippetList(props) {
    const snippets = props.snippets;

    return (

        <div id='overview-section'>
            <div className='search-wrapper'>
                <form method="GET">
                    <input type="text" name="searchQuery" id="myInput" placeholder="Search" title="search"></input>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16.727" height="16.728" viewBox="0 0 16.727 16.728">
                            <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-3.5 -3.5)">
                                <path id="Path_251" data-name="Path 251" d="M17.223,10.862A6.362,6.362,0,1,1,10.862,4.5a6.362,6.362,0,0,1,6.362,6.362Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                <path id="Path_252" data-name="Path 252" d="M28.434,28.434l-3.459-3.459" transform="translate(-9.621 -9.621)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            </g>
                        </svg>

                    </button>
                </form>

                <div className='filter-container'>
                    <form method="GET">

                        <select id="filter_selector" name="filter_selector" >
                            <option value="" disabled selected>Sort</option>
                            <option value="title_az" name="title_az">by title A-Z</option>
                            <option value="title_za" name="title_za">by title Z-A</option>
                            <option value="last_updated" name="last_updated">by last updated</option>
                            <option value="fav" name="fav">by favourite</option>
                        </select>
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18.199" viewBox="0 0 20 18.199">
                                <path id="Icon_feather-filter" data-name="Icon feather-filter" d="M21,4.5H3l7.2,8.514V18.9l3.6,1.8V13.014Z" transform="translate(-2 -3.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            </svg>
                        </button>
                    </form>
                </div>

            </div>
            <div id="list-id">
                {snippets.map((snippet) => {
                    return (
                        <div key={snippet._id} className="list-item">

                            <Link to={"/snippets/" + snippet._id}>{snippet.title}</Link>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}