$(document).ready(function() {
    var mockData = [
        { id: 1, name: "Entry 1", datetime: "2024-07-17 10:30:00" },
        { id: 2, name: "Entry 2", datetime: "2024-07-17 11:45:00" }
    ];

    function renderTable() {
        var tableBody = $('#dataTable tbody');
        tableBody.empty();
        mockData.forEach(function(entry) {
            var row = '<tr data-id="' + entry.id + '">' +
                        '<td>' + entry.id + '</td>' +
                        '<td>' + entry.name + '</td>' +
                        '<td>' + entry.datetime + '</td>' +
                        '<td>' +
                            '<button class="editBtn">Edit</button>' +
                            '<button class="deleteBtn">Delete</button>' +
                            '<button class="saveBtn" style="display: none;">Save</button>' +
                        '</td>' +
                    '</tr>';
            tableBody.append(row);
        });
    }

    renderTable();

    $('#addEntryBtn').click(function() {
        $('#addEntryModal').toggle();
    });

    $('#sendNewEntry').click(function() {
        var newName = $('#newEntryName').val().trim();
        if (newName === '') {
            showMessage('error', 'Name cannot be empty.');
            return;
        }
        
        var newId = mockData.length + 1;
        mockData.push({ id: newId, name: newName, datetime: new Date().toLocaleString() });
        renderTable();
        $('#newEntryName').val('');
        $('#addEntryModal').hide();
        showMessage('success', 'New entry added successfully.');
    });

    $('#dataTable').on('click', '.editBtn', function() {
        var row = $(this).closest('tr');
        var nameCell = row.find('td:nth-child(2)');
        var currentName = nameCell.text();
        nameCell.empty().append('<input type="text" class="editNameInput" value="' + currentName + '">');
        $(this).hide();
        row.find('.saveBtn').show();
    });

    $('#dataTable').on('click', '.saveBtn', function() {
        var row = $(this).closest('tr');
        var id = row.data('id');
        var newName = row.find('.editNameInput').val().trim();
        if (newName === '') {
            showMessage('error', 'Name cannot be empty.');
            return;
        }
        
        var index = mockData.findIndex(function(entry) {
            return entry.id === id;
        });
        if (index !== -1) {
            mockData[index].name = newName;
            renderTable();
            showMessage('success', 'Entry updated successfully.');
        }
    });

    $('#dataTable').on('click', '.deleteBtn', function() {
        var row = $(this).closest('tr');
        var id = row.data('id');
        
        mockData = mockData.filter(function(entry) {
            return entry.id !== id;
        });
        renderTable();
        showMessage('success', 'Entry deleted successfully.');
    });

    function showMessage(type, message) {
        var messageBox = $('#messageBox');
        messageBox.empty().removeClass().addClass(type).text(message);
        setTimeout(function() {
            messageBox.empty().removeClass();
        }, 3000);
    }
});
