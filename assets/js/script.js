function convertHour(hour) {
  // convert 0 - 24 hour number to string with AM or PM
  if (hour === 0) return "12AM";
  if (hour > 0 && hour < 12) return hour+"AM";
  if (hour === 12) return "12PM";
  if (hour > 12 && hour <=24 ) return (hour-12) + "PM";
}

// define div element function
function hourDiv(hour) {
  // from hour(number) get the hour div element 
  const idHour = "hour-" + hour;
  const d = $('<div>');
  d.attr("id", idHour);
  d.addClass("row time-block");

  const hourDisplayDiv = $('<div>');
  hourDisplayDiv.addClass("col-2 col-md-1 hour text-center py-3");
  hourDisplayDiv.text(convertHour(hour));

  const textArea = $('<textarea>');
  textArea.addClass("col-8 col-md-10 description");
  textArea.attr("rows", "3");

  const btn = $('<button>');
  btn.addClass("btn saveBtn col-2 col-md-1");
  btn.attr("aria-label", "save");

  const i = $('<i>');
  i.addClass("fas fa-save");
  i.attr("aria-hidden", "true");

  btn.append(i);
  d.append(hourDisplayDiv);
  d.append(textArea);
  d.append(btn);
  return d;
}

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //create element for those hourly div
  const divContainer = $('#hourContainer');
  for (let i = 9; i < 18; i++) {
    divContainer.append(hourDiv(i));
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').on('click', function() {
    localStorage.setItem(
      $(this).parent().attr("id"), // key
      $(this).siblings('textarea').val() // textarea input value
    );
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function setHourStatus() {
    const currentHour = dayjs().hour();
    $.each($('#hourContainer').children(), function(idx, hourDiv){
      const divHour = parseInt($(hourDiv).attr('id').slice(5));
      if (divHour < currentHour) {
        // set class to past
        $(hourDiv).addClass("past");
      }
      if (divHour === currentHour) {
        // set class to present
        $(hourDiv).addClass("present");
      }
      if (divHour > currentHour) {
        // set class to future
        $(hourDiv).addClass("future");
      }
    });
  }

  setTimeout(setHourStatus, 0);
  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $.each($('#hourContainer').children(), function(idx, hourDiv){
    const storageValue = localStorage.getItem($(hourDiv).attr('id'));
    $(hourDiv).children('textarea').val(storageValue);
  })
  //
  // TODO: Add code to display the current date in the header of the page.
  const today = dayjs();
  $("#currentDay").text(today.format('dddd, MMMM DD, YYYY'));
});
