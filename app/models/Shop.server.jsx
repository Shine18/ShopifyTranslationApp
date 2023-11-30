import prisma from "~/db.server"
import { checkBilling, createCharge, saveCharge } from "./Billing.server"

export const PLANS = [
  {
    id: 0,
    title: "Free",
    amount: 0,
    wordsCount: 10000
  },
  {
    id: 1,
    title: "Standard",
    amount: 9,
    wordsCount: 20000
  },
  {
    id: 2,
    title: "Advanced",
    amount: 19,
    wordsCount: 30000
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
    console.log("billing shop", billingStatus);
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
  async getPlansWordCount() {
    await this.getShop()
    if (this.shop) {
      if (this.shop.plan)
        return this.PLANS[this.shop.plan].wordsCount;
    }
    else
      return null

  }
  async addWordsUsage(usedWords) {
    await this.getShop()
    if (this.shop) {
      const existingWord = await prisma.shop.findUnique({
        where: {
          id: this.shop.id
        },
        select: {
          wordsUsed: true
        }
      })
      const newWordsUsed = existingWord?.wordsUsed + usedWords
      const storeWord = await prisma.shop.update({
        where: {
          id: this.shop.id
        },
        data: {
          wordsUsed: newWordsUsed,
        }
      })
      return storeWord
    }
  }
  async deleteMany() {
    await this.getShop()
    if (this.shop) {
      const deleted = await prisma.shop.delete({
        where: {
          id: this.shop.id
        }
      })
      return deleted
    }
  }
  async saveTranslations(pages) {
    console.log("saving translation of pages", pages)
    try {
      await this.getShop()
      if (this.shop) {
        for (let page of pages) {

          const existingPage = await prisma.page.findMany({
            where: {
              pageId: page.id.toString(),
              language: page.language,
            }
          });

          if (existingPage.length === 0) {
            await prisma.page.create({
              data: {
                pageId: page.id.toString(),
                language: page.language,
                translation: page.data.data.translations[0].translatedText,
              }
            });

          }
        }
        return true
      }
    } catch (error) {
      console.error("Error saving translations: ", error);
      throw error;
    }
  }


  async saveTranslationProduct(transplatedproducts) {
    console.log("translated products", transplatedproducts)
    try {
      await this.getShop();
      if (this.shop) {
        for (let product of transplatedproducts) {

          const existingProduct = await prisma.product.findMany({
            where: {
              productId: product.id.toString(),
              language: product.language,
            }
          });


          if (existingProduct.length === 0) {
            await prisma.product.create({
              data: {
                productId: product.id.toString(),
                language: product.language,
                translation: product.data.data.translations[0].translatedText,
              }
            });
            return "product translation uploaded"
          }
        }
      }
    } catch (error) {
      console.error("Error saving translations: ", error);
      throw error;
    }
  }

  async getTranslatedPages() {
    await this.getShop()
    if (this.shop) {
      const translatedpages = await prisma.page.findMany(
        {
          distinct: ["pageId", "language"]
        }
      )
      if (translatedpages)
        return translatedpages
      else
        return null
    }
  }
  async getCustomPageTranslations() {
    await this.getShop()
    if (this.shop) {
      const translatedpages = await prisma.humanPageStore.findMany(
        {
          distinct: ["pageId"]
        }
      )
      console.log("giving the result", translatedpages)
      return translatedpages
    }
  }
  async savePageHumanTranslation(pagesToStore) {
    await this.getShop();
    console.log("this is the shop", this.shop, pagesToStore);
    let response;
    for (let pageToStore of pagesToStore) {


      if (this.shop) {
        const existingRecord = await prisma.humanPageStore.findMany({
          where: {
            pageId: pageToStore.id.toString(),
            shop: this.shop.shop
          },
        });

        if (existingRecord && existingRecord.length > 0) {
          const updatedPage = await prisma.humanPageStore.update({
            where: {
              id: existingRecord[0].id,
            },
            data: {
              shop: this.shop.shop,
              baseLanguageCode: this.shop.baseLanguageCode?.toString(),
              TargetLanguagesCode: pageToStore.targetlanguages.toString(),
              pageId: pageToStore.id.toString(),
              pageData: pageToStore.page,
              pageTitle: pageToStore.pageTitle
            },
          });

          response = "Updated page record";
          console.log(response);
        } else {
          const newPage = await prisma.humanPageStore.create({
            data: {
              shop: this.shop.shop,
              baseLanguageCode: this.shop.baseLanguageCode ? this.shop.baseLanguageCode?.toString() : "en-us",
              TargetLanguagesCode: pageToStore.targetlanguages.toString(),
              pageId: pageToStore.id.toString(),
              pageData: pageToStore.page,
              pageTitle: pageToStore.pageTitle
            },
          });

          response = "Created new page record";
          console.log(response);
        }
      }
    }
    return response;
  }

  async saveProductHumanTranslation(productsToStore) {
    await this.getShop();
    console.log("this is the shop", this.shop, productsToStore);
    let response;
    for (let productToStore of productsToStore) {


      if (this.shop) {
        const existingRecord = await prisma.humanProductStore.findMany({
          where: {
            productId: productToStore.id.toString(),
            shop: this.shop.shop
          },
        });

        console.log("existing record is this ", existingRecord)
        if (existingRecord && existingRecord.length > 0) {
          const updatedProduct = await prisma.humanProductStore.update({
            where: {
              id: existingRecord[0].id,
            },
            data: {
              shop: this.shop.shop,
              baseLanguageCode: this.shop.baseLanguageCode?.toString(),
              TargetLanguagesCode: productToStore.targetlanguages.toString(),
              productId: productToStore.id.toString(),
              productData: productToStore.product,
              productTitle: productToStore.productTitle
            },
          });

          response = "Updated Product record";
          console.log(response);

        } else {
          const newProduct = await prisma.humanProductStore.create({
            data: {
              shop: this.shop.shop,
              baseLanguageCode: this.shop.baseLanguageCode ? this.shop.baseLanguageCode?.toString() : "en-us",
              TargetLanguagesCode: productToStore.targetlanguages.toString(),
              productId: productToStore.id.toString(),
              productData: productToStore.product,
              productTitle: productToStore.productTitle
            },
          });

          response = "Created new product record";
          console.log(response);
        }
      }
    }
    return response;
  }

  async getProduct(productid) {
    console.log("Product id is", productid)
    await this.getShop();
    if (this.shop) {
      const product = await prisma.product.findMany({
        where: {
          productId: productid
        }
      })
      console.log("data is this ", product)
      return product
    }

  }
  async productTranslations() {
    await this.getShop();
    console.log("this is the soppp", this.shop)
    if (this.shop) {
      const translatedproducts = await prisma.productOrder.findMany({
        where: {
          shop: this.shop.shop
        }
      })

      return translatedproducts
    }
  }
  async pageTranslations() {
    await this.getShop();
    console.log("this is the soppp", this.shop)
    if (this.shop) {
      const translatedpages = await prisma.pagectOrder.findMany({
        where: {
          shop: this.shop.shop
        }
      })
      console.log("translated pages data", translatedpages)
      return translatedpages
    }
  }
  async getAITranslation(pageid) {
    await this.getShop();
    if (this.shop) {
      console.log("Getting AI PAGe", pageid)
      const pagedata = await prisma.page.findMany({
        where:{
          pageId:pageid
        }
      })

      return pagedata
    }

  }
  async getCustomTranslation(pageid) {
    await this.getShop();
    if (this.shop) {
      console.log("Getting custom PAGe", pageid)
      const pagedata = await prisma.pagectOrder.findMany({
        where:{
          pageId:pageid,
          shop:this.shop.shop
        }
      })

      return pagedata
    }

  }
}
