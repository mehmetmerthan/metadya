function sendEmail() {
    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
  
    var mailtoLink = "mailto:mehmetmerthann@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(/* "Name: " + firstName + " " + lastName + "\nEmail: " + email + "\nMessage: " + */ message);
  
    window.location.href = mailtoLink;
  }
  