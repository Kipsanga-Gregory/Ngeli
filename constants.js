const { DatePickerAndroid } = require("react-native")

const BASE_URL = "http://1564f8ba9837.ngrok.io/graphql"
// const BASE_URL = "http://localhost:4000/graphql"

/*
    ::: THEMES
*/
const BLUE_THEME = 'rgba(1,146,252,1)'
const PURPLE_INTENSE_THEME = '#341f97' //RGB value is (52,31,151)
const PURPLE_LIGHT_THEME = '#5f27cd' //'rgb(95,39,205)'
const PURPLE_LIGHTER_BACKGROUND = '#4835a1'

/*
    ::: COLORS
*/
const BORDER_TINT = '#c2bbdf'
const GREEN_CHAT =  '#01a3a4' //rgb(1,163,164)
const HEART_PINK = '#f368e0'
const LOCATION_RED = '#ff6b6b'
const COOL_DARKGREY_TEXT = '#576574'
// const SUCCESS_GREEN = '#c8d6e5'
const SUCCESS_GREEN = '#01a3a4'

module.exports = {
    BASE_URL,
    BLUE_THEME,
    PURPLE_INTENSE_THEME,
    PURPLE_LIGHT_THEME,
    PURPLE_LIGHTER_BACKGROUND,
    HEART_PINK,
    GREEN_CHAT,
    BORDER_TINT,
    LOCATION_RED,
    COOL_DARKGREY_TEXT,
    SUCCESS_GREEN
}
