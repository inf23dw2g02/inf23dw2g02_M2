import React from 'react';

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditTeam = ({ handleEditTeam, editNome, setEditNome, editTrainer, setEditTrainer
}) => {
    const { id } = useParams();
    const team = team.find(team => (team.id_team).toString() === id);

    useEffect(() => {
        if (team) {
            setEditNome(team.nome);
            setEditTrainer(team.trainer);
        }
    }, [team, handleEditTeam])

    return (
        <div>
            {team && <>
                <h2>Edit Team #{id_team}</h2>
                <form class="form-group" onSubmit={(e) => e.preventDefault()}>
                    <label class="form-label">Nome:</label>
                    <input class="form-control" type="text" required value={editNome} onChange={(e) => setEditNome(e.target.value)} />
                    <br/>
                    <button class="btn btn-primary" type="submit" onClick={() => handleEditTeam(id)}>Submit</button>
                </form>
            </>}
            {!team && <>
                <p>Missing Team #{id_team}</p>
                <p>Check other <Link to='/Teams'>Team</Link>!</p>
            </>}
        </div>
    )
}

export default EditTeam;