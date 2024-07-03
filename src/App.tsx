import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Reference from './components/Reference';
import Footer from './components/Footer';
import Skills from './components/Skills';
import Comic from './components/Comic';
import './css/normalize.css';
import './css/style.css';
import './css/states.css';

const App: React.FC = () => {
    return (
      <Router>
        <div className="app">
          <Header />
          <Hero />
          <About />
          <Projects />
          <Reference />
          <Skills />
          <Comic />
          <Footer />
        </div>
      </Router>
    );
  };

export default App;