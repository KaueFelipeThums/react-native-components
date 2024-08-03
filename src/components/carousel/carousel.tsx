import {View, Animated, StyleSheet} from 'react-native';
import React, {ReactNode, useRef} from 'react';
import useTheme from '../../providers/theme-provider';
import {COLORS, SIZES} from '../../constants/default-theme';

type Carousel = {
  children?: ReactNode;
  width?: number | 'auto' | `${number}%`;
};

const Carousel = ({children, width = SIZES.width}: Carousel) => {
  const {theme} = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
    },
    dotContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: SIZES?.padding,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      borderRadius: 4,
      margin: 6,
      height: 4, // Update the height here
    },
    item: {
      flex: 1,
      width: width,
    },
  });

  // DOTS
  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, width);

    if (React.Children.count(children) <= 1) return null;

    return (
      <View style={styles.dotContainer}>
        {React.Children.map(children, (_, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS[theme].textVariant, COLORS[theme].text, COLORS[theme].textVariant],
            extrapolate: 'clamp',
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [4, 8, 4],
            extrapolate: 'clamp',
          });

          return <Animated.View key={index} style={[styles.dot, {width: dotWidth, backgroundColor: dotColor}]} />;
        })}
      </View>
    );
  };

  const carouselItems = React.Children.map(children, (child, index) => {
    return (
      <View key={index} style={styles.item}>
        {child}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={carouselItems}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}
        maxToRenderPerBatch={2}
        pinchGestureEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => item}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        overScrollMode="never"
      />
      <Dots />
    </View>
  );
};

export {Carousel};
