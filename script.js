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

            // Create table rows
            // for (let i = 1; i < rows.length; i++) {
            //     const values = rows[i].split(',');
            //     table += '<tr>';
            //     values.forEach(value => {
            //         table += `<td>${value}</td>`;
            //     });
            //     table += '</tr>';
            // }

            // Create table rows
            for (let i = 1; i < rows.length; i++) {
                const values = parseCSVRow(rows[i]);
                table += '<tr>';
                values.forEach(value => {
                    table += `<td>${value}</td>`;
                });
                table += '</tr>';
            }

            // CSV row parser function
            function parseCSVRow(row) {
                const values = [];
                let insideQuotes = false;
                let currentValue = '';

                for (let char of row) {
                    if (char === '"') {
                        insideQuotes = !insideQuotes;
                    } else if (char === ',' && !insideQuotes) {
                        values.push(currentValue.trim());
                        currentValue = '';
                    } else {
                        currentValue += char;
                    }
                }

                // Add the last value
                values.push(currentValue.trim());

                return values;
            }


            table += '</tbody>';

            // Append table to the HTML document
            document.getElementById('myTable').innerHTML = table;
        })
        .catch(error => console.error('Error fetching CSV:', error));
});

