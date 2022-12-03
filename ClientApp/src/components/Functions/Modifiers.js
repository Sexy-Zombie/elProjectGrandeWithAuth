
import { baseUrl } from '../BaseUrl/BaseUrl';
import { apiPost } from '../Post/ApiPost';



export async function AddCommentToPost(id, refresherFunction) {

    let content = document.querySelector(`[data-id="comment-to-${id}"]`);
    let comment = content.value;
    if (comment != "") {
        content.value = "";
        let data = {
            Content: comment,
            Id: id
        };
        await apiPost(`${baseUrl()}api/addComment`, data);

        refresherFunction();
    }
}


export async function DeletePostById(id) {
    await fetch(`${baseUrl()}api/deletePost/${id}`)
}

export async function AddLikeToPost(id, refresherFunction) {
    await fetch(`${baseUrl()}api/addLikeToPost/${id}/${sessionStorage.getItem('name')}`)
    refresherFunction();
}

export async function AddDislikeToPost(id, refresherFunction) {
    await fetch(`${baseUrl()}api/addDislikeToPost/${id}/${sessionStorage.getItem('name')}`)
    refresherFunction();
}