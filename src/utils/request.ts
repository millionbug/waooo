import Taro from "@tarojs/taro";
export function fetchJson<T>(url: string): Promise<T> {
    return Taro.request({
        url
    }).then(res => res.data);
};