// The Qol Embed map takes two GET params set on initial page load:
//   * interactive: sets whether the map is interactive or not
//   * flyto: base64 encoding of MapLibre GL flyTo JSON
// It takes hash arguments for the metric and selected in the form of
//   * <metric>/<selected,selected,selected,...>

let embedBase = "https://mcmap.org/qol/embed.html?flyto="
//let embedBase = "http://localhost:3000/embed.html?flyto="
const map = document.getElementById('map')
const sections = document.querySelectorAll(".slide")
let firstRun = true


// Intersection observer for slides
// Does metric changing and zooming
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      history.replaceState({}, "", `#${entry.target.id}`)
      if (slideActions[entry.target.id]) {
        // handle first run flyto
        if (firstRun && slideActions[entry.target.id].flyto) {
          firstRun = false
          embedBase += window.btoa(JSON.stringify(slideActions[entry.target.id].flyto))
        }
        // do metric
        if (slideActions[entry.target.id].metric) {
          map.src = `${embedBase}#${slideActions[entry.target.id].metric}/`
        }
        // do flyto
        if (slideActions[entry.target.id].flyto) {
          map.contentWindow.postMessage(slideActions[entry.target.id].flyto, "*")
        }
      }
    }
  })
}

const observer = new IntersectionObserver(handleIntersection)
sections.forEach(section => observer.observe(section))

// slides
const slideActions = {
  intro: {
    metric: "47",
    flyto: {}
  },
  "character-1": {
    metric: "47",
    flyto: {
      bearing: 10,
      zoom: 9.8,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "character-2": {
    metric: "11",
    flyto: {
      bearing: 10,
      zoom: 9.8,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "character-3": {
    metric: "18",
    flyto: {
      bearing: 350,
      zoom: 9.8,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "character-4": {
    metric: "14",
    flyto: {
      bearing: 30,
      zoom: 9.8,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "economy-1": {
    metric: "75",
    flyto: {
      bearing: 30,
      zoom: 9.8,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "economy-2": {
    metric: "41",
    flyto: {}
  },
  "economy-3": {
    metric: "88",
    flyto: {
      bearing: 10,
      zoom: 9.4,
      pitch: 25,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "education-1": {
    metric: "20",
    flyto: {
      bearing: 10,
      zoom: 9.4,
      pitch: 25,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "education-3": {
    metric: "66",
    flyto: {
      bearing: 10,
      zoom: 9.4,
      pitch: 25,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "education-4": {
    metric: "62",
    flyto: {
      bearing: 10,
      zoom: 9.4,
      pitch: 25,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "engagement-1": {
    metric: "52",
    flyto: {
      bearing: 345,
      zoom: 9.4,
      pitch: 28,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "environment-1": {
    metric: "27",
    flyto: {
      bearing: 10,
      zoom: 9.4,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "environment-2": {
    metric: "24",
    flyto: {}
  },
  "environment-3": {
    metric: "25",
    flyto: {
      bearing: 30,
      zoom: 9.8,
      pitch: 40,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "health-1": {
    metric: "56",
    flyto: {
      bearing: 10,
      zoom: 9.5,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "health-2": {
    metric: "46",
    flyto: {}
  },
  "health-5": {
    metric: "28",
    flyto: {}
  },
  "housing-1": {
    metric: "76",
    flyto: {
      bearing: 10,
      zoom: 9.5,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "housing-3": {
    metric: "8",
    flyto: {}
  },
  "housing-5": {
    metric: "30",
    flyto: {
      bearing: 10,
      zoom: 9.5,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  "safety-1": {
    metric: "59",
    flyto: {}
  },
  "safety-2": {
    metric: "58",
    flyto: {}
  },
  "transportation-1": {
    metric: "44",
    flyto: {}
  },
  "transportation-3": {
    metric: "33",
    flyto: {
      bearing: 10,
      zoom: 9.5,
      pitch: 30,
      speed: 0.3,
      center: [-80.843, 35.227]
    }
  },
  outro: {
    metric: "33",
    flyto: {}
  }
}
