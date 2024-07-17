var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var customerData;
var cusId;
var cTable;
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
document.addEventListener("DOMContentLoaded", function () {
  getCustomers();

  if(!isFirstLogin) introToWebsite();
  const fullScreenToggle = document.getElementById('fullScreenCusToggle');
  const followupTableContainer = document.getElementById('table-container');
  const modalDialog = document.querySelector('.modal-dialog');

  let isFullScreen = false;
  let originalModelClass = modalDialog.className;

  fullScreenToggle.addEventListener('click', function () {
    if (!isFullScreen) {

      fullScreenToggle.classList.add('exit-screen-customer');
      modalDialog.classList.add('modal-full-screen-customer');
      followupTableContainer.classList.add('full-screen-customer');
      fullScreenToggle.textContent = 'Exit Full Screen';
    } else {

      fullScreenToggle.classList.remove('exit-screen-customer');
      modalDialog.className = originalModelClass;
      followupTableContainer.classList.remove('full-screen-customer');
      fullScreenToggle.textContent = 'Toggle Full Screen';

    }
    isFullScreen = !isFullScreen;
  });
 

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
    // console.log(customerId);
    localStorage.setItem("cusid", customerId);
    generatecustomerFollowUpData();
    fetchCustomerDetails(customerId);
  });

  function fetchCustomerDetails(cId) {

    cusId = cId;
    var customerDetails = fetchCustomerByCid(cId);

    $('#customerName').val(customerDetails.
      CustomerName
    );
    $('#createdDate').val(customerDetails.createdDate);
    $('#description').val(customerDetails.description);
    // $('#domain').val(customerDetails.domain);
    $('#phoneNo').val(customerDetails.phoneNo);

   
    $('#editModal').modal();
  }


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

function  introToWebsite(params) {
  const driver = window.driver.js.driver;


  

  const driverObj = driver({
    popoverClass: 'driverjs-theme',
    showProgress: true,
    steps: [
      { element: '#fullScreenCusToggle', popover: { title: 'Full Screen', description: 'Click to enter the full screen' } },
      { element: '.edit-icon', popover: { title: 'Edit Customer', description: 'Click to edit the customer details' } },
      { element: '.view-customers', popover: { title: 'View Customers', description: 'Click to view the customer details' } },
      { element: '.add-customers', popover: { title: 'Add Customers', description: 'Click to add the new customer' } },
    ]
  });
  
  driverObj.drive();
  
}