import { Link, useLoaderData } from '@remix-run/react';
import connectDb from '~/db/connectDb.server';

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.CodeSnippet.find();

  return snippets;

}



export default function Index() {


  const snippets = useLoaderData();
 

  return (
      <div id='content-section'>




      </div>

  );

}
