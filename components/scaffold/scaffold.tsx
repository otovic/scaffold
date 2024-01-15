import { DimensionValue, ScrollView, StyleSheet, View } from "react-native";
import { ScaffoldProps } from "./scaffold_types";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { scaffoldStyles } from "./scaffold_styles";

const Scaffold = (props: ScaffoldProps) => {
    const [bottomNavBarHeight, setBottomBarHeight] = useState<DimensionValue>(getBottomNavBarHeight());
    const [topMargin, setTopMargin] = useState<DimensionValue>(calculateTopMargin());

    function getBottomNavBarHeight(): DimensionValue {
        const value = ((props.bottomNavBar as ReactElement).props.customStyle?.height);
        const borderTopWidth = ((props.bottomNavBar as ReactElement).props.customStyle?.borderTopWidth);
        if (value != undefined && value != null) {
            if (borderTopWidth != undefined && borderTopWidth != null) {
                return value + borderTopWidth;
            } else {
                return value + 1;
            }
        } else {
            if (borderTopWidth != undefined && borderTopWidth != null) {
                return 50 + borderTopWidth;
            } else {
                return 50 + 1;
            }
        }
    }

    function calculateTopMargin(): DimensionValue {
        const elevation = ((props.header as ReactElement).props.customStyle?.elevation);
        const height = ((props.header as ReactElement).props.customStyle?.height);
        if (elevation != undefined && elevation != null) {
            if (height != undefined && height != null) {
                return height + elevation;
            } else {
                return elevation + 70;
            }
        } else {
            if (height != undefined && height != null) {
                return height + 2;
            } else {
                return 70 + 2;
            }
        }
    }

    const scaffoldStyle = StyleSheet.create({
        cont: {
            width: "100%",
            height: "100%",
            backgroundColor: "orange",
            marginTop: topMargin,
            marginBottom: bottomNavBarHeight as DimensionValue,
            zIndex: 1,
        }
    })

    useEffect(() => {
        setBottomBarHeight(getBottomNavBarHeight());
        setTopMargin(calculateTopMargin())
        console.log("Scaffold: ", bottomNavBarHeight);
    }, [
        ((props.bottomNavBar as ReactElement).props.customStyle?.height),
        ((props.bottomNavBar as ReactElement).props.customStyle?.borderTopWidth),
        ((props.header as ReactElement).props.customStyle?.elevation),
        ((props.header as ReactElement).props.customStyle?.height)
    ])

    return (
        <View style={scaffoldStyles.scaffold}>
            {React.isValidElement(props.header) && props.header}
            <ScrollView style={scaffoldStyle.cont}>
                {React.isValidElement(props.body) && props.body}
            </ScrollView>
            {React.isValidElement(props.bottomNavBar) && props.bottomNavBar}
        </View>
    );
}

export default Scaffold;