import {saveTask, getAllTasks, onGetAllTasks, deleteTask, updateTask} from './firebase.js';

window.addEventListener('DOMContentLoaded', async () => {

    onGetAllTasks((querySnapshot) => {
        let html = '';
    
        querySnapshot.forEach(doc => {
            const task = doc.data();
            const verifyCheck = task.state == true ? '<input type="checkbox" value="" class="checkTask" checked' : '<input type="checkbox" value="" class="checkTask" ';
            const setStyleDoneTask = task.state == true ? 'tareaTerminada' : '';
            html += `
                <div class="form-check d-flex align-items-baseline ${setStyleDoneTask}">
                    ${verifyCheck} data-id="${doc.id}" > &nbsp;
                    <h5>${task.description}</h5>&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="btn-delete fa-solid fa-sm fa-delete-left text-danger" data-id="${doc.id}"></i>
                </div>
                    `
        });
        
        $contenedorTareas.innerHTML = html;
        const btnsDelete = $contenedorTareas.querySelectorAll('.btn-delete');
        const checks = $contenedorTareas.querySelectorAll('.checkTask');
        
        btnsDelete.forEach( btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                deleteTask(dataset.id);
            })
        })
        
        checks.forEach( check => {
            check.addEventListener('click', ({target: {dataset}}) => {
                updateTask(dataset.id, {
                    state : $(check).is(':checked'),
                });
            })
        })
        
    });
    
    
    $btnGuardarTarea.onclick = () => {

		let task = $('#inputNuevaTarea').val();
        var state = false;

		saveTask(task, state); //Guardamos en Firebase
		$inputNuevaTarea.value = "";                
	};
})

const $btnGuardarTarea = document.querySelector("#btnAgregarTarea");
const $inputNuevaTarea = document.querySelector("#inputNuevaTarea");
const $contenedorTareas = document.querySelector("#contenedorTareas");