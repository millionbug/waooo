import Taro from "@tarojs/taro";
export function fetchJson<T>(options: Taro.request.Option): Promise<T> {
    return Taro.request(options).then(res => res.data);
};