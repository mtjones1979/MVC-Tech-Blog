const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector(".text").value.trim();
    
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text }),
        headers: {'Content-Type': 'application/json'}
        });
        console.log(comment_text);
        if (response.ok) {
            document.location.reload('/')
        } else {
            alert("This didnt work");
          
        }
    };

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
