import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [detail, setDetail] = useState(false);
  const [status, setStatus] = useState([]);
  let list = [];
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://192.168.0.201:3000/products');
        const dataJson = await response.json();
        setData(dataJson);
      } catch (error) {
        alert(error);
      }
    }
    getData();
  }, []);
  function handleDetail(pId) {
    if (list.length !== data.length) {
      list = [];
      data.map(item => {
        list.push({id: item.id, detail: false});
      });
    }

    const oldItem = list.filter(item => item.id === pId);

    const newItem = {id: oldItem[0].id, detail: !oldItem[0].detail};

    list = list.filter(item => item.id !== pId);

    list.push(newItem);

    console.log(list);

    const item = list.filter(item => item.id === pId);
    const {id, detail} = item[0];

    setStatus(list);

    setId(id);
    setDetail(detail);
    console.log(status);
    /* setId(pId);
    if (detail && pId === id) {
      setDetail(false);
    } else {
      setDetail(true);
    } */
  }
  return (
    <View style={{backgroundColor: 'blue', padding: 10, flex: 1}}>
      <FlatList
        data={status}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white'}}>{item.id}</Text>
            <Text style={{color: 'white'}}>{String(item.detail)}</Text>
          </View>
        )}
        keyExtractor={item => String(item.id)}
      />
      <Text>App</Text>

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
