// Toggle quiz visibility
document.getElementById('toggle-quiz').addEventListener('click', function() {
    const quizContainer = document.getElementById('quiz-container');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    quizContainer.style.display = expanded ? 'none' : 'block';
    this.setAttribute('aria-expanded', !expanded);
});

// Submit quiz
function submitQuiz() {
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    let score = 0;

    for (let value of formData.values()) {
        score += parseInt(value, 10);
    }

    const result = `Your score is: ${score}. Please consider seeking help if your score is high.`;
    const resultsDiv = document.getElementById('quiz-results');
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = result;
}
document.getElementById('expertForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('/submit-expert', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Display success message
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Submission failed!');
    });
});
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Get form data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        field_of_expertise: formData.get('field_of_expertise')
    };

    fetch('http://localhost:3300/submit-expert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Handle success
    })
    .catch((error) => {
        console.error('Error:', error); // Handle errors
    });
});


