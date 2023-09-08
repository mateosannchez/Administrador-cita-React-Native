import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
//import { obtenerFechaActual } from '../helpers'

const Paciente = ({ item, setModalVisible, pacienteEditar, pacienteEliminar, setModalPaciente, setPaciente }) => {

    const { paciente, fecha, id } = item

    const obtenerFechaActual = () => {
        const opciones = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        const fechaActual = new Date().toLocaleDateString('es-ES', opciones);

        return fechaActual;
    };

    const fechaHoy = obtenerFechaActual();

    return (
        <Pressable
            onLongPress={() => {
                setModalPaciente(true)
                setPaciente(item)
            }}
        >
            <View style={styles.contenedor}>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{paciente}</Text>
                <Text style={styles.fecha}>{fechaHoy}</Text>

                <View style={styles.botones}>
                    <Pressable style={[styles.btn, styles.btnEditar]}
                        onLongPress={() => {
                            setModalVisible(true)
                            pacienteEditar(id)
                        }}
                    >
                        <Text style={styles.btnTexto}>Editar</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.btn, styles.btnEliminar]}
                        onLongPress={() => pacienteEliminar(id)}
                    >
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        marginVertical: 3,
    },
    label: {
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10,
    },
    texto: {
        color: '#ff3c00',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
    },
    fecha: {
        color: 'gray'
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    btnEditar: {
        backgroundColor: 'gray'
    },
    btnEliminar: {
        backgroundColor: '#dd0404'
    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: 'white'
    }
})

export default Paciente