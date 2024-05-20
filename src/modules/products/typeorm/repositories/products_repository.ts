import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/product";


@EntityRepository(Product)
class ProductRepository extends Repository<Product>{

    public async findByName(name: string): Promise<Product | undefined>{
        const product = await this.findOne({where: {
            name: name
        }})
        
        return product
    }
}

export default ProductRepository