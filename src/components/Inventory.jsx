// components/Inventory.jsx
import React, { useState } from 'react';
import './Inventory.css';

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('name-asc');
  const [stockLevel, setStockLevel] = useState('All Stock Levels');
  const [selectedPetType, setSelectedPetType] = useState('All Pets');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'JerHigh Dog Treats 70g',
      category: 'Pet Food & Treats',
      petType: 'Dogs',
      price: 119,
      stock: 150,
      brand: 'JerHigh',
      description: 'Braided rope toys are perfect for tug-of-war games and help clean your dog\'s teeth during play. Durable construction with random color availability. Great for interactive play with your dog.',
      image: null,
      variations: [
        { name: 'Small', price: 119 },
        { name: 'Large', price: 159 }
      ]
    },
    {
      id: 2,
      name: 'CatCare Cat Food 1kg',
      category: 'Pet Food & Treats',
      petType: 'Cats',
      price: 279,
      stock: 150,
      brand: 'CatCare',
      description: 'Nutritious cat food for all breeds',
      image: null,
      variations: []
    },
    {
      id: 3,
      name: '1KG Vitality Value Meal Adult',
      category: 'Pet Food & Treats',
      petType: 'All Pets',
      price: 190,
      stock: 10,
      brand: 'Vitality',
      description: 'Complete adult pet food',
      image: null,
      variations: []
    },
    {
      id: 4,
      name: 'Petplus Doggie Biscuit 80g',
      category: 'Pet Food & Treats',
      petType: 'Dogs',
      price: 95,
      stock: 150,
      brand: 'Petplus',
      description: 'Crunchy dog biscuits',
      image: null,
      variations: []
    },
    {
      id: 5,
      name: 'Dextrovert Pet Dextrose Powder',
      category: 'Health & Wellness',
      petType: 'All Pets',
      price: 65,
      stock: 150,
      brand: 'Dextrovert',
      description: 'Energy supplement for pets',
      image: null,
      variations: []
    },
    {
      id: 6,
      name: 'Pawpy DOX50 Doxycycline Syrup',
      category: 'Health & Wellness',
      petType: 'All Pets',
      price: 289,
      stock: 150,
      brand: 'Pawpy',
      description: 'Antibiotic syrup for pets',
      image: null,
      variations: []
    },
    {
      id: 7,
      name: 'Puroreety Cat Litter Sand',
      category: 'Litter & Toilet',
      petType: 'Cats',
      price: 115,
      stock: 150,
      brand: 'Puroreety',
      description: 'Premium cat litter sand',
      image: null,
      variations: [
        { name: '5kg', price: 115 },
        { name: '10kg', price: 165 }
      ]
    },
    {
      id: 8,
      name: 'Pet Toy Braided Rope 17cm',
      category: 'Pet Accessories & Toys',
      petType: 'All Pets',
      price: 25,
      stock: 150,
      brand: 'Pet Toy',
      description: 'Braided rope toys are perfect for tug-of-war games and help clean your dog\'s teeth during play. Durable construction with random color availability. Great for interactive play with your dog.',
      image: null,
      variations: []
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Pet Food & Treats',
    petType: 'All Pets',
    price: '',
    stock: '',
    brand: '',
    description: '',
    image: null,
    variations: []
  });

  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    petType: '',
    description: '',
    image: null,
    variations: [],
    imageFile: null,
    imageName: ''
  });

  const categories = ['All Categories', ...new Set(products.map(p => p.category))];
  const petTypes = ['All Pets', 'Dogs', 'Cats'];
  const stockLevels = ['All Stock Levels', 'In Stock', 'Low Stock (≤10)', 'Out of Stock'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm(prev => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file,
        imageName: file.name
      }));
    }
  };

  const handleAddVariation = () => {
    setEditForm(prev => ({
      ...prev,
      variations: [...prev.variations, { name: '', price: '' }]
    }));
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...editForm.variations];
    updatedVariations[index][field] = value;
    setEditForm(prev => ({
      ...prev,
      variations: updatedVariations
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      petType: newProduct.petType,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      brand: newProduct.brand,
      description: newProduct.description,
      image: null,
      variations: []
    };

    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '',
      category: 'Pet Food & Treats',
      petType: 'All Pets',
      price: '',
      stock: '',
      brand: '',
      description: '',
      image: null,
      variations: []
    });
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      brand: product.brand || '',
      price: product.price,
      stock: product.stock,
      petType: product.petType,
      description: product.description || '',
      image: product.image,
      imageName: '',
      variations: product.variations || []
    });
    setIsEditModalOpen(true);
    setActiveDropdown(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => 
      p.id === selectedProduct.id ? {
        ...p,
        name: editForm.name,
        category: editForm.category,
        brand: editForm.brand,
        price: parseFloat(editForm.price),
        stock: parseInt(editForm.stock),
        petType: editForm.petType,
        description: editForm.description,
        image: editForm.image,
        variations: editForm.variations.filter(v => v.name && v.price)
      } : p
    );
    
    setProducts(updatedProducts);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
    setActiveDropdown(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All Categories' || product.category === category;
    const matchesPetType = selectedPetType === 'All Pets' || product.petType === selectedPetType;
    
    let matchesStock = true;
    if (stockLevel === 'In Stock') {
      matchesStock = product.stock > 0;
    } else if (stockLevel === 'Low Stock (≤10)') {
      matchesStock = product.stock <= 10 && product.stock > 0;
    } else if (stockLevel === 'Out of Stock') {
      matchesStock = product.stock === 0;
    }
    
    return matchesSearch && matchesCategory && matchesPetType && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'stock-asc':
        return a.stock - b.stock;
      case 'stock-desc':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Inventory</h1>
        <p>Manage your products and stock.</p>
      </div>

      {/* Filters Section */}
      <div className="inventory-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <select 
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="stock-asc">Stock (Low to High)</option>
          <option value="stock-desc">Stock (High to Low)</option>
        </select>
        <select 
          className="filter-select"
          value={stockLevel}
          onChange={(e) => setStockLevel(e.target.value)}
        >
          {stockLevels.map(level => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Pet Type Pills */}
      <div className="category-pills">
        {petTypes.map(type => (
          <button
            key={type}
            className={`category-pill ${selectedPetType === type ? 'active' : ''}`}
            onClick={() => setSelectedPetType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="inventory-grid">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <div key={product.id} className="inventory-card">
              <div className="product-menu" onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}>
                <span className="dots">•••</span>
                {activeDropdown === product.id && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => handleEditProduct(product)}>Edit</button>
                    <button className="dropdown-item delete" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </div>
                )}
              </div>
              <h3>{product.name}</h3>
              <div className="inventory-category">{product.category}</div>
              <div className="inventory-price">
                ₱{product.price} <span>in stock</span>
              </div>
              <div className={`inventory-stock ${product.stock <= 10 ? 'low-stock' : ''}`}>
                {product.stock} in stock
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
            <button className="add-first-btn" onClick={() => setIsAddModalOpen(true)}>
              Add Your First Product
            </button>
          </div>
        )}
      </div>

      {/* Add Product Button */}
      <button className="add-product-btn" onClick={() => setIsAddModalOpen(true)}>
        Add Products
      </button>

      {/* Edit Product Modal - True Landscape Layout */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>EDIT PRODUCT</h2>
              <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSaveEdit}>
              <div className="edit-product-container">
                {/* Left Column - Image Upload */}
                <div className="edit-left-column">
                  <div className="product-image-section">
                    <h3>Product Image</h3>
                    <div className={`image-placeholder ${editForm.image ? 'has-image' : ''}`}>
                      {editForm.image ? (
                        <img src={editForm.image} alt="Product" />
                      ) : (
                        <>
                          <span>🖼️</span>
                          <span>No image selected</span>
                        </>
                      )}
                    </div>
                    <div className="file-input-container">
                      <label htmlFor="image-upload" className="file-input-label">
                        Choose File
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        className="file-input"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="file-name">
                      {editForm.imageName || 'No file chosen'}
                    </div>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="edit-right-column">
                  {/* Product Name */}
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  {/* Category and Brand Row */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="Pet Food & Treats">Pet Food & Treats</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Litter & Toilet">Litter & Toilet</option>
                        <option value="Pet Accessories & Toys">Pet Accessories & Toys</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={editForm.brand}
                        onChange={handleEditInputChange}
                        placeholder="Vitality"
                      />
                    </div>
                  </div>

                  {/* Price and Stock Row */}
                  <div className="two-column-grid">
                    <div className="form-group">
                      <label>Price (₱) *</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditInputChange}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="form-group">
                      <label>Stock Quantity *</label>
                      <input
                        type="number"
                        name="stock"
                        value={editForm.stock}
                        onChange={handleEditInputChange}
                        required
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Variations Section */}
                  <div className="variations-section">
                    <div className="variations-header">
                      <h4>Variations</h4>
                    </div>
                    {editForm.variations.map((variation, index) => (
                      <div key={index} className="variation-row">
                        <input
                          type="text"
                          placeholder="Variation Name (e.g., Small)"
                          value={variation.name}
                          onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          value={variation.price}
                          onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                        />
                      </div>
                    ))}
                    <button type="button" className="add-variation-btn" onClick={handleAddVariation}>
                      + Add Variation
                    </button>
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditInputChange}
                      rows="3"
                      placeholder="Enter product description..."
                    />
                  </div>

                  {/* Pet Type */}
                  <div className="form-group">
                    <label>Pet Type *</label>
                    <div className="pet-type-group">
                      <label className="pet-type-radio">
                        <input
                          type="radio"
                          name="petType"
                          value="Dogs"
                          checked={editForm.petType === 'Dogs'}
                          onChange={handleEditInputChange}
                        />
                        <span>Dogs</span>
                      </label>
                      <label className="pet-type-radio">
                        <input
                          type="radio"
                          name="petType"
                          value="Cats"
                          checked={editForm.petType === 'Cats'}
                          onChange={handleEditInputChange}
                        />
                        <span>Cats</span>
                      </label>
                      <label className="pet-type-radio">
                        <input
                          type="radio"
                          name="petType"
                          value="All Pets"
                          checked={editForm.petType === 'All Pets'}
                          onChange={handleEditInputChange}
                        />
                        <span>All Pets</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-changes-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>ADD PRODUCT</h2>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleAddProduct}>
              <div className="edit-product-container">
                <div className="edit-right-column" style={{ maxWidth: '100%' }}>
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Pet Food & Treats">Pet Food & Treats</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Litter & Toilet">Litter & Toilet</option>
                        <option value="Pet Accessories & Toys">Pet Accessories & Toys</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={newProduct.brand}
                        onChange={handleInputChange}
                        placeholder="Enter brand name"
                      />
                    </div>
                  </div>

                  <div className="two-column-grid">
                    <div className="form-group">
                      <label>Price (₱) *</label>
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="form-group">
                      <label>Stock Quantity *</label>
                      <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter product description..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Pet Type *</label>
                    <div className="pet-type-group">
                      <label className="pet-type-radio">
                        <input
                          type="radio"
                          name="petType"
                          value="Dogs"
                          checked={newProduct.petType === 'Dogs'}
                          onChange={handleInputChange}
                        />
                        <span>Dogs</span>
                      </label>
                      <label className="pet-type-radio">
                        <input
                          type="radio"
                          name="petType"
                          value="Cats"
                          checked={newProduct.petType === 'Cats'}
                          onChange={handleInputChange}
                        />
                        <span>Cats</span>
                      </label>
                      <label className="pet-type-radio">
                        <input
                          type="radio"
                          name="petType"
                          value="All Pets"
                          checked={newProduct.petType === 'All Pets'}
                          onChange={handleInputChange}
                        />
                        <span>All Pets</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-changes-btn">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;