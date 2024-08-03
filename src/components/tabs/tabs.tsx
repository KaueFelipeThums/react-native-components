import React, {useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';

type ItemType = {
  disabled?: boolean;
  label: string;
  value: string | number;
};

type TabsProps = {
  items?: ItemType[];
  value?: string | number;
  disabled?: boolean;
  onChnage?: (value?: string | number) => unknown;
};

const Tabs = ({items, value, disabled, onChnage}: TabsProps) => {
  const {theme} = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const styles = {
    text: {
      ...FONTS.body3,
      color: COLORS[theme].text,
    },
    list: {
      paddingHorizontal: SIZES.padding,
      paddingBottom: 10,
      gap: 10,
    },
    itemContainer: {
      flexGrow: 1,
      padding: 6,
      paddingHorizontal: 15,
      backgroundColor: COLORS[theme].itemBackground,
      borderRadius: SIZES.radius,
      opacity: disabled ? 0.8 : 1,
    },
    selectedText: {
      ...FONTS.h3,
      color: COLORS[theme].white,
    },
    selectedContainer: {
      backgroundColor: COLORS[theme].primary,
    },
  };

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index});
    }
  };

  const handleChangeTab = (valueSelected: string | number, index: number) => {
    scrollToIndex(index);
    onChnage && onChnage(valueSelected);
  };

  const Item = ({label: itemLabel, value: itemValue, disabled: itemDisabled, index}: ItemType & {index: number}) => {
    return (
      <TouchableOpacity
        disabled={disabled || itemDisabled}
        activeOpacity={0.8}
        onPress={() => handleChangeTab(itemValue, index)}
        style={[styles?.itemContainer, value === itemValue && styles?.selectedContainer]}>
        <Text style={[styles?.text, value === itemValue && styles?.selectedText]}>{itemLabel}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={el => el.value?.toString()}
        renderItem={({item, index}) => <Item {...item} index={index} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export {Tabs};
