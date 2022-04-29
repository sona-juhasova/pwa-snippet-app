
import { redirect } from '@remix-run/node';
import { Link,Form, useLoaderData} from '@remix-run/react';
import connectDb from '~/db/connectDb.server';

export async function loader({ params }) {

    const db = await connectDb();
    const snippet = await db.models.CodeSnippet.findById(params.snippetId);

    return snippet;

}


export async function action({ request }) {
    const body = await request.formData(); 
    var id = body.get("_id");
    var model = {
       
        title: body.get("name"),
        date: new Date(),
        description: body.get("description"),
        code_snippet: body.get("code-snippet"),
        language: body.get("language"),
       
    };
    const db = await connectDb();
    db.models.CodeSnippet.findByIdAndUpdate(id,model).exec();
    return redirect('/snippets/'+id);
    
}

export default function UpdateSnippet() {


    const snippet = useLoaderData();



    return (
                <div id="add-new-section">
                      <div className='content-wrapper'> 
                    <h1>Edit</h1>



                    <Form method="post">
                        <input type="hidden" value={snippet._id} name="_id"></input>
                        <label><input name="name" type="text" placeholder='Title' defaultValue={snippet.title} /></label>  <br></br>
                        <label><textarea name="description" placeholder='Description' defaultValue={snippet.description} ></textarea></label>    <br></br>
                        <label><textarea name="code-snippet" placeholder='Code Snippet' defaultValue={snippet.code_snippet} ></textarea></label>   <br></br>
                        <select id="language" name="language" defaultValue={snippet.language}>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="JavaScript">JavaScript</option>
                        </select>                             <br></br>
                        <button type="submit">Save</button>   <br></br>

                    </Form>

                    </div>
                </div>
    );

}
