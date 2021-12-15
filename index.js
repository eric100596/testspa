import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
//Add Axios
import axios from "axios";

import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo(window.location.origin);
//Move router to the end and add Router.Hooks

import {
  AddPicturesToGallery,
  GalleryPictures,
  PrintFormOnSubmit
} from "./lib";

function render(st) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer()}
  `;
  router.updatePageLinks();
  addEventListeners();
}

function addEventListeners() {
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );

  // populating gallery with pictures
  const gallerySection = document.querySelector("#gallery");
  // using modules to populate gallery with pictures
  AddPicturesToGallery(GalleryPictures, gallerySection);

  // handle form submission with PrintFormOnSubmit module
  //   const form = document.querySelector("form");
  //   PrintFormOnSubmit(form);
  // }
  //Add router here
  router.hooks({
    before: (done, params) => {
      const page =
        params && params.hasOwnProperty("page")
          ? capitalize(params.page)
          : "Home";

      if (page === "Home") {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=fbb30b5d6cf8e164ed522e5082b49064&q=st.%20louis`
          )
          .then(response => {
            state.Home.weather = {};
            state.Home.weather.city = response.data.name;
            state.Home.weather.temp = response.data.main.temp;
            state.Home.weather.feelsLike = response.data.main.feels_like;
            state.Home.weather.description = response.data.weather[0].main;
            done();
          })
          .catch(err => console.log(err));
      }

      if (page === "Pizza") {
        axios
          .get(`${process.env.PIZZA_PLACE_API_URL}`)
          .then(response => {
            state.Pizza.pizzas = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
          });
      }
    }
  });

  router
    .on({
      "/": () => render(state.Home),
      ":page": params => {
        let page = capitalize(params.page);
        render(state[page]);
      }
    })
    .resolve();
