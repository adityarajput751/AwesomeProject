import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const AddProductScreen = () => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectCategory = selectedCategory?.id;

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const response = await fetch(
        'https://www.innopadsolutions.com/projects/androidapi/webservice/getCategory',
      );
      const jsonData = await response.json();
      setCategoryList(jsonData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePicker = () => {
    const options = {
      title: 'Select Product Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('cancelled image picker');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        setProductImage(response.uri);
      }
    });
  };

  const handleAddProduct = async () => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const isValidPrice = priceRegex.test(productPrice);
    if (!isValidPrice) {
      alert('Please enter a valid product price.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', productImage);
    formData.append('category_id', selectCategory);
    formData.append('product_name', productName);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
  
    try {
      const response = await axios.post(
        'https://www.innopadsolutions.com/projects/androidapi/webservice/AddProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Product added:', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.log(error);
      alert('Failed to add the product.');
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleImagePicker()}>
        {productImage ? (
          <Image source={{uri: productImage}} style={styles.productImage} />
        ) : (
          <Text style={styles.selectImageText}>Select Product Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={text => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={text => setProductPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={productDescription}
        onChangeText={text => setProductDescription(text)}
      />
      <View style={styles.categoryContainer}>
        <Text>Select Category:</Text>
        {categoryList.map(category => (
          <TouchableOpacity
            key={category.category_id}
            style={[
              styles.categoryItem,
              selectedCategory == category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text>{category.category_name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  selectImageText: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  categoryContainer: {
    width: '100%',
    marginBottom: 20,
  },
  categoryItem: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: 'lightblue',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddProductScreen;
