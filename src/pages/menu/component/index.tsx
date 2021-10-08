import { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FetchPoi, Poi } from '../service/poi';
import { forNum } from '@utils';
import './index.scss';

export default function Index() {
  const [location, setLocation] = useState<Pick<Taro.getLocation.SuccessCallbackResult, 'latitude' | 'longitude'> | null>(null);
  const [pois, setPois] = useState<Poi[]>([]);
  const getLocation = useCallback(() => {
    Taro.getLocation({
        type: 'wgs84',
        success: (res) => {
          const latitude = res.latitude;
          const longitude = res.longitude;
          setLocation({
              latitude,
              longitude,
          });
        }
    })
  }, []);

  useEffect(() => {
    if (location) {
      FetchPoi({
        location: `${location?.latitude},${location?.longitude}`,
        radius: 1000,
        types: '050000'
      }).then(res => {
        if (res.status === '1') {
          setPois(res.pois);
        }
      });
    }
  }, [location?.latitude, location?.longitude]);

  const renderPois = useCallback((pois: Poi[]) => {
    return pois.map(poi => {

      return <Image key={poi.name} src={poi.photos[0]?.url || ''} />
    })
  }, []);

  const renderCircle = useCallback((num: number = 10) => {
    const r = 100 / num;
    const boxShadow = forNum(num).map((curr) => {
      const currR = curr * r;
      return <View className="blue-circle" key={currR} style={{
        position: 'absolute',
        width: `${currR}vh`,
        height: `${currR}vh`,
        top: `${50 - currR / 2}vh`,
        left: `50vw - ${currR / 2}vh`,
      }}>
      </View>
    });
    return boxShadow;
  }, []);

  // latitude 经度  longitude 纬度
  // const { latitude, longitude } = location || {};
  return (
    <View className="container">
      <Text className="btn-option" onClick={getLocation}>
        获取用户地址
      </Text>
      <View className="x-line">
      </View>
      <View className="y-line">
      </View>
      {renderCircle()}
      {pois.length && renderPois(pois)}
    </View>
  );
}
