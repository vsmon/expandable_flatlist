import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [detail, setDetail] = useState(false);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://192.168.0.201:3000/products');
        const data = await response.json();
        setData(data);
      } catch (error) {
        alert(error);
      }
    }
    getData();
  }, []);

  function handleDetail(pId) {
    const item = status.filter(item => item.id === pId);
    if (item.length === 0) {
      console.log(status);
    } else {
      const {id, detail} = item[0];
      const removedItem = status.filter(item => item.id !== id);
      removedItem.push({id, detail: !detail});
      setStatus(removedItem);
    }

    const teste = status.filter(item => item.id === pId);

    teste.map(item => {
      setId(item.id);
      setDetail(item.detail);
    });

    /* setId(pId);
    if (detail && pId === id) {
      setDetail(false);
    } else {
      setDetail(true);
    } */
  }
  return (
    <View style={{backgroundColor: 'blue', padding: 10, flex: 1}}>
      <Text>App</Text>
      <Text style={{color: '#FFF'}}>{id + String(detail)}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          return (
            <View
              style={{
                padding: 5,
                marginBottom: 5,
                backgroundColor: '#FFF',
                borderRadius: 5,
              }}>
              <Text>{item.title}</Text>
              {id === item.id && detail ? (
                <View>
                  <Text>{item.price}</Text>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 50, width: 50}}
                  />
                </View>
              ) : null}
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: '#CCC',
                  alignSelf: 'flex-end',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => handleDetail(item.id)}>
                <Text
                  style={{
                    fontSize: 24,
                  }}>
                  {id === item.id && detail ? '-' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
}
