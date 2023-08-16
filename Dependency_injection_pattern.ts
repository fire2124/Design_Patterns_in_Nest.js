// typescript
// Define an interface for the product service
interface IProductService {
  findAll(): Product[];
  findOne(id: string): Product;
  create(createProductDto: CreateProductDto): Product;
  update(id: string, updateProductDto: UpdateProductDto): Product;
  delete(id: string): void;
}

// Define a concrete implementation of the product service interface
@Injectable()
class ProductsService implements IProductService {
  private readonly products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    return this.products.find(product => product.id === id);
  }

  create(createProductDto: CreateProductDto): Product {
    const product = { id: uuidv4(), ...createProductDto };
    this.products.push(product);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex >= 0) {
      this.products[productIndex] = { ...this.products[productIndex], ...updateProductDto };
      return this.products[productIndex];
    } else {
      return null;
    }
  }

  delete(id: string): void {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex >= 0) {
      this.products.splice(productIndex, 1);
    }
  }
}

// Define a provider for the product service
const productsServiceProvider = {
  provide: 'IProductService',
  useClass: ProductsService,
};

// Define a controller that uses the product service
@Controller('products')
export class ProductsController {
  constructor(@Inject('IProductService') private readonly productService: IProductService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Product {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.productService.delete(id);
  }
}

// In this example, we define an interface 
// IProductService that defines the methods for a product service. We then implement the interface with a concrete class ProductsService. 
// The ProductsService class is decorated with the 
// @Injectable() decorator, which tells Nest.js to use Dependency Injection to manage its dependencies.
// We then define a provider for the product service, which tells Nest.js to use the 
// ProductsService when the IProductService token is injected.
// Finally, we define a ProductsController that uses the product service. The 
// ProductsController is injected with the 
// IProductService using the @Inject() decorator.
// This is just a simple example, but it demonstrates how you can use Dependency Injection in Nest.js to manage dependencies and make your code more modular and testable.
