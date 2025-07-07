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

  const filterElements = document.querySelectorAll("ul.project-filter button");
  filterElements[0].classList.add("active-btn");

  // const gallery = document.querySelector("div.gallery");
  filterElements.forEach((filterElement) => {
    filterElement.addEventListener("click", (e) => {
      // no filter
      if (filterElement.textContent === filters[0].name) {
        removeWorks();

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[0].classList.add("active-btn");

        displayWorksByCategory(works);
      }

      // objects filter
      else if (filterElement.textContent === filters[1].name) {
        removeWorks();

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[1].classList.add("active-btn");

        const filteredWorks = works.filter(
          (work) => work.category.name === filters[1].name
        );

        displayWorksByCategory(filteredWorks);
      }

      // apartments filter
      else if (filterElement.textContent === filters[2].name) {
        removeWorks();

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[2].classList.add("active-btn");

        const filteredWorks = works.filter(
          (work) => work.category.name === filters[2].name
        );

        displayWorksByCategory(filteredWorks);
      }

      // hotels & restaurants filter
      else if (filterElement.textContent === filters[3].name) {
        removeWorks();

        const activeFilter = document.querySelector(
          "ul.project-filter button.active-btn"
        );
        activeFilter.classList.remove("active-btn");
        filterElements[3].classList.add("active-btn");

        const filteredWorks = works.filter(
          (work) => work.category.name === filters[3].name
        );

        displayWorksByCategory(filteredWorks);
      }
    });
  });
}

async function addWork() {
  try {
    const fileInput = document.querySelector(".modal-file-container input");
    const titleInput = document.querySelector(".modal-input-container input");
    const categoryInput = document.querySelector(
      ".modal-input-container select"
    );

    if (!fileInput.files[0]) {
      return;
    }
    if (titleInput.value.length <= 0) {
      return;
    }
    if (categoryInput.value.length <= 0) {
      return;
    }

    const form = document.querySelector(".modal-form");
    const formData = new FormData(form);
    const imageData = formData.get("image");
    const titleData = formData.get("title");
    const categoryData = formData.get("category");

    console.log(imageData);
    console.log(titleData);
    console.log(categoryData);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log("IT WORKED");

      removeWorks();
      works = await displayWorks();

      // displayModalGallery(updatedWorks);

      //resetModal();
    } else {
      console.error("Failed to post work:", response.status);
    }
  } catch (error) {
    console.error("Error in addWork:", error);
  }
}

async function deleteWork(id, workElement) {
  try {
    const resultFetch = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (resultFetch.ok) {
      removeWorks();
      works = await displayWorks();
      workElement.remove();
    }
    console.log("HERRO");
  } catch (error) {
    alert("Delete work error");
    console.log(error);
  }
}

function removeWorks() {
  const gallery = document.querySelector("div.gallery");

  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}

function displayWorksByCategory(works) {
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
}

function displayModalGallery(works) {
  // change to modalProjects
  const modalProjects = document.querySelector(".modal-projects");
  modalProjects.innerHTML = ""; // Clear previous content

  works.forEach((work) => {
    // image needs to be in div in order to add trash can icon with relative/absolute
    let modalImgContainer = document.createElement("div");
    modalImgContainer.classList.add("modal-image-container");

    let imgTrashIcon = document.createElement("i");
    imgTrashIcon.classList.add("fa-solid", "fa-trash-can", "trash-icon");

    let modalImg = document.createElement("img");
    modalImg.classList.add("modal-image");
    modalImg.src = work.imageUrl;
    modalImg.alt = work.title;

    modalImgContainer.appendChild(modalImg);
    modalImgContainer.appendChild(imgTrashIcon);
    modalProjects.appendChild(modalImgContainer);

    imgTrashIcon.addEventListener("click", async (e) => {
      console.log("hello");
      e.preventDefault();
      await deleteWork(work.id, modalImgContainer);
    });
  });
}

