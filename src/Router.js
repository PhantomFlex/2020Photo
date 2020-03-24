import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MainMenu } from "./pages/MainMenu";
import { Aboutme } from "./pages/AboutMe";
import { Portfolio } from "./pages/Portfolio";
import { Price } from "./pages/Price";
import { Contact } from "./pages/Contact";
import { All } from "./pages/Portfolio/components/All";
import { Promo } from "./pages/Portfolio/components/Promo";
import { Advertising } from "./pages/Portfolio/components/Advertising";
import { Wedding } from "./pages/Portfolio/components/Wedding";
import { Events } from "./pages/Portfolio/components/Events";
import { AirCamera } from "./pages/Portfolio/components/AirCamera";
import { Admin } from "./pages/Admin";
import { Videos } from "./pages/Videos";

export const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={MainMenu} />
    <Route path="/about" component={Aboutme} />
    <Route path="/price" component={Price} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/contact" component={Contact} />
    <Route path="/all" component={All} />
    <Route path="/promo" component={Promo} />
    <Route path="/advertising" component={Advertising} />
    <Route path="/wedding" component={Wedding} />
    <Route path="/events" component={Events} />
    <Route path="/airCamera" component={AirCamera} />
    <Route path="/admin" component={Admin} />
    <Route path="/videos" component={Videos} />
  </BrowserRouter>
);
