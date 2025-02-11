import { useEffect, useState, useCallback, useRef } from "react";
import "./App.css";
import Header from "./layouts/Header/Header";
import ProductCard from "./components/productCard/ProductCard";
import { debounce } from "lodash";
import { getProducts } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products
        .filter((product) =>
          product?.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts(10, page * 10);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prev => [...prev, ...data]);
        setFilteredProducts(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchData();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  return (
    <>
      <div>
        <Header setSearchQuery={debouncedSearch} />
        <div className="products-container">
          {filteredProducts?.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              ref={filteredProducts.length === index + 1 ? lastProductRef : null}
              className="product-row"
            >
              <ProductCard product={product} />
            </div>
          ))}
          {loading && <div className="loading">Loading...</div>}
        </div>
      </div>
    </>
  );
}

export default App;
