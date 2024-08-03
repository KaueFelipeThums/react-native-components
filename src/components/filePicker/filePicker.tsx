import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon, IconNameType} from '../icon';
import {Button} from '../buttons';

type FilePickerProps = {
  onChangeValue?: (value: any) => unknown;
  acceptTypes?: Array<(typeof types)[keyof typeof types]>;
  multiple?: boolean;
  disabled?: boolean;
  icon?: IconNameType;
  error?: boolean;
  fileList?: any[];
};

export const FilePicker = ({
  onChangeValue,
  error,
  fileList,
  icon,
  disabled,
  multiple = false,
  acceptTypes = [types.allFiles],
}: FilePickerProps) => {
  const {theme} = useTheme();

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
    text: {
      ...FONTS.body4,
      color: COLORS[theme].text,
    },
    fileListContent: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    fileListContainer: {
      padding: 5,
      gap: 5,
    },
  });

  const handleDocumentPicker = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'pageSheet',
        type: acceptTypes,
        allowMultiSelection: multiple ?? false,
      });
      if (response.length > 0) {
        onChangeValue && onChangeValue(response);
      }
    } catch (error) {}
  };

  const removeItem = useCallback(
    (array: any[], index: number) => {
      const arraySpliced = array.filter((_, i) => i !== index);
      onChangeValue && onChangeValue(arraySpliced);
    },
    [onChangeValue],
  );

  return (
    <>
      <TouchableOpacity disabled={disabled} activeOpacity={0.6} style={styles.container} onPress={handleDocumentPicker}>
        {icon && <Icon color={COLORS[theme].textVariant} name={icon} size={22} />}
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={1} style={styles.text}>
            Selecione um arquivo
          </Text>
        </View>
        <Icon color={COLORS[theme].textVariant} name="Paperclip" size={20} />
      </TouchableOpacity>

      <View style={styles.fileListContainer}>
        {fileList?.map((element: any, index: number) => {
          return (
            <View key={element.uri} style={styles.fileListContent}>
              <Text numberOfLines={1} style={[styles.text, styles.descriptionContainer]}>
                {element.name}
              </Text>
              <Button.IconText
                disabled={disabled}
                onPress={() => removeItem(fileList, index)}
                size={30}
                iconSize={20}
                color={COLORS[theme].red}
                icon="Trash2"
              />
            </View>
          );
        })}
      </View>
    </>
  );
};
