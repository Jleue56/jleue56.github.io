const uci = document.querySelector("#uci");
const petr = document.querySelector(".petr");
uci.addEventListener("mouseenter", () => {
  console.log("hover");
  petr.classList.add("hover");
});
uci.addEventListener("mouseleave", () => {
  console.log("leave");
  petr.classList.remove("hover");
});

const contactLink = document.querySelector(".contact-btn");
const contactLinks = document.querySelectorAll(".contact-btn");

contactLinks.forEach((link) => {
  link.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("no-scroll");
  });
});

const dialog = document.querySelector("#dialog");
// contactLink.addEventListener("click", () => {
//   console.log("clicked");
//   dialog.showModal();
//   document.body.classList.add("no-scroll");
// });

const mailBtn = document.querySelector("#mail-btn");
mailBtn.addEventListener("click", () => {
  dialog.showModal();
  document.body.classList.add("no-scroll");
});

const closeModal = document.querySelector(".x");
closeModal.addEventListener("click", () => {
  document.body.classList.remove("no-scroll");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && dialog.open) {
    // Remove the no-scroll class from body
    document.body.classList.remove("no-scroll");
  }
});

const descriptions = [
  "Tech Enthusiast",
  "Recent Graduate",
  "Fitness Fanatic",
  "Coffee Lover",
];

new TypeIt("#hero-header", {
  strings: "Hello World!",
  speed: 75,
  waitUntilVisible: true,
  lifeLike: true,
}).go();

new TypeIt("#my-title", {
  speed: 50,
  deleteSpeed: 25,
  cursor: false,
})
  .type("Tech Enthusiast")
  .pause(1000)
  .delete()
  .type("Recent Graduate")
  .pause(1000)
  .delete()
  .type("Fitness Fanatic")
  .pause(1000)
  .delete()
  .type("Software Engineer")
  .pause(750)
  .go();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    fetch("https://formspree.io/f/xleqbvbp", {
      method: "POST",
      body: new FormData(document.getElementById("contact-form")),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form submitted successfully!");
          document.getElementById("contact-form").reset();
          dialog.close();
          document.body.classList.remove("no-scroll");

          // Show the success message
          var successMessage = document.getElementById("successMessage");
          successMessage.classList.add("show");

          // Hide the message after 3 seconds
          setTimeout(function () {
            successMessage.classList.remove("show");
          }, 3000);

          // Handle success
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Handle error
      });
  });

function debounceImmediate(func, wait) {
  var timeout,
    executed = false;

  return function () {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!executed) {
        func.apply(context, args);
      }
      executed = false;
    };

    var callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
      executed = true;
    }
  };
}

let burger = document.getElementById("burger"),
  nav = document.getElementById("main-nav"),
  mobNav = document.querySelector(".mobile-nav");
// const logo = document.querySelector(".logo");

var links = nav.getElementsByTagName("a");
let toggleFunction = debounceImmediate(function () {
  burger.classList.toggle("is-open");
  toggleMobileNav();
}, 450);

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    // nav.classList.remove("is-open");
    // mobNav.classList.remove("is-open");
    toggleFunction();
    // burger.classList.toggle("is-open");
  });
}

burger.addEventListener("click", toggleFunction);

function toggleMobileNav() {
  if (nav.classList.contains("is-open")) {
    // If active, remove the class without transition
    nav.style.transition = "none";
    nav.classList.remove("is-open");
    mobNav.classList.remove("is-open");
  } else {
    // If not active, add transition and then the class
    nav.style.transition = "transition: all 0.375s"; // Adjust this to your desired transition
    nav.classList.add("is-open");
    mobNav.classList.add("is-open");
  }
}

// Make a GET request to the endpoint
fetch("https://jakeleueserver.xyz/steam")
  .then((response) => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error("Failed to retrieve data.");
    }
    // Parse the JSON response
    return response.json();
  })
  .then((jsonData) => {
    // Access the JSON data
    let gamesData = jsonData.response.games;
    console.log(gamesData);
    // You can manipulate or use the JSON data here as needed

    const contentWrapper = document.querySelector(".content-wrapper");

    // Loop through each game in the array
    gamesData.forEach((gameData) => {
      // Create a new .news-card element
      const cardElement = document.createElement("div");
      cardElement.classList.add("news-card");

      let imageUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameData.appid}/library_hero.jpg`;
      let steamPage = `https://store.steampowered.com/app/${gameData.appid}/`;
      // Construct the HTML content for the .news-card element
      cardElement.innerHTML = `
    <img src="${imageUrl}" alt="" class="news-card__image" />
    <div class="news-card__text-wrapper">
      <h2 class="news-card__title">${gameData.name}</h2>
      <div class="news-card__details-wrapper">
        <p class="news-card__excerpt">${gameData.playtime_2weeks} minutes played the past 2 weeks</p>
        <a href="${steamPage}" target = "_blank" class="news-card__read-more">Steam page <i class="fas fa-long-arrow-alt-right"></i></a>
      </div>
    </div>
  `;

      // Append the created .news-card element to the .content-wrapper
      contentWrapper.appendChild(cardElement);
    });
    var newsCards = document.querySelectorAll(".news-card");

    // Function to add the 'active' class
    function toggleCard() {
      if (this.classList.contains("tapped")) {
        this.classList.remove("tapped");
      } else {
        this.classList.add("tapped");
      }
    }

    // Add event listeners for each news card
    newsCards.forEach(function (card) {
      card.addEventListener("touchstart", toggleCard);
    });
  })
  .catch((error) => {
    // Handle errors
    console.error("Error:", error.message);
  });
