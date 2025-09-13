function contact_about() {
    const content = document.querySelector('#content');
    
    if (content.contains(document.querySelector('#container'))) {
        content.removeChild(document.querySelector('#container'))
    }
    const container = document.createElement("div");
    container.id = "container";

    const title = document.createElement("div");
    title.id = "title";
    title.textContent = "The Hungry Stomach";

    const text_contact = document.createElement("div");
    text_contact.id = "text_contact";
    text_contact.innerHTML = "<b>The Hungry Stomach</b> came from only one idea: \
     stop people from feeling hungry, as hangry is not a good look on anyone... \
     Our passionate team armed with knives, plates and taste buds brings together\
     years of experience <b>all around the world</b>.\n\
    Do you want to try the Hungry experience? Feel free to <b>contact us</b>!"

    const contacts = document.createElement("div");
    contacts.id = "contacts";
    contacts.innerHTML = "<b>Tel:</b> 000 111 222 333 \n\
    <b>Email:</b> theHungryStomach@email.com"
    

    container.appendChild(title);
    container.appendChild(text_contact);
    container.appendChild(contacts);

    content.appendChild(container);
}

export {contact_about}