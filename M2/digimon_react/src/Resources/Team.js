import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const team = "http://localhost:3000/Team";

const request = axios.create({
    withCredentials: true,
  });

export default function Team() {
    const [regs, setPosts] = React.useState(null);
    const [, setState] = React.useState(null);
  
    React.useEffect(() => {
      request.get(team).then((response) => {
        setPosts(response.data);
      });
    }, []);
  
    function deleteTeam(event) {
      const deletedId = event.currentTarget.dataset.index;
      request.delete(`${team}/${deletedId}`).then(() => {
        regs.splice(
          regs.findIndex((el) => String(el.id_team) === String(deletedId)), 1
        );
        setPosts(regs);
        setState({});
      });
    }
  
    if (!regs) return null;
    return (
      <div>
        <Link to={`/Team/create`}><button style={{"margin-bottom": "20px"}} class="btn btn-success">Create Team</button></Link>
        <table style={{textAlign: "center"}} class="table table-striped table-dark" border="solid 1px">
          <thead>
            <tr>
              <th width="4%">#</th>
              <th width="25%">Nome</th>
              <th width="25%">Id_trainer</th>
              <th width="10%" colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            {regs.map((reg, i) => (
              <tr key={i}>
                <td>{reg.id_team}</td>
                <td>{reg.nome}</td>
                <td>{reg.id_team}</td>
                <td>
                  <Link to={`/Team/${reg.id_team}`}><button class="btn btn-primary">Update</button></Link>
                </td>
                <td>
                  <button class="btn btn-danger" data-index={reg.id} onClick={deleteTeam}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }