import $ from "jquery";

import "shared/operators";

import "./application.scss";

import * as services from "./services";


services.server.emitAction$("login", {username: "foo", password: "bar"})
    .subscribe(user => {
        console.log("We are logged in: " + user);
    }, error => {
        console.error(error);
    });

//-----------------------
//Auth
const $html = $("html");
services.usersStore.currentUser$.subscribe(user => {
    if(user.isLoggedIn) {
        $html.removeClass("not-logged-in");
        $html.addClass("logged-in");
    } else {
        $html.removeClass("logged-in");
        $html.addClass("not-logged-in");
    }
});

//------------------
//Components
require("./components/player/player");
require("./components/users/users");
require("./components/chat/chat");
require("./components/playlist/playlist");
//------------------
//Bootstrap
services.socket.connect();

services.usersStore.currentUser$
    .subscribe(user => {
        console.log(user);
    });

// services.usersStore.login$("whoa")
//     .subscribe(user => {
//         console.log(user);
//     }, error => {console.log(error);});
//
// window.setTimeout(() => {
//     services.usersStore.logout$();
// }, 3000);
