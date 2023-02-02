import { ref } from 'vue'
import { defineStore } from 'pinia'
import { weatherServices } from "@/services/weatherServices";
import type { IWeather, ICoord } from "@/services/type";
import type { AxiosResponse } from "axios";

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref<Array<IWeather>>(JSON.parse(localStorage.getItem('store') || '[]' ))

  const getCityWeather = async (name: string) => {
    const { data } : AxiosResponse<IWeather> = await weatherServices.getCityWeather(name)
    if(weatherList.value.find(el => el.id === data.id)) return
    weatherList.value.push(data)
    setLocalStorage()
  }

  const getGeoLocationWeather = async (lat: number, lon: number) => {
    const { data } : AxiosResponse<IWeather> = await weatherServices.getWeatherInPoint(lat, lon)
    if(weatherList.value.find(el => el.id === data.id)) return false    
    weatherList.value.push(data)
    setLocalStorage()
  }

  const removeByid = (id: number) => {
    weatherList.value = weatherList.value.filter(el => el.id !== id)
    setLocalStorage()
  }

  const setLocalStorage = () => {
    localStorage.setItem('store', JSON.stringify(weatherList.value))
  }

  const updateStore = async () => {
    const newStore: Array<IWeather> = []

    for(const item of weatherList.value) {
      const { data } : AxiosResponse<IWeather> = await weatherServices.getCityWeather(item.name)
      newStore.push(data)
    }

    if(newStore) {
      weatherList.value = newStore
      setLocalStorage()
    }
  }


  function sortWeatherList(first: number, second: number) {
    [weatherList.value[first], weatherList.value[second]] = [weatherList.value[second], weatherList.value[first]]
    setLocalStorage()
  }

  return { weatherList, getGeoLocationWeather, updateStore, getCityWeather, removeByid, sortWeatherList }
})
