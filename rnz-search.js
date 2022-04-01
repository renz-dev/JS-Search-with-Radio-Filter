let radioBtns = document.querySelectorAll('input[name="paFilter"]');

let findSelectedPA = () => {
  let selectedPA = document.querySelector(
    'input[name="paFilter"]:checked'
  ).value; // Create block scope variable for checked radio button
  console.log(selectedPA); // Log selected practice area

  const searchResults = document.getElementById("searchResults"); // Create constant variable for search results
  const searchBar = document.getElementById("searchBar"); // Create constant variable for search input
  // console.log(searchBar); // Keep track of searchBar

  let titleNames = []; // Create block scope variable for title names

  searchBar.value = ""; // Clear search bar
  searchBar.addEventListener("keyup", (e) => {
    // console.log(e.target.value); // Log keypress event

    // In order to make the search case-insensitive we'll need to use .toLowerCase()
    const searchString = e.target.value.toLowerCase(); // Set searchString for searchBar
    const filteredTitles = titleNames.filter((searchItem) => {
      return (
        searchItem.name.toLowerCase().includes(searchString) ||
        searchItem.description.toLowerCase().includes(searchString)
      ); // Return data if found
    });
    const filteredTitles2 = titleNames.filter((searchItem) => {
      return (
        searchItem.pArea == selectedPA &&
        (searchItem.name.toLowerCase().includes(searchString) ||
          searchItem.description.toLowerCase().includes(searchString))
      ); // Return data if found
    });

    // console.log(filteredTitles); // Log filtered Titles

    // Check which Practice Area is selected then display only titles under that Practice Area
    switch (selectedPA) {
      case "PA1":
      case "PA2":
      case "PA3":
      case "PA4":
      case "PA5":
        displaySearchItems(filteredTitles2);
        break;
      default:
        displaySearchItems(filteredTitles);
    }
  });

  // Create variable that loads asynchronously the Search Items from our JSON file
  const loadSearchItems = async () => {
    try {
      const res = await fetch("titles.json");
      titleNames = await res.json();
      displaySearchItems(titleNames);
    } catch (err) {
      console.error(err);
    }
  };

  // Create variable that displays the search items on the Frontend
  const displaySearchItems = (searchItems) => {
    const htmlString = searchItems
      .map((searchItem) => {
        return `
            <li class="searchItem">
                <h3><a href="${searchItem.link}" target="_blank">${searchItem.name}</a></h3>
                <p>${searchItem.description}</p>
                <img src="${searchItem.icon}"></img>
            </li>
        `;
      })
      .join("");
    // Append search item data in HTML on the Frontend
    searchResults.innerHTML = htmlString;
  };

  loadSearchItems();
};

radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("change", findSelectedPA); // Check which Practice Area is selected
});

findSelectedPA();
