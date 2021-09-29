import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { RoleList, VocationList } from './role';
import { GoodWishes } from './goodWishes';
import './index.scss'

export default class Index extends Component {

  state = {
    luckRole: {src: '', alt: ''},
    luckVocatioin: '',
    goodWishes: ''
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  fortune = () => {
    const luckRole = RoleList[Math.floor(Math.random() * RoleList.length)];
    const luckVocatioin = VocationList[Math.floor(Math.random() * VocationList.length)];
    GoodWishes.then(wishes => {
      console.log(wishes, 'wishes')
      const luckWishes = wishes[Math.floor(Math.random() * wishes.length)];
      this.setState({
        goodWishes: luckWishes
      });
    })
    this.setState({
      luckRole,
      luckVocatioin
    })
  }

  render () {
    const { luckRole, luckVocatioin, goodWishes } = this.state;
    return (
      <View className='container'>
        {luckVocatioin && luckRole && <>
          <Image className="role-head" src={luckRole.src}></Image>
          <Text className="des-text">今日运势位置{luckVocatioin}</Text>
          <Text className="des-text">今日幸运英雄{luckRole.alt}</Text>
          <Text className="des-text">{luckRole.alt}: {goodWishes}</Text>
        </>}
        <Text onClick={this.fortune} className="start-btn">今日运势</Text>
      </View>
    )
  }
}
