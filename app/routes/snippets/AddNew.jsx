
import { redirect } from '@remix-run/node';
import { Link, useLoaderData} from '@remix-run/react';
import connectDb from '~/db/connectDb.server';

export async function loader() {
    const db = await connectDb();
    const snippets = await db.models.CodeSnippet.find();

    return snippets;

}


export async function action({ request }) {
    const body = await request.formData();
    // const name = body.get("visitorsName");
    var model = {
        title: body.get("name"),
        date: new Date(),
        description: body.get("description"),
        code_snippet: body.get("code-snippet"),
        language: body.get("language"),
        favourite: false
    };
    const db = await connectDb();
    db.models.CodeSnippet.create(model);
    return redirect('/');
}

export default function AddNewSnippet() {


    const snippets = useLoaderData();



    return (
                <div id="add-new-section">
                      <div className='content-wrapper'> 
                    <h1>Create new</h1>



                    <form method="post">

                        <label><input name="name" type="text" placeholder='Title' /></label>  <br></br>
                        <label><textarea name="description" placeholder='Description'></textarea></label>    <br></br>
                        <label><textarea name="code-snippet" placeholder='Code Snippet'></textarea></label>   <br></br>
                        <select id="language" name="language">
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="JavaScript">JavaScript</option>
                        </select>                             <br></br>
                        <button type="submit">Create</button>   <br></br>

                    </form>

                    </div>
                </div>
    );

}