function resetModal() {
  const modal = document.querySelector("section.modal");
  modal.classList.add("hidden");
  const overlay = document.querySelector("div.overlay");
  overlay.classList.add("hidden");

  const modalNav1 = document.querySelector("div.modal-nav-1");
  const modalNav2 = document.querySelector("div.modal-nav-2");
  if (modalNav2) {
    modalNav2.classList.remove("modal-nav-2");
    modalNav2.classList.add("modal-nav-1");

    const backModalButton = document.querySelector("i.fa-arrow-left");
    backModalButton.classList.add("hidden");

    const title = document.querySelector(".modal-content > p");
    title.textContent = "Photo Gallery";

    const modalForm = document.querySelector("form.modal-form");
    const modalFormButton = document.querySelector(".modal-content button");

    modalForm.remove();
    modalFormButton.remove();
  } else if (modalNav1) {
    const modalProjects = document.querySelector("div.modal-projects");
    const addPhotoButton = document.querySelector("button.modal-bottom-button");

    modalProjects.remove();
    addPhotoButton.remove();
  }
}

function setSecondModalSlide() {
  const title = document.querySelector(".modal-content > p");
  title.textContent = "Add Photo";

  const backModalButton = document.querySelector("i.fa-arrow-left");
  backModalButton.classList.remove("hidden");

  const modalNav = document.querySelector("div.modal-nav-1");
  modalNav.classList.remove("modal-nav-1");
  modalNav.classList.add("modal-nav-2");

  const modalContent = document.querySelector("div.modal-content");
  const modalProjects = document.querySelector("div.modal-projects");
  const addPhotoButton = document.querySelector("button.modal-bottom-button");

  modalProjects.remove();
  addPhotoButton.remove();

  const modalForm = document.createElement("form");
  modalForm.setAttribute("id", "modalForm");
  modalForm.classList.add("modal-form");

  const fileContainer = document.createElement("div");
  fileContainer.classList.add("modal-file-container");
  const uploadContainer = document.createElement("div");

  uploadContainer.classList.add("modal-upload-container");

  const imageIcon = document.createElement("i");
  imageIcon.classList.add("fa-regular", "fa-image", "fa-6x", "image-icon");
  const fileLabel = document.createElement("label");
  fileLabel.classList.add("modal-file-label");
  fileLabel.textContent = "+ Add Photo";
  fileLabel.setAttribute("for", "modalFileInput");
  const fileText = document.createElement("p");
  fileText.textContent = "jpg, png: max 4 MB";
  uploadContainer.appendChild(imageIcon);
  uploadContainer.appendChild(fileLabel);
  uploadContainer.appendChild(fileText);
  fileContainer.appendChild(uploadContainer);

  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("accept", ".jpg, .jpeg, .png");
  fileInput.setAttribute("hidden", "true");
  fileInput.setAttribute("id", "modalFileInput");
  fileInput.setAttribute("name", "image");
  fileContainer.appendChild(fileInput);

  const previewContainer = document.createElement("div");
  previewContainer.classList.add("modal-preview-container");
  previewContainer.classList.add("hidden");
  const previewImage = document.createElement("img");
  previewImage.classList.add("preview-image");
  previewContainer.appendChild(previewImage);
  fileContainer.appendChild(previewContainer);

  // link title and input tag with id and for attributes
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("modal-input-container");
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  titleLabel.setAttribute("for", "modalTitle");
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "modalTitle");
  titleInput.setAttribute("name", "title");
  titleContainer.appendChild(titleLabel);
  titleContainer.appendChild(titleInput);

  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("modal-input-container");
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category";
  categoryLabel.setAttribute("for", "modalCategories");
  const categoryDropDown = document.createElement("select");
  categoryDropDown.setAttribute("name", "category");
  categoryDropDown.setAttribute("id", "modalCategories");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "1");
  option1.textContent = "Objects";
  categoryDropDown.appendChild(option1);
  const option2 = document.createElement("option");
  option2.setAttribute("value", "2");
  option2.textContent = "Apartments";
  categoryDropDown.appendChild(option2);
  const option3 = document.createElement("option");
  option3.setAttribute("value", "3");
  option3.textContent = "Hotels & Restaurants";
  categoryDropDown.appendChild(option3);
  categoryContainer.appendChild(categoryLabel);
  categoryContainer.appendChild(categoryDropDown);

  modalForm.appendChild(fileContainer);
  modalForm.appendChild(titleContainer);
  modalForm.appendChild(categoryContainer);

  const modalFormButton = document.createElement("button");
  modalFormButton.setAttribute("type", "submit");
  modalFormButton.setAttribute("form", "modalForm");
  modalFormButton.classList.add("modal-button-disabled");
  modalFormButton.textContent = "Confirm";
  modalFormButton.disabled = true;

  function validateForm() {
    const fileValid = fileInput.files[0];
    const titleValid = titleInput.value.trim().length > 0;
    const categoryValid = categoryDropDown.value.trim().length > 0;

    modalFormButton.disabled = !(fileValid && titleValid && categoryValid);

    if (modalFormButton.disabled === false) {
      modalFormButton.classList.remove("modal-button-disabled");
      modalFormButton.classList.add("modal-bottom-button");
      console.log("Button enabled");
    } else {
      console.log("Button disabled");
    }
  }

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      uploadContainer.classList.add("hidden");
      previewContainer.classList.remove("hidden");
    };

    reader.readAsDataURL(file);

    validateForm();
  });

  titleInput.addEventListener("input", validateForm);
  categoryDropDown.addEventListener("change", validateForm);

  modalContent.appendChild(modalForm);
  modalContent.appendChild(modalFormButton);

  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await addWork();
    } catch (err) {
      console.error("Error during addWork:", err);
    }
  });
}

