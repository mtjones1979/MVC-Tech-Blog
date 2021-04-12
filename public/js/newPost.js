const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector(".post-title").value.trim();
    const content = document.querySelector(".post-content").value.trim();
    // const token = localStorage.getItem('token');

   const response = await fetch('/api/posts/new', {
     
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      console.log(title, content);
    if (response.ok) {
    document.location.replace('/');
    } else {
      alert('This did not post')
}
};
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  

  