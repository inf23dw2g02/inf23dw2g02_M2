import React from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import { NavLink, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Digimon from "./Resources/Digimon";
import EditDigimon from "./Options/Edit_Digimon";
import CreateDigimon from "./Options/Create_Digimon";


import Trainer from "./Resources/Trainer";
import EditTrainer from "./Options/Edit_Trainer";
import CreateTrainer from "./Options/Create_Trainer";

import Battle from "./Resources/Battle";
import EditBattle from "./Options/Edit_Battle";
import CreateBattle from "./Options/Create_Battle";

import Tipo from "./Resources/Tipo";
import EditTipo from "./Options/Edit_Tipo";
import CreateTipo from "./Options/Create_Tipo";

const request = axios.create({
  withCredentials: true,
});

const api = request.create({
  baseURL: "http://localhost:3006", // Update this to the correct port if needed
});

const App = () => {

  const navigate = useNavigate();
  // ----------------------------------------------------- HandleEditDigimon -----------------------------------------------------
  //Definição de estados para props para a Ediçao do digimon

  const [editNomeDigimon, setEditNomeDigimon] = useState("");

  const [digimon, setPosts] = React.useState([]);

  //fetchDigimon para popular array de digimon
  React.useEffect(() => {
    const fetchDigimon = async () => {
      const response = await api.get("/Digimon");
      setPosts(response.data);
    };
    fetchDigimon();
  }, []);

  //função handleEditDigimon
  const handleEditDigimon = async (id) => {
    const updatedDigimon = {
      id_digimon,
      nome: editNomeDigimon,
    };
    try {
      const response = await api.put(`Digimon/${id}`, updatedDigimon);
      setPosts(digimon.map((digimon) => (digimon.id === id ? { ...response.data } : digimon)));
      setEditNomeDigimon("");
      navigate("/Digimon");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditDigimon -----------------------------------------------------
  // -----------------------------------------------------  HandleCreateDigimon -----------------------------------------------------
  const [createNomeDigimon, setCreateNomeDigimon] = useState("");
  const [createTipo1, setCreateTipo1] = useState("");
  const [createTipo2, setCreateTipo2] = useState("");

  const handleCreateDigimon = async (e) => {
    e.preventDefault();
    const createDigimon = {
      nome: createNomeDigimon,
      Tipo1: createTipo1,
      Tipo2: createTipo2,
    };
    try {
      const response = await api.post("/Digimon", createDigimon);
      const allDigimon = [...digimon, response.data];
      setPosts(allDigimon);
      setCreateNomeDigimon("");
      setCreateTipo1("");
      setCreateTipo2("");
      navigate("/Digimon");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // ----------------------------------------------------- Fim HandleCreateDigimon -----------------------------------------------------
  // ----------------------------------------------------- HandleEditTrainer -----------------------------------------------------
  const [editNomeTrainer, setEditNomeTrainer] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editIsADMIN, setEditIsADMIN] = useState("");

  const [trainers, setTrainers] = React.useState([]);

  //fetchTrainers para popular array de treinadores
  React.useEffect(() => {
    const fetchTrainers = async () => {
      const response = await api.get("/Trainers");
      setTrainers(response.data);
    };
    fetchTrainers();
  }, []);

  //função handleEditTrainer
  const handleEditTrainer = async (id) => {
    const updatedTrainer = {
      id_trainer,
      nome: editNomeTrainer,
      password: editPassword,
      is_admin: editIsADMIN,
    };
    try {
      const response = await api.put(`Trainer/${id}`, updatedTrainer);
      setPosts(
        trainers.map((trainer) =>
          trainer.id_trainer === id ? { ...response.data } : trainer
        )
      );
      setEditNomeTrainer("");
      setEditPassword("");
      setEditIsADMIN("");
      navigate("/Trainer");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditTrainer -----------------------------------------------------
  // -----------------------------------------------------  HandleCreateTrainer -----------------------------------------------------
  const [createNomeTrainer, setCreateNomeTrainer] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createIsADMIN, setCreateIsADMIN] = useState("");

  const handleCreateTrainer = async (e) => {
    e.preventDefault();
    const createTrainer = {
      nome: createNomeTrainer,
      password: createPassword,
      is_admin: createIsADMIN,
    };
    try {
      const response = await api.post("/Trainers", createTrainer);
      const allTrainers = [...trainers, response.data];
      setPosts(allTrainers);
      setCreateNomeTrainer("");
      setCreatePassword("");
      setCreateIsADMIN("");
      navigate("/Trainer");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // ----------------------------------------------------- Fim HandleCreateTrainer -----------------------------------------------------
  // ----------------------------------------------------- HandleEditTeam -----------------------------------------------------
  const [editNomeTeam, setEditNomeTeam] = useState("");
  const [editTrainer, setEditTrainer] = useState("");

  const [team, setTeam] = React.useState([]);

  //fetchTrainers para popular array de treinadores
  React.useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get("/Team"); // Verify this endpoint
        setTeam(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchTeam();
  }, []);

  const handleEditTeam = async (id) => {
    const updatedTeam = {
      id_team,
      nome: editNomeTeam,
      id_trainer: editTrainer,
    };
    try {
      const response = await api.put(`Team/${id}`, updatedTeam); // Verify this endpoint
      setPosts(
        team.map((team) =>
          team.id_team === id ? { ...response.data } : team
        )
      );
      setEditNomeTeam("");
      setEditTrainer("");
      navigate("/Team");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditTeams -----------------------------------------------------
  // -----------------------------------------------------  HandleCreateTeams -----------------------------------------------------
  const [createNomeTeam, setCreateNomeTeam] = useState("");
  const [createIDTrainer, setCreateIDTrainer] = useState("");

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const createTeam = {
      name: createNomeTeam,
      id_trainer: createIDTrainer,
    };
    try {
      const response = await api.post("/Team", createTeam); // Verify this endpoint
      const allTeam = [...team, response.data];
      setPosts(allTeam);
      setCreateNomeTeam("");
      setCreateIDTrainer("");
      navigate("/Team");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // ----------------------------------------------------- Fim HandleCreateTeam -----------------------------------------------------
  // ----------------------------------------------------- HandleEditTipo -----------------------------------------------------
  const [editNameTipo, setEditNameTipo] = useState("");

  const [tipos, setTipos] = React.useState([]);

  React.useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await api.get("/Tipos"); // Verify this endpoint
        setTipos(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchTipos();
  }, []);

  const handleEditTipo = async (id) => {
    const updatedTipo = {
      id_tipo,
      tipo: editNameTipo,
    };
    try {
      const response = await api.put(`Tipo/${id}`, updatedTipo); // Verify this endpoint
      setPosts(
        tipos.map((tipo) =>
          (tipo.id === id ? { ...response.data } : tipo)
        )
      );
      setEditNameTipo("");
      navigate("/Tipos");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditTipo -----------------------------------------------------
  // ----------------------------------------------------- HandleCreateTipo -----------------------------------------------------
  const [createNomeTipo, setCreateNomeTipo] = useState("");

  const handleCreateTipo = async (e) => {
    e.preventDefault();
    const createTipo = {
      tipo: createNomeTipo,
    };
    try {
      const response = await api.post("/Tipos", createTipo);
      const allTipos = [...tipos, response.data];
      setTipos(allTipos);
      setCreateNomeTipo("");
      navigate("/Tipos");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleCreateTipo -----------------------------------------------------
  // ----------------------------------------------------- HandleEditBattle -----------------------------------------------------
  const [editDigimon_id, setEditDigimon_id] = useState("");
  const [editTrainer_id, setEditTrainer_id] = useState("");


  const [battle, setBattle] = React.useState([]);

  React.useEffect(() => {
    const fetchBattle = async () => {
      const response = await api.get("/Battle");
      setBattle(response.data);
    };
    fetchBattle();
  }, []);

  const handleEditBattle = async (id) => {
    const updatedBattle = {
      id_battle,
      id_digimon: editDigimon_id,
      id_trainer: editTrainer_id,
    };
    try {
      const response = await api.put(`Battle/${id}`, updatedBattle);
      setBattle(
        battle.map((battle) =>
          battle.id_digimon === id ? { ...response.data } : battle
        )
      );
      setEditDigimon_id("");
      setEditTrainer_id("");
      navigate("/Battle");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditBattle -----------------------------------------------------
  // ----------------------------------------------------- HandleCreateBattle -----------------------------------------------------
  const [createDigimon_id, setCreateDigimon_id] = useState("");
  const [createTrainer_id, setCreateTrainer_id] = useState("");

  const handleCreateBattle = async (e) => {
    e.preventDefault();
    const createBattle = {
      digimon_id: createDigimon_id,
      trainer_id: createTrainer_id,
    };
    try {
      const response = await api.post("/Battle", createBattle);
      const allBattle = [...battle, response.data];
      setBattle(allBattle);
      setCreateDigimon_id("");
      setCreateTrainer_id("");
      navigate("/Battle");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleCreateBattle -----------------------------------------------------

  return (
    <div className="app">
      <h1>Digimon</h1>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Digimon" element={<Digimon />}></Route>
        <Route exact path="/Battles" element={<Battle />}></Route>
        <Route exact path="/Tipos" element={<Tipo />}></Route>
        <Route
          path="/Digimon/:id"
          element={
            <EditDigimon
              digimon={digimon}
              handleEditDigimon={handleEditDigimon}
              editName={editName}
              setEditName={setEditName}
            />
          }
        ></Route>
        <Route
          exact
          path="/Digimon/create"
          element={
            <CreateDigimon
              digimon={digimon}
              handleCreateDigimon={handleCreateDigimon}
              createName={createName}
              setCreateName={setCreateName}
              createTipo1={createTipo1}
              setCreateTipo1={setCreateTipo1}
              createTipo2={createTipo2}
              setCreateTipo2={setCreateTipo2}

            />
          }
        ></Route>
        <Route
          path="/Trainer/:id"
          element={
            <EditTrainer
              trainers={trainers}
              handleEditTrainer={handleEditTrainer}
              editNameTrainer={editNameTrainer}
              setEditNameTrainer={setEditNameTrainer}
            />
          }
        ></Route>
        <Route
          exact
          path="/Trainer/create"
          element={
            <CreateTrainer
              trainers={trainers}
              handleCreateTrainer={handleCreateTrainer}
              createNameTrainer={createNameTrainer}
              setCreateNameTrainer={setCreateNameTrainer}
            />
          }
        ></Route>
        <Route
          path="/Tipo/:id"
          element={
            <EditTipo
              tipos={tipos}
              handleEditTipo={handleEditTipo}
              editNameTipo={editNameTipo}
              setEditNameTipo={setEditNameTipo}
            />
          }
        ></Route>
        <Route
          exact
          path="/Tipo/create"
          element={
            <CreateTipo
              tipos={tipos}
              handleCreateTipo={handleCreateTipo}
              createNameTipo={createNameTipo}
              setCreateNameTipo={setCreateNameTipo}
            />
          }
        ></Route>
        <Route
          path="/Battles/:id"
          element={
            <EditBattle
              battle={battle}
              handleEditBattle={handleEditBattle}
              editDigimon_id={editDigimon_id}
              setEditDigimon_id={setEditDigimon_id}
              editTrainer_id={editTrainer_id}
              setEditTrainer_id={setEditTrainer_id}
            />
          }
        ></Route>
        <Route
          exact
          path="/Battles/create"
          element={
            <CreateBattle
              battle={battle}
              handleCreateBattle={handleCreateBattle}
              createDigimon_id={createDigimon_id}
              setCreateDigimon_id={setCreateDigimon_id}
              createTrainer_id={createTrainer_id}
              setCreateTrainer_id={setCreateTrainer_id}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <a href="http://localhost:3000/"><i class="bi bi-arrow-return-left"></i></a>
      </li>
      <li>
        <NavLink to="/"><i class="bi bi-house-door-fill"></i></NavLink>
      </li>
      <li>
        <NavLink to="/Trainer">Trainers</NavLink>
      </li>
      <li>
        <NavLink to="/Digimon">Digimon</NavLink>
      </li>
      <li>
        <NavLink to="/Battles">Battles</NavLink>
      </li>
      <li>
        <NavLink to="/Tipos">Tipos</NavLink>
      </li>
    </ul>
  </nav>
);

// ------------------------------- VISTAS -------------------------------

const Home = () => (
  <div className="home">
    <h1>Interface Desenvolvida em React para a API Digimon</h1>
    <div>
      André Rodrigues - a041851
    </div>
  </div>
);

// ----------------------------- FIM VISTAS -----------------------------

export default App;
