async function displayWorks() {
  try {
    const worksResponse = await fetch("http://localhost:5678/api/works", {
      method: "GET",
    });
    if (!worksResponse.ok) {
      throw new Error(`HTTP error! status: ${worksResponse.status}`);
    }

    const works = await worksResponse.json();
    const gallery = document.querySelector("div.gallery");

    works.forEach((work) => {
      let newFigure = document.createElement("figure");
      let newImg = document.createElement("img");
      let newFigCaption = document.createElement("figcaption");

      newImg.src = work.imageUrl;
      newImg.alt = work.title;
      newFigCaption.textContent = work.title;

      newFigure.appendChild(newImg);
      newFigure.appendChild(newFigCaption);
      gallery.appendChild(newFigure);
    });

    return works;
  } catch (e) {
    console.error("Error fetching works:", e); // Network or HTTP status code error
  }
}

async function displayCategories() {
  try {
    const categoriesResponse = await fetch(
      "http://localhost:5678/api/categories",
      { method: "GET" }
    );
    if (!categoriesResponse.ok) {
      throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
    }

    const categories = await categoriesResponse.json();
    const allFilter = { id: 0, name: "All" };
    const filters = [allFilter, ...categories];

    const filterListElement = document.querySelector("ul.project-filter");
    filters.forEach((filter) => {
      let newListItem = document.createElement("li");
      let newButton = document.createElement("button");

      if (filter.name === "All" || filter.name === "Objects") {
        newButton.style.minWidth = "100px";
      } else {
        newButton.style.minWidth = "150px";
      }
      newButton.textContent = filter.name;
      newListItem.appendChild(newButton);
      filterListElement.appendChild(newListItem);
    });

    return filters;
  } catch (e) {
    console.error("Error fetching categories:", e);
  }
}

async function displayFilteredWorks() {
  filters = await displayCategories();
  works = await displayWorks();
  console.log(filters);
  console.log(works);
  const filterElements = document.querySelectorAll("ul.project-filter button");
  filterElements[0].classList.add("active-btn");

  const gallery = document.querySelector("div.gallery");
  filterElements.forEach((filterElement) => {
    console.log(filterElement);
    filterElement.addEventListener("click", (e) => {
      // no filter
      if (filterElement.textContent === filters[0].name) {
        console.log("HELLO");
        removeWorks();
        console.log(works);

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[0].classList.add("active-btn");

        // make into a non-async func
        works.forEach((work) => {
          let newFigure = document.createElement("figure");
          let newImg = document.createElement("img");
          let newFigCaption = document.createElement("figcaption");

          newImg.src = work.imageUrl;
          newImg.alt = work.title;
          newFigCaption.textContent = work.title;

          newFigure.appendChild(newImg);
          newFigure.appendChild(newFigCaption);
          gallery.appendChild(newFigure);
        });
      }

      // objects filter
      else if (filterElement.textContent === filters[1].name) {
        console.log("WORLD");
        removeWorks();

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[1].classList.add("active-btn");

        const filteredWorks = works.filter(
          (work) => work.category.name === filters[1].name
        );
        console.log(filteredWorks);

        // make into a non-async func
        filteredWorks.forEach((work) => {
          let newFigure = document.createElement("figure");
          let newImg = document.createElement("img");
          let newFigCaption = document.createElement("figcaption");

          newImg.src = work.imageUrl;
          newImg.alt = work.title;
          newFigCaption.textContent = work.title;

          newFigure.appendChild(newImg);
          newFigure.appendChild(newFigCaption);
          gallery.appendChild(newFigure);
        });
      }

      // apartments filter
      else if (filterElement.textContent === filters[2].name) {
        console.log("GOODBYE");
        removeWorks();

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[2].classList.add("active-btn");

        const filteredWorks = works.filter(
          (work) => work.category.name === filters[2].name
        );
        console.log(filteredWorks);

        // make into a non-async func
        filteredWorks.forEach((work) => {
          let newFigure = document.createElement("figure");
          let newImg = document.createElement("img");
          let newFigCaption = document.createElement("figcaption");

          newImg.src = work.imageUrl;
          newImg.alt = work.title;
          newFigCaption.textContent = work.title;

          newFigure.appendChild(newImg);
          newFigure.appendChild(newFigCaption);
          gallery.appendChild(newFigure);
        });
      }

      // hotels & restaurants filter
      else if (filterElement.textContent === filters[3].name) {
        console.log("PEOPLE");
        removeWorks();

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[3].classList.add("active-btn");

        const filteredWorks = works.filter(
          (work) => work.category.name === filters[3].name
        );
        console.log(filteredWorks);

        // make into a non-async func
        filteredWorks.forEach((work) => {
          let newFigure = document.createElement("figure");
          let newImg = document.createElement("img");
          let newFigCaption = document.createElement("figcaption");

          newImg.src = work.imageUrl;
          newImg.alt = work.title;
          newFigCaption.textContent = work.title;

          newFigure.appendChild(newImg);
          newFigure.appendChild(newFigCaption);
          gallery.appendChild(newFigure);
        });
      }
    });
  });
}

function removeWorks() {
  const gallery = document.querySelector("div.gallery");

  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
  console.log("remove");
}

// displayWorks();
displayFilteredWorks();
