const domain = window.location.origin

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
]
const dow = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT"
]

function focusMonth(id){
  console.log(id);
  var tmp = id.split("_")
  console.log("month: " + tmp[1] + "\nday: " + parseInt(tmp[0]) + "\nyear: " + tmp[2]);
  drawMonth(tmp[1]);
}

function strDateFormatter(day){
  // Formats the date to always be two chars long
  var retString;
  if(day == "0"){
     retString = "";
  }else if (String(day).length < 2){
    retString = "0" + String(day);
  }else{
    retString = String(day);
  }

  return retString;
}

function drawMonth(data, outerElem){
  // Creates the necessary div6 tags to display a month
  // TODO: Clean up this mess
  var month = outerElem.id; 
  var year = document.getElementById("year").innerText;
  var monthGrid = document.createElement("div");
  monthGrid.classList.add("monthGrid");
  monthGrid.id = "monthGrid";
  outerElem.appendChild(monthGrid);

  // Add the days of the week (sat, sun, mon, etc)
  for (let i = 0; i < dow.length; i++){
    let elem = document.createElement("div");
    elem.innerText = dow[i];
    elem.classList.add("day");
    monthGrid.appendChild(elem);
  } 

  // Add the actual calendar days
  for (let i = 0; i < 5; i++){
    for (let j = 0; j < 7; j++){
      let dayTxt = strDateFormatter(data[i][j]);
      let elem = document.createElement("div");
      elem.innerText = dayTxt;
      elem.classList.add("day");
      elem.id = dayTxt + "_" + month + "_" + year;
      if (dayTxt != ""){
        elem.addEventListener("click", function(){focusMonth(elem.id)}, false);
      }
      monthGrid.appendChild(elem);
    }
  }
}

function drawYear(data){
  var appElem = document.getElementById("app");

  for (var i = 0; i < 12; i++){
    let monthName = monthNames[i];
    let month = document.createElement("div");
    month.id = monthName;
    month.classList.add("month");
    month.classList.add("zoom");
    appElem.appendChild(month);

    let monthNameElem = document.createElement("h2");
    monthNameElem.innerText = monthName;
    month.appendChild(monthNameElem);


    drawMonth(data[monthName], month);
  }

}

function getCalData(year){
  fetch(domain + "/api/getcal?" + new URLSearchParams({"year": year}))
    .then(response => response.json())
    .then(data => {
      drawYear(data);
    });
}

function drawCalendar() {
  let year = new Date().getFullYear();
  document.getElementById("year").innerText = year;
  getCalData(year);
}
window.onload = drawCalendar;
