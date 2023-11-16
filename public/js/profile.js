const formSubmitBtn = document.querySelector('#form-submit-btn');
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  const id = document.querySelector('#post-id').value.trim();
  let response;
  if (name && description && !id) {
    response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else if (name && description && id) {
    formSubmitBtn.textContent = 'Create';
    response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (response?.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to create post');
  }
};

const delButtonHandler = async (event) => {
  // event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

const editButtonHandler = async (event) => {
  // event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const name = event.target.getAttribute('data-name');
    const description = event.target.getAttribute('data-description');

    document.querySelector('#post-name').value = name;
    document.querySelector('#post-desc').value = description;
    document.querySelector('#post-id').value = id;
    formSubmitBtn.textContent = 'Edit';
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#delete-btn')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('#edit-btn')
  .addEventListener('click', editButtonHandler);
