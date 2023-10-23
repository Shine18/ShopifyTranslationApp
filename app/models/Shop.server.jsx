import prisma from "~/db.server"
import { checkBilling, createCharge, saveCharge } from "./Billing.server"

export const PLANS = [
  {
    id: 0,
    title: "Free",
    amount: 0
  },
  {
    id: 1,
    title: "Standard",
    amount: 9
  },
  {
    id: 2,
    title: "Advanced",
    amount: 19
  }
]





export default class Shop {
  constructor(shop, graphql) {
    this.shopUrl = shop
    this.graphql = graphql
    this.shop = null
  }

  PLANS = PLANS

  async setupShop() {
    let shopData = await this.getShop()

    if (!shopData) {
      shopData = await this.createShop()
    }

    let billingStatus = {}
    const currentPlan = await this.getCurrentPlan()
    if (currentPlan?.id === 0) {
      billingStatus = { isPaid: true }
    } else if (currentPlan == null) {

      billingStatus = { isNewShop: true }

    }
    else {
      billingStatus = await checkBilling(this.shopUrl, this.graphql, currentPlan)
    }
    console.log("billing shop",billingStatus);
    return {
      ...billingStatus
    }
  }

  async changePlan(to) {
    await this.getShop()

    if (this.shop && this.shop.plan !== to) {
      // change plan in database
      await prisma.shop.update({
        where: {
          id: this.shop.id
        },
        data: {
          plan: to.id
        }
      })
      const chargeData = await createCharge(this.shopUrl, this.graphql, to)
      if (chargeData) {
        await saveCharge(this.shopUrl, chargeData?.id, chargeData?.confirmationUrl)
        const status = await checkBilling(this.shopUrl, this.graphql, to)
        return status
      }
    } else {
      return false
    }
  }

  async getCurrentPlan() {
    await this.getShop()

    if (this.shop) {
      return this.PLANS[this.shop.plan]
    }
    return null
  }

  async getShop() {
    const shopExist = await prisma.shop.findFirst({
      where: {
        shop: this.shopUrl,
      },
    })
    if (shopExist) {
      this.shop = shopExist
    }
    return shopExist
  }
  async createShop() {
    const createShop = await prisma.shop.create({
      data: {
        shop: this.shopUrl
      }
    })

    console.log("new shop created", createShop)
    return createShop;

  }
  async addLanguages(base, target) {
    await this.getShop()
    if (this.shop) {
      const storeLanguage = await prisma.shop.update({
        where: {
          id: this.shop.id
        },
        data: {
          baseLanguageCode: base.toString(),
          TargetLanguagesCode: target.toString()
        }
      })
      return storeLanguage
    }
  }
  async checkLanguages() {
    await this.getShop()
    if (this.shop) {
      const targelanguage = await prisma.shop.findUnique({
        where: {
          id: this.shop.id
        },
        select: {
          TargetLanguagesCode: true
        }
      })
      if (targelanguage?.TargetLanguagesCode) {
        return true
      }
      else
        return false
    }
  }
  async fetchLanguages() {
    await this.getShop()
    if (this.shop) {
      const fetchedlanguages = await prisma.shop.findUnique({
        where: {
          id: this.shop.id
        },
        select: {
          TargetLanguagesCode: true
        }
      })
      if (fetchedlanguages?.TargetLanguagesCode) {
        return fetchedlanguages
      }
      else
        return false
    }
  }
}
