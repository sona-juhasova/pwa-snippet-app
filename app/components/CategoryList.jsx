import {Link} from '@remix-run/react';
export default function CategoryList(props)
{
    return(
        <div id='category-section'>
        <div>
          <h3><Link to="?category=">All</Link></h3>
        </div> 
        <div>
          <h3><Link to="?category=HTML">HTML</Link></h3>
        </div>
        <div>
          <h3><Link to="?category=CSS">CSS</Link></h3>
        </div>
        <div>
          <h3><Link to="?category=JavaScript">JavaScript</Link></h3>
        </div>

      </div>
    );
}