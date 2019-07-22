function getResources(path, dataset, callback) {
  var request = $.ajax('http://localhost:8888' + path);
  request.done(function(data) {
    dataset = dataset.concat(data.objects);
    if (data.meta.next) {
      getResources(data.meta.next, dataset, callback);
    } else {
      callback(dataset);
    }
  })
}

function loadUserTable(data) {
  $('#user-table').DataTable( {
    "pagingType": "full_numbers",
    "language": {
      "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
    },
    data: data,
    columns: [
      { data: 'username' },
      { data: 'bill_participations' },
      { data: 'votes_count' },
      { data: 'comments_count' },
      { data: 'additive_count' },
      { data: 'modifier_count' },
      { data: 'supress_count' },
    ],
    dom: 'Bfrtip',
    buttons: [
      'csv', 'excel'
    ]
  });
}

function loadBillTable(data) {
  $('#bill-table').DataTable( {
    "pagingType": "full_numbers",
    "language": {
      "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
    },
    data: data,
    columns: [
      { data: 'title' },
      { data: 'participants_count' },
      { data: 'votes_count' },
      { data: 'comments_count' },
      { data: 'amendments_count' },
      { data: 'additive_amendments_count' },
      { data: 'modifier_amendments_count' },
      { data: 'supress_amendments_count' },
    ],
    dom: 'Bfrtip',
    buttons: [
      'csv', 'excel'
    ]
  });
}

getResources('/api/v1/user/', [], loadUserTable);
getResources('/api/v1/bill/', [], loadBillTable);