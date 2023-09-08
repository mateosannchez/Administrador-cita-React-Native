import React from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet } from 'react-native'
//import { obtenerFechaActual } from '../helpers'

const InformacionPaciente = ({ paciente, setPaciente, setModalPaciente }) => {

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
        <View style={styles.contenedor}>

            <SafeAreaView>
                <Text style={styles.form}>Información Paciente</Text>
                <View>
                    <Pressable
                        style={styles.cerrar}
                        onLongPress={() => {
                            setModalPaciente(false)
                            setPaciente({})
                        }}
                    >
                        <Text style={styles.cerrarText}>Cerrar</Text>
                    </Pressable>
                </View>

                <View style={styles.contenido}>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.valor}>{paciente.paciente}</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Propietario:</Text>
                        <Text style={styles.valor}>{paciente.propietario}</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.valor}>{paciente.email}</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Teléfono:</Text>
                        <Text style={styles.valor}>{paciente.telefono}</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha de alta:</Text>
                        <Text style={styles.valor}>{fechaHoy}</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Síntomas:</Text>
                        <Text style={styles.valor}>{paciente.sintomas}</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#e0e0e0',
        flex: 1,
    },
    form: {
        color: 'white',
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '900',
        top: 15,
    },
    cerrar: {
        marginVertical: 30,
        backgroundColor: '#dd0404',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10
    },
    cerrarText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    contenido: {
        backgroundColor: '#fff',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    campo:{
        marginBottom: 10,
    },
    label: {
        textTransform: 'uppercase',
        color: 'red',
        fontWeight: '600',
        fontSize: 12,
    }, 
    valor:{
        fontWeight: '700',
        fontSize: 19,
        color: 'gray'
    },
});

export default InformacionPaciente