// displayWorks();
displayFilteredWorks();

const token = sessionStorage.getItem("token");
if (token !== null) {
  // display edit notification on top
  const editNotice = document.querySelector("section.edit-notice");
  editNotice.style.display = "flex";
  const projectSecButton = document.querySelector("div.project-section-button");
  projectSecButton.style.display = "flex";

  // display pop-up/modal on edit button click
  const editButton = document.querySelector(".project-section-button > button");

  editButton.addEventListener("click", (e) => {
    const modal = document.querySelector("section.modal");
    modal.classList.remove("hidden");
    const overlay = document.querySelector("div.overlay");
    overlay.classList.remove("hidden");

    const modalContent = document.querySelector("div.modal-content");

    const modalProjects = document.createElement("div");
    modalProjects.classList.add("modal-projects");

    const addPhotoButton = document.createElement("button");
    addPhotoButton.textContent = "Add a Photo";
    addPhotoButton.classList.add("modal-bottom-button");

    modalContent.appendChild(modalProjects);
    modalContent.appendChild(addPhotoButton);

    displayModalGallery(works);

    if (addPhotoButton) {
      addPhotoButton.addEventListener("click", (e) => {
        setSecondModalSlide();
      });
    }
  });

  // hide pop-up/modal on exit button click
  const exitModalButton = document.querySelector("i.fa-xmark");

  exitModalButton.addEventListener("click", (e) => {
    resetModal();
  });

  // hide pop-up/modal on overlay click
  const overlay = document.querySelector("div.overlay");
  overlay.addEventListener("click", (e) => {
    resetModal();
  });

  // go back to the first slide in the modal on back button click
  const backModalButton = document.querySelector("i.fa-arrow-left");

  backModalButton.addEventListener("click", (e) => {
    const modalForm = document.querySelector("form.modal-form");
    const modalFormButton = document.querySelector(".modal-content button");

    modalForm.remove();
    modalFormButton.remove();

    const title = document.querySelector(".modal-content > p");
    title.textContent = "Photo Gallery";

    const backModalButton = document.querySelector("i.fa-arrow-left");
    backModalButton.classList.add("hidden");

    const modalNav = document.querySelector("div.modal-nav-2");
    modalNav.classList.remove("modal-nav-2");
    modalNav.classList.add("modal-nav-1");

    const modalContent = document.querySelector("div.modal-content");

    const modalProjects = document.createElement("div");
    modalProjects.classList.add("modal-projects");

    const addPhotoButton = document.createElement("button");
    addPhotoButton.textContent = "Add a Photo";
    addPhotoButton.classList.add("modal-bottom-button");

    modalContent.appendChild(modalProjects);
    modalContent.appendChild(addPhotoButton);

    displayModalGallery(works);

    if (addPhotoButton) {
      addPhotoButton.addEventListener("click", (e) => {
        setSecondModalSlide();
      });
    }
  });

  console.log("Admin logged in");
} else {
  console.log("Admin not logged in");
}
