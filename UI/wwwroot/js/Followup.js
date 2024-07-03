var cuId, fid;
var followupData;
document.addEventListener('DOMContentLoaded', function () {
  console.log(hasSpecificPrivilege);
  getFolloups();
  const editDateInputs = document.getElementsByClassName('date');
  const editTimeInputs = document.getElementsByClassName('time');

  function setMinDateTime() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const timeNow = now.toTimeString().split(' ')[0].slice(0, 5);

    Array.from(editDateInputs).forEach(input => {
      input.setAttribute('min', today);

      input.addEventListener('input', function () {
        if (input.value === today) {
          Array.from(editTimeInputs).forEach(timeInput => {
            timeInput.setAttribute('min', timeNow);
          });
        } else {
          Array.from(editTimeInputs).forEach(timeInput => {
            timeInput.removeAttribute('min');
          });
        }
      });
    });

    Array.from(editTimeInputs).forEach(input => {
      input.addEventListener('focus', function () {
        if (Array.from(editDateInputs).some(dateInput => dateInput.value === today)) {
          input.setAttribute('min', timeNow);
        } else {
          input.removeAttribute('min');
        }
      });
    });
  }

  setMinDateTime();
});

function getFolloups() {
  var uid = parseInt(localStorage.getItem("userId"));

  console.log(typeof (uid));

  $.ajax({
    url: `${apiUrl}FollowUps/GetFollowUps/` + uid,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
      followupData = result;
      var cusid = parseInt(localStorage.getItem("cusid"));
      console.log(cusid);
      if (cusid) {
        generatecustomerFollowUpData();

        getCustomers();
      }
      // generateFields(result,p);


    },
    error: function (error) {
      console.log(error);
      alert("Error .", error);
    },
  });
}

function createFollowupTable(data) {
  if ($.fn.DataTable.isDataTable("#follow-up")) {
    var table = $("#follow-up").DataTable();
    table.clear().draw();
    table.rows.add(data).draw();
  }
  else {
    $('#follow-up').DataTable({
      data: data,
      columns: [
        { data: 'CreatedByName', title: 'Created By' },

        // {
        //   data: 'FollowUpDate', title: 'Follow-Up Date'
                  

        // },
        {

         
          data: 'FollowUpDate',
          title: 'FollowUpDate',
          render: function (data, type, row) {
                 console.log(data);
            var followUpDate = new Date(data);
            console.log(followUpDate);
          
            followUpDate.setDate(followUpDate.getDate() + 1);
          
            var formattedDate = followUpDate.toISOString().split('T')[0];
            console.log(formattedDate);
            return formattedDate
  
          },
        },
        { data: 'FollowUpTime', title: 'Follow-Up Time' },
        { data: 'Note', title: 'Note' },
        { data: 'ReviewerName', title: 'Reviewer Name' },
        { data: 'Status', title: 'Status' },
        { data: 'CreatedOn', title: 'Created On' },
        {
          data: null,
          title: 'Actions',
          render: function (data, type, row) {

            if (hasSpecificPrivilege) {

              return '<i class="fa fa-pencil edit-icon" data-id="' + row.fid + '" style="cursor:pointer;"></i>';
            }
            else {
              return ''; // Return empty string if no privilege
            }
          },
          orderable: false
        }
      ],
      // "order": [], // Remove default sorting
      // "paging": true, // Enable pagination
      // "lengthChange": false, // Disable page length change
      // "searching": true, // Enable search box
      // "info": true, 
      // "autoWidth": true, 
      // "responsive": true, 
      // "language": {
      //     "emptyTable": "No data available in table" // Customize empty table message
      // }
    });
  }


  $('#follow-up').on('click', '.edit-icon', function () {
    // jQuery.noConflict();
    // $('#EditFollowUpModal').modal('show');
    $('#EditFollowUpModal').modal();
    var followupId = $(this).data('id');
    fid = followupId
    console.log(followupId);
    fetchFollowupDetails(fid);
  });


  function fetchFollowupDetails(fId) {
    var followUpDetails = fetchFollowupByfid(fId);
    console.log(followUpDetails, fId);

    $('#old-note').val(followUpDetails.Note);

    var followUpDate = new Date(followUpDetails.FollowUpDate);
    console.log(followUpDate);

    followUpDate.setDate(followUpDate.getDate() + 1);

    var formattedDate = followUpDate.toISOString().split('T')[0];
    console.log(formattedDate);


    $('#edit_date').val(formattedDate);
    $('#edit_time').val(followUpDetails.FollowUpTime);
  }


  function fetchFollowupByfid(cid) {
    return followupData.find(function (customer) {
      return customer.fid === cid;
    });
  }

  $(".custom-loader").css("display", "none");
}

function generatecustomerFollowUpData(params) {
  var cuId = parseInt(localStorage.getItem("cusid"));
  console.log(cuId);

  const recordsForCustomer = fetchRecordsByCustomerId(cuId);
  createFollowupTable(recordsForCustomer);
  console.log(recordsForCustomer);

}
function generatecustomerDetails(params) {
  var customerData = getCustomerData();
  console.log(customerData.ExecutiveName);
  cuId = customerData.cid;


  var reviewerField = document.getElementById('reviewer');
  reviewerField.value = customerData.ExecutiveName;



}
function fetchRecordsByCustomerId(customerId) {
  return followupData.filter(record => record.CustomerId === customerId);
}


function AddFolloups() {
  // var customerData=getCustomerData();
  var uid = parseInt(localStorage.getItem("userId"));

  // var reviewer = document.getElementById('reviewer').value;
  var note = document.getElementById('note').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  console.log(typeof (time));
  var followUpDetails = {
    uId: uid,
    cId: cuId,
    reviewer: reviewer,
    note: note,
    FollowUpDate: date,
    time: time
  };
  if (!date || !time || !note) {
    alert("fields cannot be empty.");
    return;
  }

  const buttons = document.getElementById("saveFollowUpBtn")


  buttons.setAttribute("data-dismiss", "modal");
  console.log(followUpDetails);


  $.ajax({
    url: `${apiUrl}FollowUps/AddFollowUps/`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(followUpDetails),
    type: "POST",
    success: function (result) {
      console.log(result);

      getFolloups();

      // $('#EditFollowUpModal').modal('hide');
    },
    error: function (error) {
      console.log(error);
      alert("Error .", error);
    },
  });
}



function EditFollowUps() {
  var uid = parseInt(localStorage.getItem("userId"));

  var newNote = document.getElementById('new-note').value;
  var oldNote = document.getElementById('old-note').value;
  var note = newNote ? newNote : oldNote;
  var date = document.getElementById('edit_date').value;
  var time = document.getElementById('edit_time').value;
  var status = document.getElementById('done').checked; // Get the value of the checkbox
  if (status) status = 1;
  else status = 0;
  console.log(status);
  if (!date || !time) {
    alert("Date and time fields cannot be empty.");
    return;
  }
  const buttons = document.getElementById("saveEditFollowUpBtn")


  buttons.setAttribute("data-dismiss", "modal");
  var followUpDetails = {
    uId: uid,
    fId: fid,
    note: note,
    FollowUpDate: date,
    time: time,
    status: status
  };

  console.log(followUpDetails);

  $.ajax({
    url: `${apiUrl}FollowUps/EditFollowUps/`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(followUpDetails),
    type: "POST",
    success: function (result) {
      console.log(result);




      getFolloups()

    },
    error: function (error) {
      console.log(error);
      alert("Error.", error);
    },
  });
}
