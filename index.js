// - A `form`, including a "text" `input` and a "submit" `input`, that allows users to submit (not save, just add to the frontend) a review of that film. On submission the input should clear.
// - A `ul` underneath that `form` that should contain the submitted reviews of each film.

// - Use the `form`, below the movie information, to submit a review. Each review should be a new `li`, with the selected film's title (in bold) and a review body (not bold).

const movieDirectory = async () => {
    try {
        const res = await axios.get("https://ghibliapi.herokuapp.com/films/");
        movieList(res);
    }
    catch (err) {
        console.log("uh oh!")
    }
}


// `select` box that contains the title of each movie, as well as a default blank selection
const movieList = (res) => {
    res.data.forEach(movie => {
        const select = document.querySelector("select");
        const option = document.createElement("option");
        option.value = movie.id;
        option.textContent = movie.title;
        select.appendChild(option);
    });
}

// select a specific film and display the title, release year, description. When a different film is selected, the information is replaced.
const movieSelection = async (e) => {
    const blank = document.querySelector("#blank");
    const movieTitle = document.querySelector("#movie-title");
    const releaseYear = document.querySelector("#release-year");
    const description = document.querySelector("#description");
    try {
        const res = await axios.get(`https://ghibliapi.herokuapp.com/films/${e.target.value}`);
        movieTitle.textContent = res.data.title
        releaseYear.textContent = res.data.release_date
        description.textContent = res.data.description
        blank.selected = "selected";
        debugger
    }
    catch (err) {
        console.log("can not compute!")
    }
}

const displayInfo = document.querySelector("#display-info");
displayInfo.addEventListener("click", movieSelection);   



movieDirectory();