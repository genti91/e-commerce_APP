import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getAllProducts } from '../../redux/actions';
const { REACT_APP_URL } = process.env;

export default function WhishList() {
  
  return (
    <View>
      <Text>Whish List</Text>
      <StatusBar style="auto" />
    </View>
  );
}