interface ValidatorType {
  inputString: string;
  type?: "NRIC" | "FIN" | "BOTH";
}

export function validate({ inputString, type = "BOTH" }: ValidatorType) {
  var icArray = new Array(9);
  for (let i = 0; i < 9; i++) {
    icArray[i] = inputString.charAt(i);
  }
  icArray[1] *= 2;
  icArray[2] *= 7;
  icArray[3] *= 6;
  icArray[4] *= 5;
  icArray[5] *= 4;
  icArray[6] *= 3;
  icArray[7] *= 2;
  var weight = 0;
  for (let i = 1; i < 8; i++) {
    weight += parseInt(icArray[i]);
  }
  var offset =
    icArray[0] == "T" || icArray[0] == "G" ? 4 : icArray[0] === "M" ? 3 : 0;
  var temp = (offset + weight) % 11;
  var st = Array("J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A");
  var fg = Array("X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K");
  var theAlpha;

  if (!type || type === "BOTH") {
    if (icArray[0] == "S" || icArray[0] == "T") {
      theAlpha = st[temp];
    } else if (icArray[0] == "F" || icArray[0] == "G" || icArray[0] === "M") {
      theAlpha = fg[temp];
    }
    return icArray[8] == theAlpha;
  } else if (type === "NRIC") {
    if (icArray[0] == "S" || icArray[0] == "T") {
      theAlpha = st[temp];
    }
    return icArray[8] == theAlpha;
  } else if (type === "FIN") {
    if (icArray[0] == "F" || icArray[0] == "G" || icArray[0] === "M") {
      theAlpha = fg[temp];
    }
    return icArray[8] == theAlpha;
  }
}
