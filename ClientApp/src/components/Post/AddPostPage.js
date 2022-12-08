import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../BaseUrl/BaseUrl';
import { authorizedPostFetch, getUserFromJwt } from '../Authentication/authenticationUtils';

export function AddPostPage() {

    const navigate = useNavigate();

    async function AddPost() {

        let title = document.querySelector("#title").value;
        let content = document.querySelector("#content").value;
        let userData = await getUserFromJwt();

        if (title == "" || content == "") {
            alert("Title and Content are needed too");

        }

        else { 
        let data = {
            title: title,
            content: content,
            id: 0,
            likeCount: 0,
            disLikeCount: 0,
            commentList: [],
            category: "",
            likersList: [],
            disLikersList: [],
            username: userData.name,
            userId: userData.id


        };
        await authorizedPostFetch(`${baseUrl()}api/addPost`, data);
        navigate('/');

        }
    }


    return (
        <div className="page-content">
        <h1>Post Editor</h1>

        <h4>Post</h4>
        <hr />
        <div className="row post-edit-block">
            <div className="col-md-4" id="post-editor">
                <form method="post">
                    <div className="text-danger"></div>
                    <div className="form-group">
                            <label>
                                Title:
                                <input className="form-control" id="title" name="Title" />
                            </label>
                    </div>
                    <div className="form-group post-content">
                            <label>
                                Content:
                                <input className="form-control" id="content" name="content" />
                            </label>
                            
                    </div>
                    <div className="form-group">
                            <input type="button" value="Post" className="btn btn-primary post-editor-add-post" onClick={AddPost} />
                    </div>
                </form>
            </div>
        </div>

            <div>
                <a href="/" className="home-button">Home</a>
        </div>
    </div>
    )}
