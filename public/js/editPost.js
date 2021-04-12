const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('.post-title').value.trim();
    const content = document.querySelector('.post-content').value.trim();
    
    // if (event.target.hasAttribute('data-id')) {
    //     const id = event.target.getAttribute('data-id');

       await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {'Content-Type': 'application/json'},
        });
        console.log(title, content);
        // if (response.ok) {
            document.location.replace('/');
        // } else {
            alert('Failed to edit the post');
        // }
    // }
};
    document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
   