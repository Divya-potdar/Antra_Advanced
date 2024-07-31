export default function Todos({tasks, handleDelete}){
    return (
        <ul>
          { tasks.map(task => (
                <div key={task.id} style={{ 'display': 'flex', 'listStyle': 'none' }}>
                  <input type="checkbox"></input>
                  <li>{task.name}</li>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>  
          )) }
      </ul>
    )
}