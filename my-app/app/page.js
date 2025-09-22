'use client';

import { useState } from 'react';
import './page.css';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: inputValue, 
        completado: false 
      }]);
      setInputValue('');
    } else {
      alert('Por favor ingrese una tarea antes de guardar');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completado: !task.completado } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="contenedor">
      <h2>To-Do Lista de tareas</h2>
      
      <div className="asignarTarea">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Asignar tarea..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>
          Guardar Tarea
        </button>
      </div>

      <h2>Lista de tareas</h2>
      
      <div id="resultado" className={tasks.length === 0 ? "listareas" : "listaele"}>
        {tasks.length === 0 ? (
          "No hay tareas asignadas aun..."
        ) : (
          tasks.map(task => (
            <div key={task.id} className="elemento">
              <input
                type="checkbox"
                checked={task.completado}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.completado ? 'completado' : ''}>
                {task.text}
              </span>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="BtnEliminar"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}