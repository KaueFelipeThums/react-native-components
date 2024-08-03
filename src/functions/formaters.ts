import {default as Intl} from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

const maskMoney = (
  value: number | string,
  digits: number | undefined = 2,
  useGrouping: boolean | undefined = true,
): string => {
  const parsedValue = parseFloat(value?.toString()?.replace(',', '.'));
  if (isNaN(parsedValue)) return '';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: useGrouping,
  }).format(parsedValue);
};

const masCpf = (value: number | string): string => {
  return value
    ?.toString()
    ?.replace(/\D/g, '')
    ?.replace(/(\d{3})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d{1,2})/, '$1-$2')
    ?.replace(/(-\d{2})\d+?$/, '$1');
};

const maskPhone = (value: number | string): string => {
  return value
    ?.toString()
    ?.replace(/\D/g, '')
    ?.replace(/(\d{2})(\d)/, '($1) $2')
    ?.replace(/(\d{5})(\d)/, '$1-$2')
    ?.replace(/(-\d{4})(\d+?)$/, '$1');
};

const maskCep = (value: number | string): string => {
  return value
    ?.toString()
    ?.replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
};

const maskDate = (value: number | string): string => {
  return value
    ?.toString()
    ?.replace(/\D/g, '')
    ?.replace(/(\d{2})(\d)/, '$1/$2')
    ?.replace(/(\d{2})(\d)/, '$1/$2')
    ?.replace(/(\d{4})(\d)/, '$1');
};

const maskLetters = (value: number | string): string => {
  return value?.toString()?.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '');
};

const maskNumbers = (value: number | string): string => {
  return value?.toString()?.replace(/[^0-9]/g, '');
};

const parseToInt = (value: number | string): number => {
  var parsedValue = parseInt(value?.toString());
  return isNaN(parsedValue) ? 0 : parsedValue;
};

const parseToFloat = (value: number | string): number => {
  var parsedValue = parseFloat(value?.toString());
  return isNaN(parsedValue) || !isFinite(parsedValue) ? 0 : parsedValue;
};

const replaceToFloatValue = (value: number | string): number => {
  value = parseToFloat(value?.toString()?.replace(',', '.'));
  return parseToFloat(value);
};

const replaceToStringValue = (value: number | string): string => {
  return value?.toString()?.replace('.', ',');
};

const mask = {
  money: maskMoney,
  cpf: masCpf,
  phone: maskPhone,
  cep: maskCep,
  date: maskDate,
  letters: maskLetters,
  numbers: maskNumbers,
};

export {mask, parseToInt, parseToFloat, replaceToFloatValue, replaceToStringValue};
