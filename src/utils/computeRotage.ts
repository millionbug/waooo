interface Coordinates {
    latitude: number;
    longitude: number;
}

export function computeRotage(A: Coordinates, B: Coordinates, distance: number) {
    const x = B.latitude - A.latitude;
    const y = B.longitude - A.longitude;
    const D = distance^2;
    const rule = D / (x^2 + y^2);
    const result = {
        x: rule * x,
        y: rule * y
    };
    console.log(result)
    return result;
    // return {
    //     x: rule * x,
    //     y: rule * y
    // }
    // return {
    //     x,
    //     y
    // }
}