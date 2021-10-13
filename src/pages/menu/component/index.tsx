import { useState, useEffect, useMemo, useCallback, CSSProperties } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FetchPoi, Poi } from '../service/poi';
import { forNum, computeRotage } from '@utils';
import './index.scss';

type Location = Pick<Taro.getLocation.SuccessCallbackResult, 'latitude' | 'longitude'> | null;

export default function Index() {
  const [location, setLocation] = useState<Location>(null);
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

  const renderPois = useCallback((pois: Poi[], location: Location) => {
    let maxX, maxY;
    const luckNum = Math.floor(Math.random() * pois.length);
    const poisMap = pois.map(poi => {
      const poiLocation = poi.location;
      // 注意：后端返回的顺序竟然是反的
      const [longitude, latitude] = poiLocation.split(',').map((value) => {
        return Number(value) * 1000000;
      });
      const distance = Number(poi.distance);
      const {x, y} = computeRotage({
        latitude: Number(location?.latitude) * 1000000,
        longitude: Number(location?.longitude) * 1000000
      }, {
        latitude,
        longitude
      }, distance);
      const absX = Math.abs(x);
      const absY = Math.abs(y);
      maxX = maxX > absX ? maxX : absX;
      maxY = maxY > absY ? maxY : absY;

      return {
        x,
        y,
        name: poi.name,
        src: poi.photos[0]?.url || ''
      }
    });
    const ruleX = 80 / 2 / maxX;
    const ruleY = 80 / 2 / maxY;
    console.log(luckNum);
    return poisMap.map((poi, index) => {
      const y = ruleY * poi.y;
      const x = ruleX * poi.x;
      const style: CSSProperties = {
        position: 'absolute',
        top: (50 + y) + 'vh',
        left: (50 + x) + 'vw'
      };
      if (index === luckNum) {
        return <View style={{...style, zIndex: 1000}}>
          <Image className="poi-photo" key={poi.name} src={poi.src} />
          <Text>!!!{poi.name}</Text>
        </View>
      }
      return <Image className="poi-photo" style={style} key={poi.name} src={poi.src} />;
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
      {pois.length && renderPois(pois, location)}
    </View>
  );
}
