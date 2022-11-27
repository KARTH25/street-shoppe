export const DeviceInfo = () => {
    // Getting Device Width
    let deviceWidth = window.screen.width;

    // Returning deviceType based on the device width
    return (deviceWidth > 576)? "lg" : "sm";
}

export default DeviceInfo
