const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const token = localStorage.getItem('token');

   const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
      alert('This did not post')
    }
};
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  

  