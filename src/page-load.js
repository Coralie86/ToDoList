
function page_load() {
    const content = document.querySelector('#content');

    if (content.contains(document.querySelector('#container'))) {
        content.removeChild(document.querySelector('#container'))
    }
    const container = document.createElement("div");
    container.id = "container";

    const title = document.createElement("div");
    title.id = "title";
    title.textContent = "The Hungry Stomach";

    const theme = document.createElement("div");
    theme.id = "theme";
    theme.textContent = "Welcome to The Hungry Stomach, where hunger meets happiness!\n\nWhether you\'re starving, \
    snacky, or just in the mood for something seriously tasty, we\'ve got you covered. From tasty mains to appealing \
    desserts, our menu is crafted to satisfy every craving.\n\nCozy, fun, and full of flavor - this is the place your stomach really wants to be!"

    const hours_container = document.createElement("div");
    hours_container.id = "hours_container";

    const hours_title = document.createElement("h3");
    hours_title.id = "hours_title";
    hours_title.textContent = "Hours";

    const hours = document.createElement("div");
    hours.id = "hours";
    hours.textContent = "Monday: 12am - 12pm \n \
    Tuesday: 12am - 12pm  \n \
    Wednesday: 12am - 12pm  \n \
    Thursday: 12am - 12pm  \n \
    Friday: 12am - 3am  \n \
    Saturday: 12am - 3am \n \
    Sunday: Closed";

    hours_container.appendChild(hours_title);
    hours_container.appendChild(hours);

    const location = document.createElement("div");
    location.id = "location";
    location.innerHTML = "<b>Where to find us?</b> \n \
    <span style='font-size:18px;'>BoraBora Island, 100 Hungry People Street</span>"

    container.appendChild(title);
    container.appendChild(theme);
    container.appendChild(hours_container);
    container.appendChild(location);

    content.appendChild(container);
}


export {page_load}