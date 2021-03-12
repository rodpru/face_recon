import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo.js";
import FaceRecon from "./components/FaceRecon/FaceRecon";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const particles = {
  particles: {
    value: 30,
    density: {
      enable: true,
      value_area: 800,
    },
  },
};

const app = new Clarifai.App({
  apiKey: "6742fe98837b4c96815821734eaadf05",
});

class App extends React.Component {
  state = {
    input: "",
    imageUrl: "",
    box: "",
    route: "signin",
    isSignedIn: false,
  };

  // celeb name = console.log(response.outputs[0].data.regions[0].data.concepts[0].name);
  // boundery box = console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

  calculateFaceLocation = (data) => {
    const faceBoxFromAPi =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceBoxFromAPi.left_col * width,
      topRow: faceBoxFromAPi.top_row * height,
      rightCol: width - faceBoxFromAPi.right_col * width,
      bottomRow: height - faceBoxFromAPi.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .initModel({
        id: "e466caa0619f444ab97497640cefc4dc",
        //version: "53e1df302c079b3db8a0a36033ed2d15",
      })
      .then((generalModel) => {
        return generalModel.predict(this.state.input);
      })
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      });
    console.log("submit");
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, input, box, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particles} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecon box={box} imageUrl={input} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
