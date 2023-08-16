// typescript
// Define a decorator function
function LogController(target: any) {
  console.log(
Decorating ${target.name} controller
);
}

// Apply the decorator to a controller class
@LogController
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Product {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.productsService.delete(id);
  }
}

// In this example, we define a decorator function 
// LogController that logs a message when a controller is decorated.
// We then apply the LogController decorator to the 
// ProductsController class using the @LogController` decorator syntax. This logs a message when the controller is created.
// Note that decorators can also be applied to methods, properties, and parameters of a class.
// The decorator pattern is useful in Nest.js for adding functionality to classes without modifying their code directly. This can make your code more modular and easier to maintain.
