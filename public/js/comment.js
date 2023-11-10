
const commentButtonHandler = async (event) => {
    event.preventDefault();

    const text = document.getElementById('commentText').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1].split('?')[0];
    console.log(text, post_id);
    
    if (text) {
      
  
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({text, post_id}),
        headers: { 'content-type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed comment on post');
      }
    }
  };

  document
    .querySelector('#comment-form')
    .addEventListener('submit', commentButtonHandler);