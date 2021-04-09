const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="post-content"]').value.trim();
    
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ post_id: id, title, content }),
            headers: {'Content-Type': 'application/json'},
        });
  
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit the post');
        }
    }
};
    document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
    