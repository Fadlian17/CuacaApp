import React,{useState} from 'react';
import { TextInput,Button,Card } from 'react-native-paper';
import {View,Text, FlatList} from 'react-native'
import Header from './Header'

export default Search =({navigation})=> {

    //deskripsi variabel
    const [city,setCity] = useState('')
    const [cities,setCities] = useState([])
    const fetchCities = (text)=>{
        setCity(text)
        fetch("https://autocomplete.wunderground.com/aq?query="+text)
        .then(item=>item.json())    
        .then(cityData=>{
            setCities(cityData.RESULTS.slice(0,9))
        })
    }

    //navigasi data 
    const btnClick = ()=>{
        navigation.navigate("home",{city:city})
    }

    const listClick =(cityname)=>{
        setCity(cityname)
        navigation.navigate("home",{city:cityname})
    }

    return (
        <View style={{flex:1}}>
            <Header name="Search Screen"/>
            <TextInput
                label="city name"
                theme={{colors:{primary:"#00aaff"}}}
                value={city}
                onChangeText={(text)=>fetchCities(text)}
            />

        <Button icon="content-save" mode="contained" theme={{colors:{primary:"#00aaff"}}} style={{margin:20}} onPress={() => btnClick()}>
            <Text style={{color:"white"}}>Press me</Text>
        </Button>

        <FlatList
            data={cities}
            renderItem={({item})=>{
                return(
                    <Card style={{margin:2,padding:12}} onPress={()=>listClick(item.name)}>
                        <Text>{item.name}</Text>
                    </Card>
                )
            }}
            keyExtractor={item=>item.name}
        />
        </View>
    );
}