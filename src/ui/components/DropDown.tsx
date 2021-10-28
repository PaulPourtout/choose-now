import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {ArrowDownIcon} from './icons/ArrowDownIcon';
import {TouchablePlatform} from './TouchablePlatform';

interface DropDownData<T> {
  label: string;
  data: T;
}

interface Props<T> {
  label?: string;
  onChange: (data: T) => void;
  data: DropDownData<T>[];
}

export function DropDown<T>({data, onChange, label}: Props<T>) {
  const [currentItem, setCurrentItem] = useState(0);
  const [closed, setClosed] = useState(true);

  const handleChange = (itemData: T, index: number) => {
    setCurrentItem(index);
    setClosed(true);
    onChange(itemData);
  };

  const handleToggleClose = () => setClosed(!closed);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchablePlatform onPress={handleToggleClose}>
        <View style={[styles.choiceWrapper, styles.currentChoiceBox]}>
          <Text style={styles.currentChoiceBoxLabel}>
            {data[currentItem].label}
          </Text>
          <ArrowDownIcon size={24} color="#000" />
        </View>
      </TouchablePlatform>
      {!closed && (
        <FlatList
          data={data}
          style={styles.choicesContainer}
          renderItem={({item, index}) => (
            <TouchablePlatform
              key={`${item.label}-${index}`}
              onPress={() => handleChange(item.data, index)}>
              <View
                style={[
                  styles.choiceWrapper,
                  styles.itemWrapper,
                  currentItem === index && styles.currentChoice,
                ]}>
                <Text>{item.label}</Text>
              </View>
            </TouchablePlatform>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 300,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  currentChoiceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6C6C6C',
  },
  currentChoiceBoxLabel: {
    flex: 1,
  },
  choicesContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    width: '100%',
    top: '100%',
    maxHeight: 400,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BEBEBE',
  },
  choiceWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  currentChoice: {
    backgroundColor: '#4ac679',
  },
  itemWrapper: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
  },
});
