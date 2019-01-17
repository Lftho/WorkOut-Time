var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
			sumHour();
		}
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullTime"] = document.getElementById("fullTime").value;
    formData["sport"] = document.getElementById("sport").value;
    formData["date"] = document.getElementById("date").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullTime;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.sport;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.date;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = '<a onClick="onEdit(this)">Editar</a><a onClick="onDelete(this)">Deletar</a>';
}


function sumHour (){
    var oRows = document.getElementById('employeeList').getElementsByTagName('tr');
    var iRowCount = oRows.length;
    var sumHourTotal = '00:00';

for(var i = 1; i < iRowCount; i++){
	sumHourTotal = sumTime(sumHourTotal, $(oRows[i].cells[0]).text());
}

$('#total_amount').val(sumHourTotal);
}

function resetForm() {
    document.getElementById("fullTime").value = "";
    document.getElementById("sport").value = "";
    document.getElementById("date").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullTime").value = selectedRow.cells[0].innerHTML;
    document.getElementById("sport").value = selectedRow.cells[1].innerHTML;
    document.getElementById("date").value = selectedRow.cells[2].innerHTML;
	
	sumHour();

}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullTime;
    selectedRow.cells[1].innerHTML = formData.sport;
    selectedRow.cells[2].innerHTML = formData.date;

	sumHour();
}

function onDelete(td) {
    if (confirm('Você quer realmente deletar essa informação ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
	sumHour();
}
function validate() {
    isValid = true;
    if (document.getElementById("fullTime").value == "") {
        isValid = false;
        document.getElementById("fullTimeValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullTimeValidationError").classList.contains("hide"))
            document.getElementById("fullTimeValidationError").classList.add("hide");
    }
    return isValid;
}

function sumTime(time1, time2){        
    var hour=0;
    var minute=0;
    var second=0;

    var splitTime1= time1.toString().split(':');
    var splitTime2= time2.toString().split(':');

    hour = parseInt(splitTime1[0])+parseInt(splitTime2[0]);
    minute = parseInt(splitTime1[1])+parseInt(splitTime2[1]);
    hour = parseInt(hour + minute/60);
    minute = minute%60;
    /*second = parseInt(splitTime1[2])+parseInt(splitTime2[2]);
    minute = minute + second/60;
    second = second%60;*/
		
	if(hour < 10)
		hour = '0' + hour;

	if(minute < 10)
		minute = '0' + minute;
		
    return hour + ':' + minute;
}