import * as localStorage from "./utils/local-storage.js";
import { BACKGROUND_FOLDER, WEATHER_CODES } from "./classes/configurations.js";

const directories = new Map([
    ["clouds", { size: 5, extension: "png" }],
    ["cyberpunk", { size: 3, extension: "mp4" }],
    ["firewatch", { size: 1, extension: "mp4" }],
    ["fluted", { size: 9, extension: "png" }],
    ["gradients", { size: 19, extension: "png" }],
    ["ksp", { size: 8, extension: "jpg" }],
    ["mountains", { size: 8, extension: "png" }],
    ["rdr2", { size: 7, extension: "jpg" }]
]);

let folder;
let index;
let extension;

//

function configureBackground() {
    const backgroundFolder = localStorage.getValue(BACKGROUND_FOLDER)
    const directory = directories.get(backgroundFolder);

    folder = backgroundFolder;
    index = Math.floor((Math.random() * directory.size) + 1);
    extension = directory.extension;

    if(extension === 'mp4') {
        addVideo();
    } else {
        addImage();
    }
}

function addVideo() {
    let video = $('<video />', {
        id: 'background-video',
        src: `images/${folder}/${index}.${extension}`,
        type: 'video/mp4',
        controls: false
    }).prop({
        muted: true,
        autoplay: true,
        loop: true,
    });
    video.appendTo($('main'));
}

function addImage() {
    let image = $('<div />', {
        id: 'background-image'
    });
    image.css("background-image", `url(images/${folder}/${index}.${extension})`);
    image.appendTo($('main'));
}

//

function configureWeatherWidgets() {
    const weather = localStorage.getValue(WEATHER_CODES);
    if (!weather) {
        return;
    }

    const cities = weather.split(";");

    for(let i = 0; i < cities.length; i+=3) {
        addWeatherWidget(cities[i], cities[i+1], cities[i+2]);
    }
}

function addWeatherWidget(code, name, descripcion) {
    let widget = $('<a />', {
        class: "weatherwidget-io",
        href: `https://forecast7.com/es/${code}/${name}/`,
        'data-label_1': descripcion,
        'data-font': "Roboto",
        'data-icons': "Climacons",
        'data-theme': "dark"
    });

    widget.appendTo($('main'));
}

//

function load() {
    $("#s_backgroundFolder").val(localStorage.getValue(BACKGROUND_FOLDER));
    $("#ta_weaterCodes").val(localStorage.getValue(WEATHER_CODES));
}

function store() {
    localStorage.setValue(BACKGROUND_FOLDER, $("#s_backgroundFolder").val());
    localStorage.setValue(WEATHER_CODES, $("#ta_weaterCodes").val());
}

//

$("#configuration-modal" ).on('shown.bs.modal', () => load());

$("#b_save").on('click', () => {
    store();
    $("#configuration-modal" ).modal('toggle')
});

// //

configureBackground();
configureWeatherWidgets();
