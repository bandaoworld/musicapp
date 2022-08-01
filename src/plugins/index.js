import { Col, Row, Icon, Swipe, SwipeItem, Popup } from 'vant';

let plugins = [
    Col, Row, Icon, Swipe, SwipeItem, Popup
]

export default function getVant(app) {
    plugins.forEach((item) => {
        return app.use(item)
    })
}