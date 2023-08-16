// typescript
// Define an interface for the product service
interface IProductService {
  findAll(): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  create(createProductDto: CreateProductDto): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
}

// Define a concrete implementation of the product service interface
@Injectable()
class ProductsService implements IProductService {
  private readonly products: Product[] = [];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findOne(id: string): Promise<Product> {
    return this.products.find(product => product.id === id);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = { id: uuidv4(), ...createProductDto };
    this.products.push(product);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex >= 0) {
      this.products[productIndex] = { ...this.products[productIndex], ...updateProductDto };
      return this.products[productIndex];
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<void> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex >= 0) {
      this.products.splice(productIndex, 1);
    }
  }
}

// Define a proxy for the product service
@Injectable()
class ProductsServiceProxy implements IProductService {
  constructor(private readonly productsService: ProductsService) {}

  async findAll(): Promise<Product[]> {
    console.log('Logging findAll() method call');
    return this.productsService.findAll();
  }

  async findOne(id: string): Promise<Product> {
    console.log(
Logging findOne(${id}) method call
);
    return this.productsService.findOne(id);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log('Logging create() method call');
    return this.productsService.create(createProductDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    console.log(
Logging update(${id}, ${JSON.stringify(updateProductDto)}) method call
);
    return this.productsService.update(id, updateProductDto);
  }

  async delete(id: string): Promise<void> {
    console.log(
Logging delete(${id}) method call
);
    return this.productsService.delete(id);
  }
}

// Define a provider for the product service
const productsServiceProvider = {
  provide: 'IProductService',
  useClass: ProductsServiceProxy,
};

// Define a controller that uses the product service
@Controller('products')
export class ProductsController {
  constructor(@Inject('IProductService') private readonly productService: IProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
`
In this example, we define an interface 
IProductService
 that defines the methods for a product service. We then implement the interface with a concrete class 
ProductsService
. The 
ProductsService
 class is decorated with the 
@Injectable()
 decorator, which tells Nest.js to use Dependency Injection to manage its dependencies.

We then define a proxy for the product service, 
ProductsServiceProxy
, that logs method calls before delegating to the real 
ProductsService
.

We then define a provider for the product service, which tells Nest.js to use the 
ProductsServiceProxy
 when the 
IProductService
 token is injected.

Finally, we define a 
ProductsController
 that uses the product service. The 
ProductsController
 is injected with the 
IProductService
 using the 
@Inject() decorator.`
`
This is just a simple example, but it demonstrates how you can use the Proxy pattern in Nest.js to add additional functionality to your classes without modifying their code directly.
`
