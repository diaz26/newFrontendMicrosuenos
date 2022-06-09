import React from 'react';
import { Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CameraAPP extends React.Component {

  constructor(props) {
    super(props)
    this.initialState = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      eyeRigth: 0,
      eyeLeft: 0,
      valuesEyes: [],
      porcentajeComparar: 10
    };
    this.state = this.initialState
    this.file_path = '../../machine_learning/images/microsueno'
  }

  // Detector de camara
  detectFaces = async imageUri => {
    const options = { mode: FaceDetector.FaceDetectorMode.fast };
    return await FaceDetector.detectFacesAsync(imageUri, options);
  };

  handleFacesDetected = ({ faces }) => {
    try {
      /* Si detecta rasgos faciales  */
      if (faces.length > 0) {
        /* Transforma los datos obtenidos de apertura ocular en porcentaje de 5 decimales */
        let newReadLeft = parseFloat((faces[0]['leftEyeOpenProbability'] * 100).toFixed(5));
        let newReadRigth = parseFloat((faces[0]['rightEyeOpenProbability'] * 100).toFixed(5));

        /** convierte los valores obtenidos en porcentajes promedio teniendo en cuenta el porcentaje de apertura del registro */
        const averageLeft = (newReadLeft > this.state.eyeLeft) ? newReadLeft : parseFloat((newReadLeft * 100 / this.state.eyeLeft).toFixed(5));
        const averageRigth = (newReadRigth > this.state.eyeRigth) ? newReadRigth : parseFloat((newReadRigth * 100 / this.state.eyeRigth).toFixed(5));

        /** inserta los nuevos valores */
        this.state.valuesEyes.push({
          left: averageLeft,
          rigth: averageRigth
        })

        /** si los porcentajes calculados son menores a 10, da indicio de microsueño */
        if (this.state.valuesEyes.length >= 4 && (averageLeft <= this.state.porcentajeComparar || averageRigth <= this.state.porcentajeComparar)) {

          /** se procede a verificar los porcentajes de los últimos 2 segundos  */
          /** recorre los 3 últimos registros */
          let longArray = this.state.valuesEyes.length - 1;
          let detectaMicrosueño = true;

          while (longArray > (this.state.valuesEyes.length - 4) && detectaMicrosueño) {
            let record = this.state.valuesEyes[longArray];
            // compara los valores del registro recorrido
            detectaMicrosueño = (record.left <= this.state.porcentajeComparar || record.rigth <= this.state.porcentajeComparar);
            longArray--;
          }
          /** si los 3 últimos registros (1,5 segundos atrás) dan indicios de microsueños, se reporte el microsueño */
          if (detectaMicrosueño) {
            this.acumuladorMicrosueño();
          }
        }
        /** se almacenan solo los 100 últimos registros  */
        if (this.state.valuesEyes.length > 100) {
          this.state.valuesEyes.shift();
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  async acumuladorMicrosueño() {
    this.props.navigation.navigate('Action')
  }

  async componentDidMount() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const eyeRigth = await AsyncStorage.getItem('eyeRigth');
    const eyeLeft = await AsyncStorage.getItem('eyeLeft');
    await this.setState({
      hasCameraPermission: (status === 'granted'),
      eyeRigth: parseFloat(eyeRigth),
      eyeLeft: parseFloat(eyeLeft)
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>La aplicación no tiene acceso a la cámara</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={(ref) => { this.camera = ref }}
            onFacesDetected={this.handleFacesDetected}
            faceDetectorSettings={
              {
                mode: FaceDetector.FaceDetectorMode.accurate,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications: FaceDetector.FaceDetectorClassifications.all,
                minDetectionInterval: 500,
                tracking: true,
              }
            }
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'column-reverse',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Cambiar </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}