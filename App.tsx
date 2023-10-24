// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, FlatList, Modal, SafeAreaView, Pressable, Alert } from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [text, setText] = useState('');

  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = AsyncStorage.getItem('citas')
        if (citasStorage) {
          setPacientes(JSON.parse())
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
    obtenerCitasStorage()
  }, [])

  
  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id == id)
    setPaciente(pacienteEditar[0]);
  }

  const pacienteEliminar = id => {
    
    const citasFiltradas = pacientes.filter(pacientesState => pacientesState.id !== id)
    
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        {
          text: 'Si, eliminar', onPress: () => {
            
            setPacientes(citasFiltradas)
            guardarCitasStorage(JSON.stringify(citasFiltradas))

          }
        }
      ]
    )
  }

  const nuevoBoton = () => {
    console.log("nuevo botón");
  }

  const cerrarModal = () => {
    setModalVisible(false)
  }

  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <View style={styles.container}>
      {/* <SafeAreaView> */}
      {/* <ScrollView> */}

      <Text style={styles.h1}>Administrador de citas</Text>

      <Text style={styles.veterinaria}>Veterinaria</Text>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Nueva cita</Text>
      </Pressable>

      {/* <TouchableOpacity/> */}

      {pacientes.length === 0 ?
        <Text style={styles.noPacientes}>No hay pacientes</Text>
        :
        <FlatList
          style={styles.flatlist}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
              />
            )
          }}
        />
      }

      {modalVisible && (
        <Formulario
          modalVisible={modalVisible}
          cerrarModal={cerrarModal}
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
          guardarCitasStorage={guardarCitasStorage}
        />
      )}

      <Modal
        visible={modalPaciente}
        animationType='fade'
      >
        <InformacionPaciente
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>
      {/* </ScrollView> */}
      {/* </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0'
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },

  item: {
    backgroundColor: 'red',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  btn: {
    backgroundColor: '#ff3c00',
    width: '90%',
    padding: 10,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10
  },
  btnText: {
    color: "white",
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 19,
    fontWeight: 'bold',
  },
  h1: {
    width: '100%',
    textAlign: 'center',
    fontSize: 23,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'flex-start',
    bottom: 0,
  },
  veterinaria: {
    fontWeight: '900',
    color: '#ff3c00',
    fontSize: 22,
    bottom: 9,
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  flatlist: {
    marginTop: 50,
    marginHorizontal: 30,
  }
});
