import { useState } from "react"

interface CartItem {
    id: number;
    name: string;
    price: number;
}

const PRODUCTS: CartItem[] = [
    { id: 1, name: "Mechanical Keyboard", price: 150 },
    { id: 2, name: "Gaming Mouse", price: 80 },
    { id: 3, name: "Ultrawide Monitor", price: 400 },
    { id: 4, name: "USB-C Hub", price: 45 },
]

export default function ShoppingCart() {
    const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

    const addToCart = (id: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { id, quantity: 1 }];
        });
    };

    const emptyCart = () => setCart([]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return sum + (product?.price || 0) * item.quantity;
    }, 0);

    return (
        <div className="p-5">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Tech Store</h2>
                    <p className="text-gray-400 text-sm">Select items to add to your cart</p>
                </div>
                <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-100 text-white min-w-[120px] text-center">
                    <p className="text-[10px] uppercase font-bold opacity-70">Total Price</p>
                    <p className="text-2xl font-black">${totalPrice}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-700 ml-1">Products</h3>
                    <div className="grid gap-3">
                        {PRODUCTS.map(product => (
                            <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                                <div>
                                    <h4 className="font-bold text-gray-800">{product.name}</h4>
                                    <p className="text-blue-500 font-mono font-bold">${product.price}</p>
                                </div>
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all cursor-pointer text-sm"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center ml-1">
                        <h3 className="font-bold text-gray-700">Shopping Cart ({totalItems})</h3>
                        <button
                            onClick={emptyCart}
                            className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors uppercase cursor-pointer"
                        >
                            Empty Cart
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-200 min-h-[250px]">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center py-10 opacity-30">
                                <span className="text-4xl mb-2">🛒</span>
                                <p className="italic font-medium">Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cart.map(item => {
                                    const product = PRODUCTS.find(p => p.id === item.id);
                                    return (
                                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0 animate-slide-down">
                                            <div>
                                                <p className="font-bold text-gray-800">{product?.name}</p>
                                                <p className="text-xs text-gray-400">Qty: {item.quantity} × ${product?.price}</p>
                                            </div>
                                            <p className="font-mono font-bold text-gray-700">
                                                ${(product?.price || 0) * item.quantity}
                                            </p>
                                        </div>
                                    );
                                })}
                                <div className="pt-4 mt-4 border-t-2 border-white flex justify-between items-end">
                                    <span className="font-bold text-gray-400 uppercase text-xs">Final Sum</span>
                                    <span className="text-2xl font-black text-gray-800">${totalPrice}</span>
                                </div>
                                <button className="w-full mt-6 bg-gray-800 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95 cursor-pointer">
                                    Checkout Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
