import { Col, Row } from "react-bootstrap"
import storeItems from '../mock-data/items.json'
import StoreItem from "../components/StoreItem"

const Store = () => {

  return (
    <>
      <h1>Магазин</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
          {storeItems.map(e => (
            <Col key={e.id}><StoreItem {...e}/></Col>
          ))}
      </Row>
    </>
  )
}

export default Store