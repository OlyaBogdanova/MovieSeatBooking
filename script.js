const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  //   const localStorageInfo = JSON.parse(
  //     localStorage.getItem(`selectedSeats${movieSelect.selectedIndex}`)
  //   );

  //   if (localStorageInfo) {
  //     const selectedSeats = localStorageInfo.seatsIndex;
  //     seats.forEach((seat, index) => {
  //       if (selectedSeats.indexOf(index) > -1) {
  //         seat.classList.add("selected");
  //       }
  //     });
  //   }
  populateUI();
  updateSelectedCount();
});

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem(
    `selectedSeats${movieSelect.selectedIndex}`,
    JSON.stringify({
      seatsIndex: seatsIndex,
      selectedMovieIndex: movieSelect.selectedIndex,
      selectedMoviePrice: movieSelect.value,
    })
  );
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

function populateUI() {
  const localStorageInfo = JSON.parse(
    localStorage.getItem(`selectedSeats${movieSelect.selectedIndex}`)
  );

  if (localStorageInfo !== null && localStorageInfo.seatsIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (localStorageInfo.seatsIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });

    movieSelect.selectedIndex = localStorageInfo.selectedMovieIndex;
  }
}

updateSelectedCount();
