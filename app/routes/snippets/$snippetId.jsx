import { redirect } from '@remix-run/node';
import { Link, Form, useLoaderData} from '@remix-run/react';
import connectDb from '~/db/connectDb.server';

export async function loader({ params }) {

    const db = await connectDb();
    const snippet = await db.models.CodeSnippet.findById(params.snippetId);

    return snippet;

}
export async function action({ request }) {
    const body = await request.formData();
    var id = body.get("_id");
    var action = body.get("action");
    if (action == 'delete') {
        const db = await connectDb();
        db.models.CodeSnippet.findByIdAndDelete(id).exec();
        return redirect('/');

    } else if (action == 'fav_update') {
        const db = await connectDb();
        const snippet = await db.models.CodeSnippet.findById(id);

        var model = {
            favourite: !snippet.favourite,

        };

        db.models.CodeSnippet.findByIdAndUpdate(id, model).exec();
        return redirect('/snippets/' + id);
    }
    console.log(body);
    return null;


}

export default function Index() {
    async function copyToClipboard() {
        var copyText = document.getElementById("codeBox");
        var data = copyText.innerHTML; 
        await navigator.clipboard.writeText(data);


    }

    const snippet = useLoaderData();
    var favButtonClassName = "";
    if (snippet.favourite == true) {
        favButtonClassName = "favToggle";
    }
    return (


        <div id='content-section'>



            <div key={snippet._id}>



                <div className='content-wrapper'>
                    <h1>{snippet.title}</h1>
                    <p>{snippet.language}</p>
                    <p>{snippet.description}</p>


                    <div className='code-wrapper'>
                        <p id="codeBox">{snippet.code_snippet}</p>

                        <div className="button-wrapper">
                            <button onClick={() => { copyToClipboard(); }} çç>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.086" height="18.856" viewBox="0 0 15.086 18.856">
                                    <g id="Icon_ionic-ios-copy" data-name="Icon ionic-ios-copy" transform="translate(-4.5 -1.125)">
                                        <path id="Path_248" data-name="Path 248" d="M24.157,5.017h3.536a.236.236,0,0,0,.236-.236h0a1.1,1.1,0,0,0-.393-.837L24.507,1.423a1.469,1.469,0,0,0-.809-.291h0a.29.29,0,0,0-.291.291V4.271A.752.752,0,0,0,24.157,5.017Z" transform="translate(-8.343 -0.003)" fill="#1a605f" />
                                        <path id="Path_249" data-name="Path 249" d="M16.528,4.268V1.125H11.382a1.261,1.261,0,0,0-1.257,1.257v13.2a1.261,1.261,0,0,0,1.257,1.257H20.81a1.261,1.261,0,0,0,1.257-1.257V6.036H18.3A1.77,1.77,0,0,1,16.528,4.268Z" transform="translate(-2.482)" fill="#1a605f" />
                                        <path id="Path_250" data-name="Path 250" d="M6.543,18.667V5.625H5.757A1.261,1.261,0,0,0,4.5,6.882V20.71a1.261,1.261,0,0,0,1.257,1.257H15.814a1.261,1.261,0,0,0,1.257-1.257v-.786H7.8A1.261,1.261,0,0,1,6.543,18.667Z" transform="translate(0 -1.986)" fill="#1a605f" />
                                    </g>
                                </svg>

                            </button>
                        </div>
                    </div>

                    <div className="buttons-wrapper">
                        <Form method="post">
                            <input type="hidden" name="_id" defaultValue={snippet._id}></input>
                            <button type="submit" name="action" value="fav_update" id="fav_icon" className={favButtonClassName}>Favourite  &#9733;</button>
                        </Form>

                        <Link to={"/snippets/Update/" + snippet._id}>
                            <button>Edit</button>
                        </Link>

                        <Form method="post">
                            <input type="hidden" name="_id" defaultValue={snippet._id}></input>
                            <button type="submit" name="action" value="delete">Delete</button>
                        </Form>
                    </div>

                </div>
            </div>
        </div>
    );

}
