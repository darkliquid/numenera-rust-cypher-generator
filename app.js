(function(document, Tabletop, location) {
  "use strict";

  function uniques(arr) {
    var a = [];
    for (var i=0, l=arr.length; i<l; i++) {
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '') {
        a.push(arr[i]);
      }
    }
    return a;
  }

  function arrayToSentence(arr) {
    if (arr.length === 1) {
      return arr[0];
    }
    return arr.slice(0, arr.length - 1).join(', ') + ", and " + arr.slice(-1);
  }

  function randomNum(limit) {
    return Math.floor(Math.random() * limit);
  }

  function randomArrayElement(arr) {
    return arr[randomNum(arr.length)];
  }

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function tablestuff(data) {
    var button = document.getElementById("generate"),
        descEl = document.getElementById("description"),
        abilityEl = document.getElementById("ability"),
        opsEl = document.getElementById("operation"),
        levEl = document.getElementById("level-target");

    function generate() {
      var materials = [], shapes = [], looks = [], num;

      // Materials
      while (true) {
        materials.push(randomArrayElement(data.Appearance.elements).Material);
        num = randomNum(20);
        if (num != 20) {
          break;
        }
      }
      materials = uniques(materials);

      // Shapes
      while (true) {
        shapes.push(randomArrayElement(data.Appearance.elements).Shape);
        num = randomNum(20);
        if (num != 20) {
          break;
        }
      }
      shapes = uniques(shapes);

      // Look & Feels
      while (true) {
        looks.push(randomArrayElement(data.Appearance.elements)["Look & Feel"]);
        num = randomNum(20);
        if (num != 20) {
          break;
        }
      }
      looks = uniques(looks);

      var type = randomArrayElement(['Self', 'Area', 'Other']),
          level = randomNum(6)+2,
          description = [
            'a',
            arrayToSentence(looks).toLowerCase(),
            'object made of',
            arrayToSentence(materials).toLowerCase(),
            'shaped like',
            arrayToSentence(shapes).toLowerCase()
          ].join(' '),
          ability = randomArrayElement(data.Abilities.elements)[type],
          operation = randomArrayElement(data.Operation.elements)[type];

      levEl.innerHTML = [
        "A level",
        level,
        "rust cypher that targets",
        { 'Self': 'yourself', 'Area': 'an area', 'Other': 'anything'}[type]
      ].join(' ');

      var parts = description.split(" "),
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
      descEl.innerHTML = capitaliseFirstLetter(result.join(" "));
      abilityEl.innerHTML = ability;
      opsEl.innerHTML = operation;
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
    key: "1ubw8FovP_gHQdMX5XGJFAW1krRLClddZFy7K7BYt1F0",
    callback: tablestuff,
    simpleSheet: false
  });
})(document, Tabletop, window.location);
