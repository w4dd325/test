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

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }