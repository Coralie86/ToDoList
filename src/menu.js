function menu() {
    const content = document.querySelector('#content');
    
    if (content.contains(document.querySelector('#container'))) {
        content.removeChild(document.querySelector('#container'))
    }
    const container = document.createElement("div");
    container.id = "container";

    const title = document.createElement("div");
    title.id = "title";
    title.textContent = "The Hungry Stomach";

    const text_intro = document.createElement("div");
    text_intro.id = "text_intro";
    text_intro.textContent = "We propose one single menu composed of one Appetizer, one Starter, \
    one Main dish, Salad or Cheese and one Desert. \nOne option to be choosen for each.\n\
    Drinks apart."

    const appetizer_div = document.createElement("div");
    appetizer_div.classList.add("menu_piece");
    const appetizer_title = document.createElement("h3");
    appetizer_title.textContent = "Appetizer";
    const appetizer = ["A salmon tartare verrine with avocado mousse",
         "Mushrooms filled with garlic, herb and cheese",
         "Tomato and AliOli sauce on bread."]
    const appetizer_list= document.createElement("ul");
    for (let x of appetizer){
        let li = document.createElement("li");
        li.textContent = x;
        appetizer_list.appendChild(li);
    }

    appetizer_div.appendChild(appetizer_title);
    appetizer_div.appendChild(appetizer_list);


    const starter_div = document.createElement("div");
    starter_div.classList.add("menu_piece");
    const starter_title = document.createElement("h3");
    starter_title.textContent = "Starter";
    const starter = ["Salad Perigourdine",
         "Charcuterie board",
         "Green Pea soup."]
    const starter_list = document.createElement("ul");
    for (let x of starter){
        let li = document.createElement("li");
        li.textContent = x;
        starter_list.appendChild(li);
    }

    starter_div.appendChild(starter_title);
    starter_div.appendChild(starter_list);

    const main_dish_div = document.createElement("div");
    main_dish_div.classList.add("menu_piece");
    const main_dish_title = document.createElement("h3");
    main_dish_title.textContent = "Main Dish";
    const main_dish = ["Boeuf Bourguignon cooked for 3 hours",
         "Raclette",
         "Tartiflette."]
    const main_dish_list = document.createElement("ul");
    for (let x of main_dish){
        let li = document.createElement("li");
        li.textContent = x;
        main_dish_list.appendChild(li);
    }

    main_dish_div.appendChild(main_dish_title);
    main_dish_div.appendChild(main_dish_list);

    const cheese_div = document.createElement("div");
    cheese_div.classList.add("menu_piece");
    const cheese_title = document.createElement("h3");
    cheese_title.textContent = "Something light before Desert?";
    const cheese = ["Cheese",
         "Salad Mix with nuts."]
    const cheese_list = document.createElement("ul");
    for (let x of cheese){
        let li = document.createElement("li");
        li.textContent = x;
        cheese_list.appendChild(li);
    }

    cheese_div.appendChild(cheese_title);
    cheese_div.appendChild(cheese_list);

    const desert_div = document.createElement("div");
    desert_div.classList.add("menu_piece");
    const desert_title = document.createElement("h3");
    desert_title.textContent = "Desert";
    const desert = ["Chocolate Fondant with Chantilly cream",
         "Tiramisu Banane Speculoos",
         "CheeseCake."]
    const desert_list = document.createElement("ul");
    for (let x of desert){
        let li = document.createElement("li");
        li.textContent = x;
        desert_list.appendChild(li);
    }

    desert_div.appendChild(desert_title);
    desert_div.appendChild(desert_list);
    



    container.appendChild(title);
    container.appendChild(text_intro);
    container.appendChild(appetizer_div);
    container.appendChild(starter_div);
    container.appendChild(main_dish_div);
    container.appendChild(cheese_div);
    container.appendChild(desert_div);

    content.appendChild(container);
}

export {menu}