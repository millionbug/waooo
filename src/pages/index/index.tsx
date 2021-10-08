import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  navigationTo = (url: string) => {
    Taro.navigateTo({
      url
    })
  }

  render () {
    return (
      <View className='container'>
        <Text className="btn-option" onClick={() => this.navigationTo('/pages/legend/component/index')}>今日王者运势</Text>
        <Text className="btn-option" onClick={() => this.navigationTo('/pages/menu/component/index')}>今日下饭运势</Text>
      </View>
    )
  }
}
