const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    
    if (event.target.hasAttribute('post-id')) {
        const id = event.target.getAttribute('post-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {'Content-Type': 'application/json'},
        });
  
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit the post');
        }
    }

    document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
};    