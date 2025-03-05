document.addEventListener('DOMContentLoaded', () => {
    const courseTable = document.getElementById('course-table');

    fetch('https://raw.githubusercontent.com/RovicAlmonia/html-css/main/courses.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched Course Data:', data); // Debugging output

            courseTable.innerHTML = ''; // Clear placeholder

            if (!data.courses || data.courses.length === 0) {
                console.error('No courses found in JSON data');
                courseTable.innerHTML = '<tr><td colspan="5">No courses available</td></tr>';
                return;
            }

            data.courses.forEach(course => {
                let row = document.createElement('tr');
                
                // Security: Prevents XSS by using textContent
                let year = document.createElement('td');
                year.textContent = course.year_level || 'N/A';

                let sem = document.createElement('td');
                sem.textContent = course.sem || 'N/A';

                let code = document.createElement('td');
                code.textContent = course.code || 'N/A';

                let description = document.createElement('td');
                description.textContent = course.description || 'N/A';

                let credit = document.createElement('td');
                credit.textContent = course.credit || 'N/A';

                row.appendChild(year);
                row.appendChild(sem);
                row.appendChild(code);
                row.appendChild(description);
                row.appendChild(credit);

                courseTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching courses.json:', error);
            courseTable.innerHTML = `<tr><td colspan="5">Failed to load courses</td></tr>`;
        });
});
