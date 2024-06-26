import React from 'react';

const CreateTeam = ({
    team, handleCreateTeam, CreateNome, setCreateNome, createTrainer, setCreateTrainer
}) => {
  return (
    <main>
      <h2>Create Team</h2>
      <form class="form-group" onSubmit={handleCreateTeam}>
        <label class="form-label">Nome:</label>
        <input class="form-control" type="text" required value={CreateNome} onChange={(e) => setCreateNome(e.target.value)}/>

        <label class="form-label">Trainer:</label>	
        <input class="form-control" type="text" required value={createTrainer} onChange={(e) => setCreateTrainer(e.target.value)}/>

        <br/>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </main>
  );
};

export default CreateTeam;
