import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Rating } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApiCall from '../utils/Apicall';
import Colors from '../utils/Colors';

const ProductListing = () => {

    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setIsLoading(true);
            const productlist = await ApiCall("https://dummyjson.com/products");
            setProductsData(productlist.products);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

    const priceAfterDiscount = (price, percentage) => {
        let amt = price * (percentage / 100);
        amt = price - amt;
        return amt.toFixed(2);
    }

    const RatingStars = ({ rating }) => {
        return (
            <View style={styles.ratingContainer}>
                <Rating
                    style={styles.rating}
                    readonly
                    startingValue={rating}
                    imageSize={17}
                    fractions={2}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.parentContainer}>
                {
                    productsData ? (
                        <FlatList
                            data={productsData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity key={item.id} style={styles.cardMain}>
                                    <View style={styles.cardImageView}>
                                        <Image
                                            resizeMode='contain'
                                            source={{ uri: item.thumbnail }}
                                            style={styles.cardImage}
                                        />
                                    </View>
                                    <View style={styles.cardDesc}>
                                        <Text style={styles.cardTitle}>
                                            {item.title}
                                        </Text>
                                        <View style={styles.ratingRow}>
                                            <Text style={styles.ratingText}>
                                                {item.rating}
                                            </Text>
                                            <RatingStars rating={item.rating} />
                                        </View>
                                        <View style={styles.priceRow}>
                                            <View style={styles.discountRow}>
                                                <Icon name="rupee" size={13} color="#000" />
                                                <Text style={styles.cardDiscountPrice}>
                                                    {priceAfterDiscount(item.price, item.discountPercentage)}
                                                </Text>
                                            </View>
                                            <Text style={styles.cardPrice}>
                                                {item.price}
                                            </Text>
                                            <Text style={styles.discountPercentageText}>({item.discountPercentage}% off)</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <View style={styles.errorText}>
                            <Text style={styles.errorMessage}>Something went wrong!</Text>
                            <Text style={styles.errorMessage}>Please try again later...</Text>
                        </View>
                    )
                }
            </View>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundPrimary,
    },
    parentContainer: {
        flex: 1,
        marginHorizontal: scale(8),
        marginTop: verticalScale(8),
    },
    cardMain: {
        flexDirection: 'row',
        backgroundColor: Colors.backgroundCard,
        borderWidth: 1,
        borderRadius: scale(7),
        borderColor: Colors.cardBorder,
        marginBottom: verticalScale(8),
    },
    cardImageView: {
        justifyContent: 'center',
        borderRadius: 10,
    },
    cardImage: {
        height: verticalScale(100),
        aspectRatio: 1
    },
    cardDesc: {
        flex: 1,
        marginHorizontal: scale(7),
        marginVertical: scale(7),
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
    },
    ratingRow: {
        flexDirection: 'row',
    },
    ratingText: {
        textAlignVertical: 'center',
        marginRight: scale(5),
        fontSize: 15,
        color: '#1230AE',
    },
    ratingContainer: {
        backgroundColor: 'transparent',
        padding: 3,
    },
    rating: {
        backgroundColor: 'transparent',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardPrice: {
        fontSize: 15,
        marginRight: scale(3),
        textDecorationLine: 'line-through',
        color: 'red',
    },
    cardDiscountPrice: {
        fontSize: 20,
        fontWeight: '500',
        marginRight: scale(10),
        marginLeft: scale(2),
        color: '#000',
    },
    discountPercentageText: {
        color: '#000',
    },
    errorText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 30,
        fontWeight: '600',
        color: '#000',
    },
    spinnerTextStyle: {
        color: '#000',
    }
});

export default ProductListing;
