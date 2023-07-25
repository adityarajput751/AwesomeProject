import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProductListing = ({route}) => {
  const item = route.params;
  const [productList, setProductList] = useState();
  const [sortOrder, setSortOrder] = useState('asc');
  const navigation = useNavigation();

  useEffect(() => {
    Data();
  }, []);

  const Data = async () => {
    try {
      const response = await fetch(
        'https://www.innopadsolutions.com/projects/androidapi/webservice/getProduct',
      );
      const jsonData = await response.json();
      setProductList(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const sortByCategory = () => {
    const sortedList = [...productList?.data].sort((a, b) =>
      sortOrder === 'asc'
        ? a.category_name.localeCompare(b.category_name)
        : b.category_name.localeCompare(a.category_name),
    );
    setProductList({data: sortedList});
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByPrice = () => {
    const sortedList = [...productList?.data].sort((a, b) =>
      sortOrder === 'asc'
        ? parseFloat(a.product_price) - parseFloat(b.product_price)
        : parseFloat(b.product_price) - parseFloat(a.product_price),
    );
    setProductList({data: sortedList});
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.product_name}</Text>
      <Text>{item.category_name}</Text>
      <Text>{item.product_price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.userDetails}> Welcome {item.username}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={sortByCategory}>
          <Text>
            Sort by Category {sortOrder === 'asc' ? '(A-Z)' : '(Z-A)'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sortByPrice}>
          <Text>
            Sort by Price {sortOrder === 'asc' ? '(Low-High)' : '(High-Low)'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={productList?.data}
        renderItem={renderItem}
        keyExtractor={item => item.product_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  userDetails: {
    textAlign: 'right',
    paddingBottom: 5,
    paddingRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  item: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 150,
    marginBottom: 10,
    marginLeft: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProductListing;
