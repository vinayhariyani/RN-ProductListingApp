import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Colors from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import ApiCall from "../utils/Apicall";
import Spinner from "react-native-loading-spinner-overlay";
import { verticalScale, scale } from "react-native-size-matters";
import { Rating } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { priceAfterDiscount } from "../utils/CommonFunctions";

const ProductDetails = (props) => {
    const id = props?.route?.params;

    const navigation = useNavigation();
    const [productDetails, setproductDetails] = useState([]);
    const [productImage, setProductImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [review, setReview] = useState([])

    const getData = async () => {
        try {
            setIsLoading(true);
            const productDetails = await ApiCall(`https://dummyjson.com/products/${id}`);
            setproductDetails(productDetails);
            setProductImage(productDetails?.images);
            setReview(productDetails.reviews)
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)
    }

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

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

    const goBack = () => {
        navigation.navigate("ProductListing");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: 'center', paddingVertical: verticalScale(15), paddingHorizontal: scale(10), backgroundColor: Colors.headerBgColor }}>
                <TouchableOpacity onPress={goBack}>
                    <Icon name="arrow-back" size={25} color="#000" />
                </TouchableOpacity>
                <Text style={{ marginLeft: scale(10), fontSize: 20, color: '#000', fontWeight: '500' }}>{productDetails?.title}</Text>
            </View>
            {
                productDetails ? (
                    <ScrollView style={{ marginHorizontal: scale(8) }}>
                        <View style={styles.imageView}>
                            {productImage[0] && (
                                <Image
                                    resizeMode='contain'
                                    source={{ uri: productImage[0] }}
                                    style={styles.productImage}
                                />
                            )}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(7), marginBottom: verticalScale(15) }}>
                            <Text style={styles.productTitle}>
                                {productDetails?.brand}
                            </Text>
                            <View style={styles.ratingRow}>
                                <Text style={styles.ratingText}>
                                    {productDetails?.rating}
                                </Text>
                                <RatingStars rating={productDetails?.rating} />
                            </View>
                        </View>

                        <View style={{ marginHorizontal: scale(7), marginBottom: verticalScale(5) }}>
                            <Text style={{ fontSize: 15 }}>{productDetails?.description}</Text>
                        </View>

                        <View style={{ marginHorizontal: scale(7), marginBottom: verticalScale(15) }}>
                            <View style={{ flexDirection: 'row', marginBottom: verticalScale(5) }}>
                                <Text style={{ fontSize: 26, marginRight: scale(10), color: 'red' }}>-{productDetails?.discountPercentage}%</Text>
                                <Icon1 name="rupee" size={17} color="#000" style={{ alignSelf: 'center', marginRight: scale(2) }} />
                                <Text style={{ fontSize: 26, color: '#000', fontWeight: '700' }}>{priceAfterDiscount(productDetails?.price, productDetails?.discountPercentage)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 19, }}>M.R.P.: </Text>
                                <Text style={{ fontSize: 19, textDecorationLine: "line-through" }}><Icon1 name="rupee" size={17} style={{ alignSelf: 'center', marginRight: scale(2) }} />{productDetails?.price}</Text>
                            </View>
                        </View>

                        <View style={{ marginHorizontal: scale(7), flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(15) }}>
                            <Text style={{ fontSize: 19, color: 'green', marginRight: scale(10), }}>In Stock:</Text>
                            <Text style={{ fontSize: 19, borderWidth: 1, borderColor: Colors.cardBorder, paddingHorizontal: scale(5), paddingVertical: verticalScale(5), borderRadius: 10, backgroundColor: Colors.backgroundCard, }}>Qty: {productDetails?.stock}</Text>
                        </View>

                        <View style={{ marginHorizontal: scale(7), marginBottom: verticalScale(5), flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 19, marginRight: scale(10), fontWeight: '500', }}>Dimensions:</Text>
                            <Text style={{ fontSize: 19, marginRight: scale(10), flexWrap: 'wrap' }}>
                                {productDetails?.dimensions?.width}W * {productDetails?.dimensions?.height}H * {productDetails?.dimensions?.depth}D
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: scale(7), marginBottom: verticalScale(5), flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 19, marginRight: scale(10), fontWeight: '500', }}>Category:</Text>
                            <Text style={{ fontSize: 19, marginRight: scale(10), }}>
                                {productDetails?.category}
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: scale(7), }}>
                            <Text style={{ fontSize: 19, marginRight: scale(10), fontWeight: '500', marginBottom: verticalScale(5), }}>Reviews:</Text>
                            <FlatList
                                data={review}
                                horizontal
                                style={{ marginBottom: verticalScale(20) }}
                                renderItem={({ item }) => (
                                    <View style={{ fontSize: 19, borderWidth: 1, borderColor: Colors.cardBorder, paddingHorizontal: scale(15), paddingVertical: verticalScale(5), borderRadius: 10, backgroundColor: Colors.backgroundCard, marginRight: scale(10), }}>
                                        <Text style={{ fontSize: 17, textAlign: 'center', marginBottom: verticalScale(5) }}>{item.comment}</Text>
                                        <RatingStars rating={item?.rating} />
                                        <Text style={{ textAlign: 'center', marginTop: verticalScale(5) }}>by {item.reviewerName}</Text>
                                    </View>
                                )}
                            />
                        </View>

                    </ScrollView>
                ) : (
                    <View style={styles.errorText}>
                        <Text style={styles.errorMessage}>Something went wrong!</Text>
                        <Text style={styles.errorMessage}>Please try again later...</Text>
                    </View>
                )
            }

            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundPrimary,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        aspectRatio: 1
    },
    productTitle: {
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
})

export default ProductDetails;