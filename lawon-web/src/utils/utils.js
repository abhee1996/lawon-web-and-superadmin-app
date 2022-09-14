import moment from "moment";

export var currentLocation = null;

export const commonFunctions = {
  validatePassword(Password) {
    var objValidator = {};
    var upperCaseReg = /(?=.*[A-Z])/;
    var lowerCaseReg = /(?=.*[a-z])/;
    var digitReg = /(?=.*\d)/;
    var specialReg = /[!@#$%^&*(),.?":{}|<>]/;

    var isSpecialReg = specialReg.test(Password);
    var isDigitReg = digitReg.test(Password);
    var isUpperCaseReg = upperCaseReg.test(Password);
    var isLowerCaseReg = lowerCaseReg.test(Password);

    if (isUpperCaseReg) {
      objValidator.isUppercase = "green";
    } else {
      objValidator.isUppercase = "red";
    }

    if (isLowerCaseReg) {
      objValidator.isLowercase = "green";
    } else {
      objValidator.isLowercase = "red";
    }

    if (Password.length < 8) {
      objValidator.isLength = "red";
    } else {
      objValidator.isLength = "green";
    }

    if (isDigitReg) {
      objValidator.isDigit = "green";
    } else {
      objValidator.isDigit = "red";
    }

    if (isSpecialReg) {
      objValidator.isSpecial = "green";
    } else {
      objValidator.isSpecial = "red";
    }

    return objValidator;
  },

  validateEmail(Email) {
    var emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var isEmailValid = emailReg.test(Email);
    if (isEmailValid) {
      return true;
    } else {
      return false;
    }
  },

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        currentLocation = pos;
      });
    }
  },

  // getTimeInterval() {
  //   var quarterHours = ["00", "15", "30", "45"];
  //   var times = [];
  //   for(var i = 0; i < 24; i++){
  //     for(var j = 0; j < 4; j++){
  //       var time = i + ":" + quarterHours[j];
  //       if(i < 10){
  //         time = "0" + time;
  //       }
  //       times.push(time);
  //     }
  //   }
  //   console.log('interval', times);
  // },

  getStars(rating) {
    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];

    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
      output.push(
        '<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;'
      );

    // If there is a half a star, append it
    if (i == 0.5)
      output.push(
        '<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;'
      );

    // Fill the empty stars
    for (let i = 5 - rating; i >= 1; i--)
      output.push(
        '<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;'
      );

    return output.join("");
  },

  getTimeInterval() {
    let start;
    let startTime = moment("08:00", "HH:mm");
    const endTime = moment("24:00", "HH:mm");
    const timeInterval = [];
    for (
      start = startTime;
      start < endTime;
      startTime = start.add(15, "minutes")
    ) {
      timeInterval.push(start.format("HH:mm"));
    }

    return timeInterval;
  }
};

export const getTotal = ({
  legalFee = 0,
  vatTax = 0,
  estimatedDisbursements = 0,
  other = 0
}) =>
  parseFloat(legalFee) +
  getVat({ legalFee, vatTax }) +
  parseFloat(estimatedDisbursements) +
  parseFloat(other);

export const getVat = ({ legalFee = 0, vatTax = 0 }) =>
  (legalFee * vatTax) / 100;

export const getTotalPrice = ({
  legalFee = 0,
  vatTax = 0,
  estimatedDisbursements = 0,
  other = 0
}) => {
  return (
    parseFloat(legalFee) +
    parseFloat(vatTax) +
    parseFloat(estimatedDisbursements) +
    parseFloat(other)
  )
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
