import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let list = [];
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setRefresh(true);
      const response = await fetch('http://192.168.0.23:3000/products');
      const dataJson = await response.json();
      setData(dataJson);

      dataJson.map((item) => {
        list.push({id: item.id, detail: false});
      });
      setStatus(list);
      setRefresh(false);
    } catch (error) {
      alert(error);
    }
  }
  function handleDetail(pId) {
    const oldItem = status.filter((item) => item.id === pId);

    const newItem = {id: oldItem[0].id, detail: !oldItem[0].detail};

    const temp = status.filter((item) => item.id !== pId);

    temp.push(newItem);

    setStatus(temp);
  }
  return (
    <View style={styles.container}>
      <Text>App</Text>

      <FlatList
        onRefresh={getData}
        refreshing={refresh}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <Text>{item.title}</Text>
              {status.length !== 0 &&
              status.filter((it) => it.id === item.id)[0].detail ? (
                <View>
                  <Text>{item.price}</Text>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 50, width: 50}}
                  />
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.buttonDetail}
                onPress={() => handleDetail(item.id)}>
                <Text
                  style={{
                    fontSize: 24,
                  }}>
                  {status.length !== 0 &&
                  status.filter((it) => it.id === item.id)[0].detail
                    ? '-'
                    : '+'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 10,
    flex: 1,
  },
  item: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  buttonDetail: {
    height: 20,
    width: 20,
    backgroundColor: '#CCC',
    alignSelf: 'flex-end',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
