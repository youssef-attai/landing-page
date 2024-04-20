const sectionsList = [];

function handleScroll() {
  window.scrollY > 100
    ? document
        .querySelector(".scroll-top")
        .classList.remove("scroll-top-hidden")
    : document.querySelector(".scroll-top").classList.add("scroll-top-hidden");

  for (let pair of sectionsList) {
    const sectionBoundingRect = pair.section.getBoundingClientRect();
    sectionBoundingRect.top < window.innerHeight / 2 &&
    sectionBoundingRect.bottom > window.innerHeight / 2 &&
    !pair.section
      .querySelector(".section")
      .classList.contains("section-collapsed")
      ? pair.addFocus()
      : pair.removeFocus();
  }
}

class Section {
  constructor(li, section) {
    this.listItem = li;
    this.section = section;
    this.focused = false;
  }

  removeFocus() {
    this.listItem.classList.remove("li-focused");
    this.section.querySelector(".section").classList.remove("section-focused");
  }

  addFocus() {
    this.listItem.classList.add("li-focused");
    this.section.querySelector(".section").classList.add("section-focused");
  }
}

function createSection() {
  /*
    <div class="section-wrapper">
        <div class="section">
            <div class="section-head">
                <h2 class="section-header">Section 0</h2>
                <button class="collapse-section">collapse</button>
            </div>
            <p class="section-content">lorem150</p>
        </div>
    </div>
*/

  const sectionWrapper = document.createElement("div");
  sectionWrapper.classList.add("section-wrapper");

  const section = document.createElement("div");
  section.classList.add("section");

  const sectionHead = document.createElement("div");
  sectionHead.classList.add("section-head");

  const heading = document.createElement("h2");
  heading.classList.add("section-header");
  heading.innerText = `Section ${sectionsList.length + 1}`;

  const collapseButton = document.createElement("button");
  collapseButton.innerHTML = `
  <svg width="24xpx" height="24xpx" viewBox="0 0 18.00 18.00" xmlns="http://www.w3.org/2000/svg"
  fill="#000000" stroke="#000000" stroke-width="0.00018">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_iconCarrier">
      <path fill="#eeeeee"
          d="M13.7,6.3C13.5,6.1,13.3,6,13,6H5C4.7,6,4.5,6.1,4.3,6.3c-0.4,0.4-0.4,1,0,1.4l4,4C8.5,11.9,8.7,12,9,12 s0.5-0.1,0.7-0.3l4-4C14.1,7.3,14.1,6.7,13.7,6.3L13.7,6.3z">
      </path>
  </g>
</svg>
`;
  collapseButton.classList.add("collapse-section");
  collapseButton.addEventListener("click", () => {
    section.classList.toggle("section-collapsed");
    section.scrollIntoView({
      behavior: "smooth",
    });
    handleScroll();
  });

  const sectionContent = document.createElement("p");
  sectionContent.classList.add("section-content");
  sectionContent.innerText =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque atque cupiditate quia, excepturi corporis, doloribus, dignissimos nihil sequi amet voluptatum fugit expedita iure nobis tenetur. Aliquam delectus, unde eum, ipsam mollitia minima necessitatibus ad ullam quo architecto cupiditate commodi. Dolores corrupti magni eveniet aspernatur necessitatibus iure doloribus aliquid praesentium obcaecati hic debitis unde fuga, vitae ut asperiores laudantium alias recusandae amet, harum, dolore fugiat minima quod. Blanditiis ullam velit, aperiam sed explicabo optio, nihil vero voluptas, maiores beatae natus minima totam temporibus dolorum neque. Rerum est vel debitis corrupti, pariatur cum modi neque nulla, animi laudantium inventore aut id iusto. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, nemo. Quisquam maiores odit necessitatibus, beatae commodi a culpa officia saepe accusantium aspernatur, blanditiis assumenda dolor animi nobis fuga ut inventore sapiente quibusdam, numquam amet? Labore repellat ipsam, nesciunt magni a omnis corporis ut impedit sed fugiat asperiores eum harum maxime?";

  sectionWrapper.appendChild(section);
  section.appendChild(sectionHead);
  section.appendChild(sectionContent);
  sectionHead.appendChild(heading);
  sectionHead.appendChild(collapseButton);

  return sectionWrapper;
}

function createListItem() {
  /*
    <li class="section-li">Section 0</li> 
    FOCUSED CLASS: li-focused
*/

  const li = document.createElement("li");
  li.classList.add("section-li");
  li.id = `${sectionsList.length + 1}`;
  li.innerText = `Section ${sectionsList.length + 1}`;
  return li;
}

document.querySelector(".scroll-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

document.querySelector(".add-section").addEventListener("click", () => {
  const section = createSection();
  const li = createListItem();

  sectionsList.push(new Section(li, section));
  document.querySelector(".nav-list").appendChild(li);
  document.querySelector(".sections-container").appendChild(section);

  li.click();
});

document.addEventListener("scroll", handleScroll);

document.querySelector(".nav-list").addEventListener("click", (e) => {
  if (e.target.nodeName.toLowerCase() === "li" && !isNaN(e.target.id)) {
    sectionsList[Number(e.target.id) - 1].section.scrollIntoView({
      behavior: "smooth",
    });
  }
});

fetch("https://currencies.flatter.dev/api/v1/hashrate/")
  .then(async (res) => {
    const data = await res.json();
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
