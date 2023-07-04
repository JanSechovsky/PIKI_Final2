$(document).ready(function() {
    // Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheets spreadsheet ID
    const spreadsheetId = '1BI2tYxVhAZZD70HV2O-A3WEYaH0b_cM8U1LdJii4xCc';
  
    // Handle form submission
    $('#myForm').submit(function(e) {
      e.preventDefault();
  
      // Get form data
      const formData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        firmName: $('#firmName').val(),
        brandName: $('#brandName').val(),
        phoneNumber: $('#phoneNumber').val(),
        email: $('#email').val(),
        ic: $('#ic').val(),
        dic: $('#dic').val(),
        webUrl: $('#webUrl').val(),
        facebookUrl: $('#facebookUrl').val(),
        standSize: $('#standSize').val(),
        truckSize: $('#truckSize').val(),
        plugInVoltage: $('#plugInVoltage').val(),
        powerWithdrawal: $('#powerWithdrawal').val(),
        notes: $('#notes').val()
      };
  
      // Send form data to Google Sheets using AJAX
      $.ajax({
        url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
        type: 'POST',
        data: JSON.stringify({
          values: [Object.values(formData)]
        }),
        headers: {
          'Authorization': 'Bearer d60fab5af07c8c39f9f30e29ab41345ac7c4f340',
          'Content-Type': 'application/json'
        },
        success: function(response) {
          // Handle success
          alert('Form submitted successfully!');
          // Clear form fields
          $('#myForm')[0].reset();
        },
        error: function(error) {
          // Handle error
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    });
  });
  
  $('#myForm').submit(function(e) {
    e.preventDefault();
  
    const formData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        firmName: $('#firmName').val(),
        brandName: $('#brandName').val(),
        phoneNumber: $('#phoneNumber').val(),
        email: $('#email').val(),
        ic: $('#ic').val(),
        dic: $('#dic').val(),
        webUrl: $('#webUrl').val(),
        facebookUrl: $('#facebookUrl').val(),
        standSize: $('#standSize').val(),
        truckSize: $('#truckSize').val(),
        plugInVoltage: $('#plugInVoltage').val(),
        powerWithdrawal: $('#powerWithdrawal').val(),
        notes: $('#notes').val()
    };
  
    const chunks = Object.entries(formData).reduce((result, [key, value]) => {
      const lastChunk = result[result.length - 1];
      if (lastChunk.length < 300) {
        lastChunk.push({ [key]: value });
      } else {
        result.push([{ [key]: value }]);
      }
      return result;
    }, [[]]);
  
    const sendChunk = (index) => {
      if (index >= chunks.length) {
        // All chunks have been sent successfully
        alert('Form submitted successfully!');
        $('#myForm')[0].reset();
        return;
      }
  
      $.ajax({
        url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
        type: 'POST',
        data: JSON.stringify({
          values: chunks[index]
        }),
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          'Content-Type': 'application/json'
        },
        success: function(response) {
          // Move to the next chunk
          sendChunk(index + 1);
        },
        error: function(error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    };
  
    sendChunk(0);
  });