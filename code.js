// Product class
class Product {
  constructor(name, category, price, stockQuantity) {
    this.name = name;                 
    this.category = category;         
    this.price = price;              
    this.stockQuantity = stockQuantity; 
  }
}

// Inventory class
class Inventory {
  constructor() {
    this.products = [];               
  }

  // Add product
  addProduct(product) {              
    this.products.push(product);
  }

  // Calculate total stock value
  calculateTotalStockValue() {
    let total = 0;                   
    for (let i = 0; i < this.products.length; i++) {
      total += this.products[i].price * this.products[i].stockQuantity;
    }
    return total;                     
  }

  // Find highest priced product
  findHighestPricedProduct() {
    if (this.products.length === 0) return null; 

    let highest = this.products[0];  
    for (let i = 1; i < this.products.length; i++) {
      if (this.products[i].price > highest.price) {
        highest = this.products[i];
      }
    }
    return highest;                
  }

  // Filter low stock products
  filterLowStockProducts(threshold = 5) { 
    let lowStock = [];              
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].stockQuantity < threshold) {
        lowStock.push(this.products[i]);
      }
    }
    return lowStock;                 
  }

  // Group products by category
  groupProductsByCategory() {
    let categories = {};             
    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    }
    return categories;               
  }

  // Fake fetch new batch (simple, no async)
  fetchNewBatch(newProducts) {       
    console.log("Fetching new products...");

    for (let i = 0; i < newProducts.length; i++) {
      let newProduct = newProducts[i]; 
      let found = false;                

      for (let j = 0; j < this.products.length; j++) {
        if (this.products[j].name === newProduct.name) {
          this.products[j].stockQuantity += newProduct.stockQuantity; 
          found = true;
          break;
        }
      }

      if (!found) {
        this.addProduct(newProduct);
      }
    }
  }
}

// Main program
function main() {
  let inventory = new Inventory();   

  // Add some products
  inventory.addProduct(new Product("Product A", "Electronics", 100, 10)); 
  inventory.addProduct(new Product("Product B", "Fashion", 50, 3));
  inventory.addProduct(new Product("Product C", "Electronics", 200, 5));

  // Show total stock value
  let totalValue = inventory.calculateTotalStockValue(); 
  console.log("Total stock value: $" + totalValue);

  // Show highest priced product
  let highest = inventory.findHighestPricedProduct(); 
  console.log("Highest priced product: " + highest.name + " ($" + highest.price + ")");

  // Show low stock products
  console.log("Low stock products:");
  let lowStock = inventory.filterLowStockProducts(); 
  for (let i = 0; i < lowStock.length; i++) {
    console.log(lowStock[i].name + " - " + lowStock[i].stockQuantity + " units");
  }

  // Show grouped by category
  console.log("Products grouped by category:");
  let grouped = inventory.groupProductsByCategory(); 
  for (let category in grouped) {                    
    console.log("- " + category + ":");
    for (let i = 0; i < grouped[category].length; i++) {
      let p = grouped[category][i]; 
      console.log("   " + p.name + " ($" + p.price + ") - " + p.stockQuantity + " units");
    }
  }

  // Fetch new batch
  inventory.fetchNewBatch([ 
    new Product("Product B", "Fashion", 50, 7),
    new Product("Product D", "Home", 75, 4),
  ]);

  console.log("Updated inventory:");
  for (let i = 0; i < inventory.products.length; i++) {
    let p = inventory.products[i];  
    console.log(p.name + " - " + p.stockQuantity + " units");
  }
}

// Run program
main();
