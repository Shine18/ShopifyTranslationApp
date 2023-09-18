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

    const billingStatus = await checkBilling(this.shopUrl, this.graphql)

    return {
      ...billingStatus
    }
  }

  async changePlan(to){

  }

  async getShop() {
    // TODO: Check if shop is in db
    const shopExist=await prisma.shop.findFirst({
      where: {
        shop: this.shopUrl ,
      },
    })
    console.log("checking shop exist or not",shopExist);
    return shopExist
  }
  async createShop() {
    // TODO: create shop in database with


      const createShop=await prisma.shop.create({
        data: {
          shop:this.shopUrl
        }
      })

      console.log("new shop created",createShop)
      return createShop;


    // just pass this.shopUrl
    // TODO: return  new created shop

  }
}
