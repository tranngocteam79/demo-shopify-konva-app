import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Stage, Layer, Text, Star } from "react-konva";
import Scene from "./Scene.tsx";
import ControlPanel from "./ControlPanel.tsx";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Scene />
    </ChakraProvider>
  );
}

export default App;
