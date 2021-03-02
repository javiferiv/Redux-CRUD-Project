import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from './../actions/productoActions';


const Producto = ({ producto }) => {
    
    const { nombre, precio, id } = producto;
    
    const dispatch = useDispatch();
    const history = useHistory(); // Habilitar history para redirección

    //Confirmar si desea eliminar
    const confirmarEliminarProducto = id => {

        //Preguntar al usuario
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminarlo?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //Pasarlo al action
                dispatch(borrarProductoAction(id));
            }
        })
    }

    //Función que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`productos/editar/${producto.id}`);
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">{precio}€</span></td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >
                    Editar
                </button>
                    <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;