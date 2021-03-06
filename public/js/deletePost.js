const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
     await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({post_id: id}),
        headers: {'Content-Type': 'application/json'}
      });
  
      // if (response.ok) {
        document.location.replace('/dashboard');
      // } else {
        alert('Failed to delete post');
    //   }
    }
};
  document.querySelector('.edit-post-form').addEventListener('click', delButtonHandler);
