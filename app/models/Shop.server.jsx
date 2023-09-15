import prisma from "~/db.server"
import { checkBilling } from "./Billing.server"

export default class Shop {
  constructor(shop, graphql) {
    this.shopUrl =  shop
    this.graphql =  graphql
  }
  PLANS = [
    {
      title: "Free",
      cost: 0
    },
    {
      title: "Standard",
      cost: 9
    },
    {
      title: "Advanced",
      cost: 19
    }
  ]

  async setupShop() {
    let shopData = await this.getShop()

    if( !shopData) {
      shopData = await this.createShop()
    }

    const billingStatus = await checkBilling(this.shop, this.graphql)

    return {
      ...billingStatus
    }
  }

  async changePlan(to){

  }

  async getShop() {
    // TODO: Check if shop is in db

    return null
  }
  async createShop() {
    // TODO: create shop in database with
    // just pass this.shopUrl
    // TODO: return  new created shop
    return {}
  }
}
