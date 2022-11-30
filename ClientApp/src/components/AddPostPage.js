import { useNavigate } from 'react-router-dom';
import { baseUrl } from './BaseUrl';
import { apiPost } from './ApiPost';
import { authorizedPostFetch } from './Token';

export function AddPostPage() {

    const navigate = useNavigate();

    async function AddPost() {

        let title = document.querySelector("#title").value;
        let content = document.querySelector("#content").value;

        let data = {
            title: title,
            content: content,
            id: 0,
            likeCount: 0,
            disLikeCount: 0,
            commentList: [],
            category: ""
        };
        await authorizedPostFetch(`${baseUrl()}api/addPost`, data);
        navigate('/');
    }



    /*async function apiPost(url, payload) {
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        return await data.json()
    }*/



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
