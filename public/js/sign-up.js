// used same layout from login but changed to sign-up
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('done!');
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create sign-up');
      }
    }
  };
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
