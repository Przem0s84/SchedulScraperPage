document.addEventListener('DOMContentLoaded', function () {

    CreateTable();
    getFromApi();


});


function getFromApi() {
    const tableBody = document.querySelector("table tbody");
    const godziny = ['7:30-8:15', '8:15-9:00', '9:15-10:00', '10:00-10:45', '11:00-11:45', '11:45-12:30', '12:45-13:30', '13:30-14:15', '14:30-15:15', '15:15-16:00', '16:15-17:00', '17:00-17:45', '18:00-18:45', '18:45-19:30'];
    var select1 = document.getElementById('select1').value;
    var select2 = document.getElementById('select2').value;
    var select3 = document.getElementById('select3').value;
    var select4 = document.getElementById('select4').value;
    var select5 = document.getElementById('select5').value;

    const apiUrl = `https://schedulescraperpw.azurewebsites.net/api/Schedule?LabGropName=${select2}&ProjGroupName=${select3}&CompLabGroupName=${select4}&WeekType=${select5}&TeamName=${select1}`;

    

    
    
    
    
        fetch(apiUrl)
            .then(response => {
                
                console.log(response);
                return response.json()
            }).then(data => {
                console.log('data', data)

                var table = document.getElementById("myTable");
                var rows = table.getElementsByTagName('tr');
                console.log(rows);
                console.log("Rows lenght "+rows.length)
                

                for (var i = 1; i < rows.length; i++) {
                    
                    var row = rows[i];
                    var cells = row.getElementsByTagName("td");
                    for (var j = 0; j < cells.length; j++) {
                    
                        if (j == 0) {
                            var cell = cells[j];
                            cell.textContent = i; 
                        }

                        if (j == 1) {
                            
                            cells[j].textContent = godziny[i-1];
                        }

                        if (j > 1) {

                            
                            var selectedCell = data.find(ob => ob.dayNr == j - 1 && ob.eventLP == i);
                            if (selectedCell === undefined) { cells[j].textContent = ""; }
                            else {
                                cells[j].textContent = `${selectedCell.name} ${selectedCell.eventType} ${selectedCell.location} `
                            }



                        }

                    }
                }

                console.log("end fetch");
            })
    }


function CreateTable() {

    const tableBody = document.querySelector("table tbody");
    for (var i = 0; i < 14; i++) {
        var row = tableBody.insertRow();

        for (var j = 0; j < 7; j++) {
            
            var cell = row.insertCell();
            cell.textContent = ".";
           
            
        }
    }
}

    
