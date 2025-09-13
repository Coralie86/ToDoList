import "./styles.css";
import {page_load} from "./page-load.js";
import {menu} from "./menu.js";
import {contact_about} from "./contact-about.js";

const home_button = document.querySelector('#Home');
const menu_button = document.querySelector('#Menu');
const contact_button = document.querySelector('#Contact');

page_load();

home_button.addEventListener('click', function() {
    page_load();
})

menu_button.addEventListener('click', function() {
    menu();
})

contact_button.addEventListener('click', function() {
    contact_about();
})

