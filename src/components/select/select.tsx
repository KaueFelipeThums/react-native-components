import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle, DimensionValue, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Empty} from '../empty';
import {BottomSheet, BottomSheetHandle} from '../bottomSheet';
import useTheme from '../../providers/theme-provider';
import {Input} from '../inputs';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon, IconNameType} from '../icon';

type SelectOptions = {
  label: string;
  value: string | number;
  description?: string;
  disabled?: boolean;
};

type SelectProps = {
  value?: string | number;
  options?: SelectOptions[];
  disabled?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  showSearch?: boolean;
  error?: boolean;
  onChangeValue?: (value: string | number) => unknown;
  modalHeight?: DimensionValue;
  icon?: IconNameType;
  onSearch?: (value: string) => unknown;
};

export const Select = React.memo(
  ({
    onChangeValue,
    error = false,
    value,
    options,
    icon,
    placeholder = 'Selecione uma opção',
    disabled,
    style,
    onSearch,
    showSearch = false,
    modalHeight = '60%',
  }: SelectProps) => {
    const {theme} = useTheme();
    const bottomSheetRef = useRef<BottomSheetHandle>(null);
    const [search, setSearch] = useState<string>('');

    const styles = StyleSheet.create({
      descriptionContainer: {
        flexShrink: 1,
        flexGrow: 1,
      },
      container: {
        height: 45,
        flexDirection: 'row',
        borderColor: error ? COLORS[theme].red : COLORS[theme].itemBorder,
        borderWidth: 1.5,
        paddingHorizontal: 10,
        backgroundColor: COLORS[theme].itemBackground,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        gap: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: SIZES.radius,
        borderWidth: 2,
        borderColor: 'transparent',
        gap: 10,
      },
      selected: {
        backgroundColor: `${COLORS[theme].primary}25`,
      },
      listContainer: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: 10,
      },
      text: {
        ...FONTS.body4,
        color: COLORS[theme].text,
      },
      section: {
        paddingHorizontal: SIZES.padding,
        marginTop: 10,
      },
      disabled: {
        opacity: 0.5,
      },
      description: {
        ...FONTS.body5,
        color: COLORS[theme].textVariant,
      },
      placeholder: {
        ...FONTS.body4,
        color: COLORS[theme].textVariant,
      },
      flex: {
        flex: 1,
      },
    });

    const open = React.useCallback((): void => {
      setSearch('');
      bottomSheetRef.current?.open();
    }, []);

    const close = React.useCallback((): void => {
      setSearch('');
      bottomSheetRef.current?.close();
    }, []);

    const handleSearch = React.useCallback((searchValue: string) => {
      setSearch(searchValue);
      onSearch && onSearch(searchValue);
    }, []);

    const handleChange = React.useCallback((value: string | number) => {
      onChangeValue && onChangeValue(value);
      close();
    }, []);

    const RenderItem = ({
      value: itemValue,
      label: itemLabel,
      description: itemDescription,
      disabled: itemDisabled,
    }: SelectOptions) => {
      return (
        <TouchableOpacity
          disabled={disabled || itemDisabled}
          activeOpacity={0.6}
          style={[styles.itemContainer, value === itemValue && styles.selected, itemDisabled && styles.disabled]}
          onPress={() => handleChange(itemValue)}>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {itemLabel}
            </Text>
            {itemDescription && (
              <Text numberOfLines={1} style={styles.description}>
                {itemDescription}
              </Text>
            )}
          </View>
          {value === itemValue && <Icon name="Check" color={COLORS[theme].primary} size={22} />}
        </TouchableOpacity>
      );
    };

    const selectedValue = options?.find(el => el.value === value);
    const optionsFiltered = onSearch ? options : React.useMemo(() => handleFilter(options, search), [options, search]);

    return (
      <React.Fragment>
        <BottomSheet title={'Selecione uma opção'} ref={bottomSheetRef} height={modalHeight}>
          <View style={styles.flex} onStartShouldSetResponder={() => true}>
            {showSearch && (
              <View style={styles.section}>
                <Input.Text value={search} icon="Search" placeholder="Pesquisar..." onChangeText={handleSearch} />
              </View>
            )}

            <FlatList
              contentContainerStyle={styles.listContainer}
              data={optionsFiltered}
              ListEmptyComponent={<Empty />}
              renderItem={({item}) => <RenderItem {...item} />}
              keyExtractor={item => item.value?.toString()}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              onScroll={e => e.stopPropagation()}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </BottomSheet>

        <TouchableOpacity disabled={disabled} activeOpacity={0.6} style={[styles.container, style]} onPress={open}>
          {icon && <Icon color={COLORS[theme].textVariant} name={icon} size={22} />}
          <View style={styles.descriptionContainer}>
            {selectedValue?.label ? (
              <Text numberOfLines={1} style={styles.text}>
                {selectedValue?.label}
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.placeholder}>
                {placeholder}
              </Text>
            )}
          </View>
          <Icon color={COLORS[theme].textVariant} size={22} name="ChevronDown" />
        </TouchableOpacity>
      </React.Fragment>
    );
  },
);

const handleFilter = (data: SelectOptions[] = [], search: string): SelectOptions[] => {
  if (data.length === 0) {
    return [];
  }
  const filtered_data = data?.filter(e => e?.label?.toString()?.toLowerCase()?.includes(search?.toLowerCase()));
  return filtered_data;
};
