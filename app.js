(function(document, Tabletop, location) {
  "use strict";

  function randomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function tablestuff(data) {
    var button = document.getElementById("generate"),
        text = document.getElementById("phrase");

    function generate() {
      var phrase = randomArrayElement(data.Phrase.elements).Phrase,
          replacer = function(match, key) {
            if(key) {
              var column = key, row;
              if(key.indexOf("-") > -1) {
                var tmp = key.split("-");
                key = tmp[0];
                row = randomArrayElement(data[key].elements);
                var result = row[tmp[1]];
                if(result && result.length > 0) {
                  return result;
                } else {
                  column = key;
                }
              } else {
                row = randomArrayElement(data[key].elements);
              }
              return row[column];
            } else {
              return "ERROR";
            }
          };

      var p = phrase.replace(/\%([A-Za-z\-]+)\%/g, replacer),
          parts = p.split(" "),
          result = [],
          isA = false;
      for(var i = 0; i < parts.length; i++) {
        var clean = parts[i].replace(/\s+/, " ").replace(/\s+$/, "").replace(/^\s+/, "");
        result[i] = clean;
        if (isA && /^[aeiou]/i.test(clean)) {
          result[i - 1] = "an";
        }
        if (i > 0 && /[?!.]$/.test(result[i - 1])) {
          result[i] = capitaliseFirstLetter(result[i]);
        }
        isA = (clean.toLowerCase() === "a");
      }
      text.innerHTML = capitaliseFirstLetter(result.join(" "));
    }

    button.onclick = generate;
    generate();
  }

  var url = [
    location.protocol,
    "//",
    location.host,
    location.pathname,
    "proxy.php?url="
  ].join('');

  Tabletop.init({
    key: "19Zq00MK8IzIQfxzwl3cVXqevgv9RkhEFn9ypYpRwRkQ",
    callback: tablestuff,
    simpleSheet: false
  });
})(document, Tabletop, window.location);
