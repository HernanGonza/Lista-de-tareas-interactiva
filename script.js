const botonAgregar = document.getElementById('botonAgregar');
const miTabla = document.getElementById('miTabla');
let draggingRow;

botonAgregar.addEventListener('click', function () {
  const nuevaFila = miTabla.insertRow();
  nuevaFila.draggable = true;

  for (let i = 0; i < 6; i++) {
    const celda = nuevaFila.insertCell();

    switch (i) {
      case 0:
        const inputTarea = document.createElement('input');
        inputTarea.type = 'text';
        inputTarea.placeholder = 'Ingrese una tarea';
        celda.appendChild(inputTarea);
        break;
      case 1:
        const inputFecha = document.createElement('input');
        inputFecha.type = 'date';
        inputFecha.placeholder = 'Ingrese una fecha';
        celda.appendChild(inputFecha);
        break;
      case 2:
        const selectEstado = document.createElement('select');
        selectEstado.type = 'select';
        selectEstado.id = 'estado';
        selectEstado.name = 'estado';
        const option1 = document.createElement('option');
        option1.setAttribute('value', 'elegir');
        const option1Texto = document.createTextNode('Seleccione una opción');
        option1.appendChild(option1Texto);
        selectEstado.appendChild(option1);
        const option2 = document.createElement('option');
        option2.setAttribute('value', 'pendiente');
        const option2Texto = document.createTextNode('Pendiente');
        option2.appendChild(option2Texto);
        selectEstado.appendChild(option2);
        const option3 = document.createElement('option');
        option3.setAttribute('value', 'terminada');
        const option3Texto = document.createTextNode('Terminada');
        option3.appendChild(option3Texto);
        selectEstado.appendChild(option3);
        const option4 = document.createElement('option');
        option4.setAttribute('value', 'cancelada');
        const option4Texto = document.createTextNode('Cancelada');
        option4.appendChild(option4Texto);
        selectEstado.appendChild(option4);
        const option5 = document.createElement('option');
        option5.setAttribute('value', 'enCurso');
        const option5Texto = document.createTextNode('En curso');
        option5.appendChild(option5Texto);
        selectEstado.appendChild(option5);
        celda.appendChild(selectEstado);
        break;
      case 3:
        const botonGuardar = document.createElement('button');
        botonGuardar.type = 'button';
        botonGuardar.innerText = 'Guardar';
        botonGuardar.id = 'botonGuardar';
        celda.appendChild(botonGuardar);
        break;
      case 4:
        const botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.innerText = 'Editar';
        botonEditar.id = 'botonEditar';
        botonEditar.style.visibility = 'hidden';
        celda.appendChild(botonEditar);
        break;
      case 5:
        const botonEliminar = document.createElement('button');
        botonEliminar.type = 'button';
        botonEliminar.innerText = 'Eliminar';
        botonEliminar.className = 'botonEliminar';
        celda.appendChild(botonEliminar);
        break;
    }
  }
});

miTabla.addEventListener('click', function (event) {
  if (event.target.classList.contains('botonEliminar')) {
    const rowToRemove = event.target.closest('tr');
    const tableBody = miTabla.tBodies[0];
    tableBody.removeChild(rowToRemove);
  }

  if (event.target.id === 'botonGuardar') {
    const botonGuardar = event.target;
    const row = botonGuardar.closest('tr');
    const inputs = row.querySelectorAll('input, select');

    inputs.forEach((input) => {
      input.disabled = true;
    });

    botonGuardar.style.visibility = 'hidden';
    const selectedOption = row.querySelector('#estado').value;
    row.style.backgroundColor = getColorForOption(selectedOption);
    row.querySelector('#botonEditar').style.visibility = 'visible';
  }

  if (event.target.id === 'botonEditar') {
    const botonEditar = event.target;
    const row = botonEditar.closest('tr');
    const inputs = row.querySelectorAll('input, select');

    inputs.forEach((input) => {
      input.disabled = false;
    });

    botonEditar.style.visibility = 'hidden';
    row.querySelector('#botonGuardar').style.visibility = 'visible';
  }
});

miTabla.addEventListener('dragstart', function (event) {
  draggingRow = event.target.closest('tr');
  event.dataTransfer.effectAllowed = 'move';
});

miTabla.addEventListener('dragover', function (event) {
  event.preventDefault();
});

miTabla.addEventListener('drop', function (event) {
  event.preventDefault();
  const targetRow = event.target.closest('tr');

  if (!draggingRow || draggingRow === targetRow) {
    return;
  }

  const targetRowIndex = targetRow.rowIndex;
  const tableBody = miTabla.tBodies[0];
  tableBody.removeChild(draggingRow);

  if (targetRowIndex === 0) {
    tableBody.insertBefore(draggingRow, tableBody.firstChild);
  } else {
    const prevRow = tableBody.rows[targetRowIndex - 1];
    tableBody.insertBefore(draggingRow, prevRow.nextSibling);
  }
});

function getColorForOption(option) {
  switch (option) {
    case 'pendiente':
      return '#0000FF';
    case 'terminada':
      return '#45a049';
    case 'cancelada':
      return '#ff0000';
    case 'enCurso':
      return '#FFFF00';
    default:
      return '';
  }
}
