const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="post-content"]').value.trim();
    const token = localStorage.getItem('token');

   await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
    document.location.replace('/dashboard');
    };
  document.querySelector('.new-post-form').addEventListener('click', newFormHandler);
  
  
  