var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var customerData;
var cusId;
var cTable;
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
document.addEventListener("DOMContentLoaded", function () {
  getCustomers();

});

function getCustomers() {
  var uid = parseInt(localStorage.getItem("userId"));

  console.log(typeof (uid));

  $.ajax({
    url: `${apiUrl}Customer/GetCustomer/` + uid,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
      customerData = result;
      // generateFields(result,p);
      createTable(result)
    },
    error: function (error) {
      console.log(error);
      alert("Error .", error);
    },
  });
}

function createTable(data) {
  if ($.fn.DataTable.isDataTable("#customers-table")) {
    var table = $("#customers-table").DataTable();
    table.clear().draw();
    table.rows.add(data).draw();
    cTable=$("#customers-table").DataTable();
  }
  else{

    cTable = $('#customers-table').DataTable({
      data: data,
      columns: [
        { data: 'Username', title: 'Username' },
        { data: 'ManagerName', title: 'Manager Name' },
        { data: 'CoordinatorName', title: 'Coordinator Name' },
        { data: 'ExecutiveName', title: 'Executive Name' },
        { data: 'CustomerName', title: 'Customer Name' },
        {data: 'dueCount', title: 'DueCount'},
        {data: 'ScheduledCount', title: 'ScheduledCount'},
       
        {
          data: null,
          title: 'Actions',
          render: function (data, type, row) {
            if (EditCustomer) {

              return '<i class="fa fa-pencil edit-icon" data-id="' + row.cid + '" style="cursor:pointer;"></i>';
            }
            else{
              return '';
            }
          },
          orderable: false
        }
      ],
      rowCallback: function (row, data, index) {
  
        $(row).find('td:eq(5)').css('color', 'red');
        $(row).find('td:eq(6)').css('color', 'orange');
  
      }
    });
  }
  $(".custom-loader").css("display", "none");

  $('#customers-table').on('click', '.edit-icon', function () {
    var customerId = $(this).data('id');
    console.log(customerId);
    localStorage.setItem("cusid", customerId);
    generatecustomerFollowUpData();
    fetchCustomerDetails(customerId);
  });

  function fetchCustomerDetails(cId) {

    cusId = cId;
    var customerDetails = fetchCustomerByCid(cId);
    console.log(customerDetails, cId);
    $('#customerName').val(customerDetails.
      CustomerName
    );
    $('#createdDate').val(customerDetails.createdDate);
    $('#description').val(customerDetails.description);
    // $('#domain').val(customerDetails.domain);
    $('#phoneNo').val(customerDetails.phoneNo);

    // Show modal
    // jQuery.noConflict();
    $('#editModal').modal();
    // $('#editModal').modal('show');
  }
  console.log("kl");

  $('#addFollowUpBtn').on('click', function () {
    $('#addFollowUpModal').modal();
  });
  
}
function fetchCustomerByCid(cid) {
  return customerData.find(function (customer) {
    return customer.cid === cid;
  });
}



function getCustomerData(params) {
  return customerData.find(function (customer) {
    return customer.cid === cusId;
  });


}
