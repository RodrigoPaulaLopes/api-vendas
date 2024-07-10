import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/product";

interface IFindProducts {
    id: string
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product>{

    public async findByName(name: string): Promise<Product | undefined>{
        const product = await this.findOne({where: {
            name: name
        }})
        
        return product
    }

    public async findAllById(products: IFindProducts[]): Promise<Product[]>{
        const productIds = products.map(product => product.id)
        const existsProducts: Product[] = await this.find({where: {id: In(productIds)}})
        return existsProducts
    }
}

export default ProductRepository