import React, { useState, useRef } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Animated } from "react-native";
import { twMerge } from "tailwind-merge";

interface SwitchProps {
    className?: string;
    onValueChange?: (value: boolean) => void;
    value?: boolean;
    trackColor?: { false: string, true: string }
    thumbColor?: string
}

const Switch: React.FC<SwitchProps> = ({ className, onValueChange, value, trackColor, thumbColor }) => {
    const [switchValue, setSwitchValue] = useState(value || false);
    const translateXAnim = useRef(new Animated.Value(value ? 20 : 2)).current;

    const handleValueChange = () => {
        const newValue = !switchValue;
        setSwitchValue(newValue);
        onValueChange && onValueChange(newValue);
        Animated.timing(translateXAnim, {
            toValue: newValue ? 20 : 2,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const baseThumbColor = {
        baseClass: `${thumbColor ? thumbColor : "bg-white dark:bg-black"}`,
    }

    const baseTrackColor = {
        baseClass: `${trackColor ? switchValue ? trackColor.true : trackColor.false : switchValue ? "bg-black dark:bg-white" : "bg-gray-300 dark:bg-zinc-800 "}`,
    }

    return (
        <TouchableWithoutFeedback onPress={handleValueChange}>
            <View style={styles.container} className={twMerge(className)}>
                <View
                    className={twMerge(baseTrackColor.baseClass)}
                    style={[
                        styles.track,
                    ]}
                />
                <Animated.View
                    className={twMerge(baseThumbColor.baseClass)}
                    style={[
                        styles.thumb,
                        {
                            transform: [{ translateX: translateXAnim }],
                        },
                    ]}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 22,
        width: 40,
        borderRadius: 25,
        overflow: 'hidden'
    },
    track: {
        height: 22,
        width: 40,
        position: "absolute",
        borderRadius: 25,
        overflow: "hidden",
    },
    thumb: {
        width: 18,
        height: 18,
        borderRadius: 20,
        position: "absolute",
    },
});

export { Switch };
