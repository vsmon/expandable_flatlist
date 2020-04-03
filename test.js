const lista = [];

lista.push({id: 1, status: false});
lista.push({id: 2, status: true});
lista.push({id: 3, status: false});
lista.push({id: 4, status: true});

function handleDetail(pId) {
  const item = lista.filter(item => item.id === pId);
  console.log(item);
  if (item.length === 0) {
    console.log('passei1');
    lista.push({id: pId, status: true});
  } else {
    console.log('passei2');
    const {id, status} = item[0];
    const removedItem = lista.filter(item => item.id !== pId);
    console.log(status);
    removedItem.push({id, status: !status});
    console.log(removedItem);
  }
}

handleDetail(4);
