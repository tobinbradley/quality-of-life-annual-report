import './style.css'

// 'baker': {
//   bearing: 27,
//   center: [-0.15591514, 51.51830379],
//   zoom: 15.5,
//   pitch: 20
//   },

// https://mcmap.org/qol/embed.html?interactive=false#
// http://localhost:3000/embed.html?interactive=false#

const embedBase = "https://mcmap.org/qol/embed.html?interactive=false#"
const map = document.getElementById('map')
const sections = document.querySelectorAll(".slide")

const slideActions = {
  "intro": {
    metric: "65",
    flyto: {}
  },
  "character-1": {
    metric: "22",
    flyto: {
      bearing: 27,
      zoom: 11,
      pitch: 20
    }
  }
}


// Intersection observer for slides
// Does metric changing and zooming
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      if (slideActions[entry.target.id]) {
        // do metric
        if (slideActions[entry.target.id].metric) {
          map.src = `${embedBase}${slideActions[entry.target.id].metric}/`
        }
        // do flyto
        if (slideActions[entry.target.id].flyto) {
          map.contentWindow.postMessage(slideActions[entry.target.id].flyto, "*")
        }
      }
    }
  });
}

const observer = new IntersectionObserver(handleIntersection);
sections.forEach(section => observer.observe(section));
