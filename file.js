window.onload = () => {
    const apiUrl = "https://schedulescraperpw.azurewebsites.net/api/Schedule?LabGropName=L04&ProjGroupName=P03&CompLabGroupName=K03&WeekType=N&TeamName=13K2";
    const tableBody = document.querySelector("table tbody");
    const godziny = ['7:30-8:15','8:15-9:00','9:15-10:00','10:00-10:45','11:00-11:45','11:45-12:30','12:45-13:30','13:30-14:15','14:30-15:15','15:15-16:00','16:15-17:00','17:00-17:45','18:00-18:45','18:45-19:30'];
    
    fetch(apiUrl)
        .then(response => {
            console.log(response);
            return response.json()
        }).then(data => {
            console.log('data', data)
            
            
            
            for (var i = 0; i < 14; i++) {
                var row = tableBody.insertRow();
                
                for (var j = 0; j < 7; j++) {
                    if (j == 0) {
                        var cell = row.insertCell();
                        cell.textContent = i+1;
                    }
                        
                    if (j == 1) {
                        var cell = row.insertCell();
                        cell.textContent = godziny[i];
                    }
                    
                    if (j > 1) {
                        
                        var cell = row.insertCell();
                        var selectedCell = data.find(ob => ob.dayNr == j - 1 && ob.eventLP == i + 1);
                        if (selectedCell === undefined) { cell.textContent = ""; }
                        else {
                            cell.textContent = `${selectedCell.name} ${selectedCell.eventType} ${selectedCell.location} `}
                        
                       
                        
                    }
                  
                }
              }
    
        })
    
}