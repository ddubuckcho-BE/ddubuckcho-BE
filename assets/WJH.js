
<input type="file" ref={fileInput}/>
//  const fileInput = React.useRef();


// const addPost = () => {

//     dispatch(actionCreators.addPostDB({ 
//         thumbnail:fileInput.current.files[0] 
//     }))
// }
const addPostDB = (post = {}) => {
    return async function (dispatch, useState, { history }) {
        //  const token = localStorage.getItem('token');
        const form = new FormData()
        form.append('thumbnaill',post.thumbnail)
        await api.post("/posts", post,
            {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }
        ).then(function (response) {
                console.log("안녕 나는 미들웨어 add",response)

            });
    }
}



<button onClick={addPost}>글 추가</button>