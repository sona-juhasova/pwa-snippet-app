import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import connectDb from "./db/connectDb.server";
import styles from "~/styles/global.css";
import SnippetList from "./components/SnippetList";
import CategoryList from "./components/CategoryList";

export function meta() {
  return {
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}
export async function loader({ request }) {
  const db = await connectDb();
  const url = new URL(request.url);

  // categories
  const category = url.searchParams.get("category");
  var searchParams = {};
  if (category != null && category != '') {
    searchParams.language = category;
  }

  //  search
  const searchQuery = url.searchParams.get("searchQuery");
  if (searchQuery != null && searchQuery != '') {
    searchParams.title = { $regex: searchQuery };

  }


  // filter

  const filter = url.searchParams.get("filter_selector");
  let filterParams = {};

  if (filter != null && filter != '') {
    if (filter == "title_az") {
      //  sort title a-z  
      filterParams = {title: 1}; 
    }
    if (filter == "title_za") {
      //  sort title a-z  
      filterParams = {title: -1}; 
    }

    if (filter == "last_updated") {
      //  sort by updated
      // searchParams.sort({date: 1});
      filterParams = {date: -1};

    }
    if (filter == "fav") {
      //  view favourite
      searchParams.favourite = true; 

    }

  }


  const snippets = await db.models.CodeSnippet.find(searchParams).sort(filterParams);
  return snippets;



}



export default function App() {
  var snippets = useLoaderData();

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico"/>
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="manifest" href="./manifest.json"/>
        <Meta />
        <Links />
      </head>
      <body>
        <main>
          <div id='header'>
            <h1>Code Snippet App</h1>

            <Link to="./snippets/AddNew">
              <button>Create New</button>
            </Link>

          </div>
          <div id='window-wrapper'>
            <CategoryList />
            <SnippetList snippets={snippets} />
            <Outlet />
          </div>
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
