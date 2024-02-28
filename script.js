document.addEventListener('DOMContentLoaded', function () {
    // Fetch the CSV file
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');

            //Create table header
            let table = '<thead><tr>';
            headers.forEach(header => {
               table += `<th>${header}</th>`;
            });
            table += '</tr></thead><tbody>';

//             <tr class="header">
//     <th style="width:60%;">Name</th>
//     <th style="width:40%;">Country</th>
//   </tr>


            // Create table rows
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                table += '<tr>';
                values.forEach(value => {
                    table += `<td>${value}</td>`;
                });
                table += '</tr>';
            }

            table += '</tbody>';

            // Append table to the HTML document
            document.getElementById('myTable').innerHTML = table;
        })
        .catch(error => console.error('Error fetching CSV:', error));
});
