import React, { useState, useEffect } from 'react'
import { Modal, ScrollView, View, Text, StyleSheet, Alert, TextInput, Button, Pressable } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';



const Formulario = ({ cerrarModal, modalVisible, setPacientes, pacientes, paciente: pacienteObj, setPaciente: setPacienteApp }) => {

    const [paciente, setPaciente] = useState('')
    const [id, setId] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [date, setDate] = useState(new Date())
    const [sintomas, setSintomas] = useState('')

    useEffect(() => {
        if (Object.keys(pacienteObj).length > 0) {
            setId(pacienteObj.id)
            setPaciente(pacienteObj.paciente)
            setPropietario(pacienteObj.propietario)
            setEmail(pacienteObj.email)
            setTelefono(pacienteObj.telefono)
            setDate(pacienteObj.date)
            setSintomas(pacienteObj.sintomas)
        }
    }, [pacienteObj])


    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowDatePicker(false);
    };

    const handleCita = () => {
        if ([paciente, propietario, email, date, sintomas].includes('')) {
            Alert.alert(
                'Campos incompletos',
                //[{text: 'Cancelar', style: 'cancel'}, {text: 'Ok'}]
            )

            return
        }

        const nuevoPaciente = {
            paciente,
            propietario,
            email,
            telefono,
            date,
            sintomas
        }

        if (id) {
            nuevoPaciente.id = id

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setPacienteApp({})

        } else {
            nuevoPaciente.id = Date.now()
            setPacientes([...pacientes, nuevoPaciente])
        }


        cerrarModal()
        setId('')
        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setDate(new Date())
        setSintomas('')
    }

    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
        >
            <View style={styles.contenedor}>
                <ScrollView>
                    <Text style={styles.form}>{pacienteObj.id ? 'Editar cita' : 'Nueva cita'}</Text>

                    <Pressable
                        style={styles.cerrar}
                        onLongPress={() => {
                            cerrarModal()
                            setPacienteApp({})
                            setId('')
                            setPaciente('')
                            setPropietario('')
                            setEmail('')
                            setTelefono('')
                            setDate(new Date())
                            setSintomas('')
                        }}
                    >
                        <Text style={styles.cerrarText}>Cerrar</Text>
                    </Pressable>

                    <View style={styles.FormLabel}>
                        <Text style={styles.label}>Nombre completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre'
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>

                    <View style={styles.FormLabel}>
                        <Text style={styles.label}>Nombre propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre propietario'
                            value={propietario}
                            onChangeText={setPropietario}
                        />
                    </View>

                    <View style={styles.FormLabel}>
                        <Text style={styles.label}>Email propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Email propietario'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.FormLabel}>
                        <Text style={styles.label}>Teléfono propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Teléfono propietario'
                            keyboardType='number-pad'
                            value={telefono}
                            onChangeText={setTelefono}
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.FormLabel}>
                        <Text style={styles.label}>Fecha de alta</Text>

                        <View style={styles.buttonFecha}>
                            <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.FormLabel}>
                        <Text style={styles.label}>Síntomas</Text>
                        <TextInput
                            style={[styles.input, styles.simtomasInput]}
                            placeholder='Síntomas'
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <Pressable
                        style={styles.nuevo}
                        onPress={handleCita}
                    >
                        <Text style={styles.nuevoText}>{pacienteObj.id ? 'Editar paciente' : 'Agregar paciente'}</Text>
                    </Pressable>

                </ScrollView>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#ff3c00',
        height: 680,
    },
    form: {
        color: 'white',
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '900',
        top: 15,
    },
    FormLabel: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    input: {
        backgroundColor: 'white',
        color: 'gray',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    label: {
        color: 'white',
        // marginBottom: 10,
        marginTop: 10,
        fontSize: 20,
    },
    simtomasInput: {
        height: 100,
    },
    buttonFecha: {
        color: 'red',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10
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
    nuevo: {
        marginVertical: 50,
        backgroundColor: '#e0e0e0',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10,
    },
    nuevoText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 16,
    },
})

export default Formulario;


